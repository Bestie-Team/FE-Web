export const dynamic = "force-dynamic";

import { type NextRequest, NextResponse } from "next/server";
import sharp from "sharp";
import { createHash } from "crypto";

// 간단한 메모리 캐시 구현
const imageCache = new Map<
  string,
  { buffer: Buffer; contentType: string; timestamp: number }
>();
const CACHE_TTL = 3600000;
const MAX_CACHE_SIZE = 50;

// 캐시 키 생성 함수
function createCacheKey(url: string, params: URLSearchParams): string {
  return createHash("md5")
    .update(url + params.toString())
    .digest("hex");
}

// 오래된 캐시 정리 - Array.from 사용하여 TypeScript 호환성 해결
function cleanupCache() {
  const now = Date.now();
  const keysToDelete: string[] = [];

  // Array.from을 사용하여 Map의 항목을 배열로 변환 후 처리
  Array.from(imageCache.keys()).forEach((key) => {
    const entry = imageCache.get(key);
    if (entry && now - entry.timestamp > CACHE_TTL) {
      keysToDelete.push(key);
    }
  });

  // 오래된 항목 삭제
  keysToDelete.forEach((key) => imageCache.delete(key));

  // 캐시 크기 제한
  if (imageCache.size > MAX_CACHE_SIZE) {
    // 가장 오래된 항목부터 삭제
    const sortedEntries = Array.from(imageCache.entries()).sort(
      (a, b) => a[1].timestamp - b[1].timestamp
    );

    const deleteCount = imageCache.size - MAX_CACHE_SIZE;
    sortedEntries.slice(0, deleteCount).forEach(([key]) => {
      imageCache.delete(key);
    });
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const imageUrl = searchParams.get("url");

    if (!imageUrl) {
      return NextResponse.json(
        { error: "이미지 URL이 제공되지 않았습니다" },
        { status: 400 }
      );
    }

    const cacheKey = createCacheKey(imageUrl, searchParams);

    // 캐시에서 이미지 확인
    if (imageCache.has(cacheKey)) {
      const cachedImage = imageCache.get(cacheKey)!;
      return new NextResponse(cachedImage.buffer, {
        headers: {
          "Content-Type": cachedImage.contentType,
          "Cache-Control": "public, max-age=31536000, immutable",
          "X-Cache": "HIT",
          Vary: "Accept",
        },
      });
    }

    const width = Number.parseInt(searchParams.get("width") || "0");
    const height = Number.parseInt(searchParams.get("height") || "0");
    const quality = Number.parseInt(searchParams.get("quality") || "80"); // 기본 품질 낮춤
    const effort = Number.parseInt(searchParams.get("effort") || "1"); // 기본 노력 수준 낮춤
    const format = searchParams.get("format") || "webp";
    const fit = searchParams.get("fit") || "cover";
    const withoutEnlargement = searchParams.get("noEnlarge") !== "false";

    const imageResponse = await fetch(imageUrl);

    if (!imageResponse.ok) {
      return NextResponse.json(
        { error: "이미지를 가져오는데 실패했습니다" },
        { status: imageResponse.status }
      );
    }

    const imageBuffer = Buffer.from(await imageResponse.arrayBuffer());

    // Sharp 설정 최적화
    sharp.cache(true); // 명시적으로 캐시 활성화
    sharp.concurrency(2); // 병렬 처리 제한

    // 이미지 처리 파이프라인 설정
    let pipeline = sharp(imageBuffer, {
      failOnError: false,
    });

    // 메타데이터 제거 (더 빠른 처리)
    pipeline = pipeline.rotate(); // EXIF 기반 자동 회전만 적용

    // 리사이징 최적화 - 더 작은 배율 사용
    if (width > 0 || height > 0) {
      pipeline = pipeline.resize({
        width: width > 0 ? width * 2.5 : undefined,
        height: height > 0 ? height * 2.5 : undefined,
        fit: fit as keyof sharp.FitEnum,
        withoutEnlargement: withoutEnlargement,
        fastShrinkOnLoad: true, // 빠른 축소 활성화
      });
    }

    // 포맷에 따른 출력 설정 - 속도 최적화
    let outputBuffer;
    let contentType;

    if (format === "webp") {
      outputBuffer = await pipeline
        .webp({
          quality,
          effort: effort, // 낮은 effort = 빠른 인코딩
          smartSubsample: quality > 80, // 높은 품질에서만 사용
        })
        .toBuffer();
      contentType = "image/webp";
    } else if (format === "avif") {
      outputBuffer = await pipeline
        .avif({
          quality,
          effort: effort,
        })
        .toBuffer();
      contentType = "image/avif";
    } else if (format === "png") {
      outputBuffer = await pipeline
        .png({
          compressionLevel: 6, // 중간 압축 레벨 (속도/크기 균형)
        })
        .toBuffer();
      contentType = "image/png";
    } else if (format === "jpeg" || format === "jpg") {
      outputBuffer = await pipeline
        .jpeg({
          quality,
          progressive: false, // 단순 인코딩이 더 빠름
          optimizeScans: false, // 속도 우선
        })
        .toBuffer();
      contentType = "image/jpeg";
    } else {
      // 기본값은 WebP - 빠른 설정
      outputBuffer = await pipeline
        .webp({
          quality,
          effort: effort,
        })
        .toBuffer();
      contentType = "image/webp";
    }

    // 캐시에 결과 저장
    imageCache.set(cacheKey, {
      buffer: outputBuffer,
      contentType,
      timestamp: Date.now(),
    });

    // 주기적으로 캐시 정리
    if (imageCache.size > MAX_CACHE_SIZE / 2) {
      cleanupCache();
    }

    // 최적화된 이미지 반환
    return new NextResponse(outputBuffer, {
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=31536000, immutable",
        "X-Cache": "MISS",
        Vary: "Accept",
      },
    });
  } catch (error) {
    console.error("이미지 최적화 오류:", error);
    return NextResponse.json(
      { error: "이미지 최적화에 실패했습니다" },
      { status: 500 }
    );
  }
}
