export const dynamic = "force-dynamic";

import { type NextRequest, NextResponse } from "next/server";
import sharp from "sharp";
import { createHash } from "crypto";

// sharp 글로벌 설정
sharp.cache({
  items: 80,
  memory: 50 * 1024 * 1024,
});
sharp.concurrency(2);
sharp.simd(true);

// 메모리 캐시 설정
const imageCache = new Map<
  string,
  { buffer: Buffer; contentType: string; timestamp: number }
>();

const CACHE_TTL = 1800000;
const MAX_CACHE_SIZE = 30;
// const MAX_CACHE_MEMORY = 20 * 1024 * 1024;

// 캐시 키 생성함수

function createCacheKey(url: string, params: URLSearchParams): string {
  // 모바일에서 중요한 파라미터만 캐시 키에 포함
  const essentialParams = ["width", "height", "format", "fit", "quality"];
  const filteredParams = new URLSearchParams();

  essentialParams.forEach((param) => {
    const value = params.get(param);
    if (value) filteredParams.set(param, value);
  });

  // MD5 해시로 캐시 키 생성 (빠른 해시)
  return createHash("md5")
    .update(url + filteredParams.toString())
    .digest("hex");
}
// 캐시 정리 함수 (메모리 관리)

function cleanupCache() {
  const now = Date.now();
  const keysToDelete: string[] = [];

  for (const [key, value] of Array.from(imageCache.entries())) {
    if (now - value.timestamp > CACHE_TTL) {
      imageCache.delete(key);
    }
  }
  keysToDelete.forEach((key) => imageCache.delete(key));

  if (imageCache.size > MAX_CACHE_SIZE) {
    const sorted = Array.from(imageCache.entries()).sort(
      (a, b) => a[1].timestamp - b[1].timestamp
    );
    for (let i = 0; i < imageCache.size - MAX_CACHE_SIZE; i++) {
      imageCache.delete(sorted[i][0]);
    }
  }
}

setInterval(cleanupCache, 600000);

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const imageUrl = searchParams.get("url");

    // URL 검증
    if (!imageUrl) {
      return NextResponse.json(
        { error: "이미지 URL이 제공되지 않았습니다" },
        { status: 400 }
      );
    }

    // 캐시 확인 (HIT 시 즉시 반환)
    const cacheKey = createCacheKey(imageUrl, searchParams);
    const cached = imageCache.get(cacheKey);

    if (cached) {
      return new NextResponse(cached.buffer, {
        headers: {
          "Content-Type": cached.contentType,
          "Cache-Control": "public, max-age=31536000, immutable",
          "X-Cache": "HIT",
        },
      });
    }

    // 파라미터 파싱 및 검증 (모바일 제한)
    // 모바일 화면 크기 고려한 최대 크기 제한

    const width = Math.min(
      Number.parseInt(searchParams.get("width") || "0"),
      1080 // 모바일: 1080p 제한
    );
    const height = Math.min(
      Number.parseInt(searchParams.get("height") || "0"),
      1920 // 모바일: 1920p 제한
    );

    const quality = Math.min(
      Number.parseInt(searchParams.get("quality") || "75"), // 모바일: 기본 75
      90 // 모바일: 최대 90
    );

    const effort = Math.min(
      Number.parseInt(searchParams.get("effort") || "3"), // 모바일: 기본 3
      4 // 모바일: 최대 4
    );

    const format = searchParams.get("format") || "webp"; // 모바일: WebP 기본
    const fit = (searchParams.get("fit") || "cover") as keyof sharp.FitEnum;

    // 9. 이미지 다운로드 (타임아웃 및 에러 처리)
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 8000); // 모바일: 8초 제한

    try {
      const res = await fetch(imageUrl, {
        signal: controller.signal,
        headers: {
          "User-Agent":
            "Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X) AppleWebKit/605.1.15",
        },
      });

      clearTimeout(timeoutId);

      if (!res.ok) {
        return NextResponse.json(
          { error: `이미지 다운로드 실패: ${res.status}` },
          { status: res.status }
        );
      }

      const buffer = Buffer.from(await res.arrayBuffer());

      // Sharp 이미지 처리 파이프라인
      let pipeline = sharp(buffer, {
        failOnError: false,
        animated: false, // 애니메이션 비활성화 (성능)
        limitInputPixels: 16777216, // 4K x 4K 제한 (모바일 메모리 고려)
        sequentialRead: true, // 순차 읽기 (모바일 I/O 최적화)
        density: 72, // 모바일: 72dpi
      });

      // 메타데이터 확인 및 조건부 처리
      const metadata = await pipeline.metadata();

      // 원본이 이미 작으면 리사이징 스킵
      const needsResize =
        (width > 0 && metadata.width! > width) ||
        (height > 0 && metadata.height! > height);

      if (needsResize) {
        pipeline = pipeline.resize({
          width: width > 0 ? width : undefined,
          height: height > 0 ? height : undefined,
          fit,
          withoutEnlargement: true, // 확대 방지
          fastShrinkOnLoad: true, // 빠른 축소
          kernel: sharp.kernel.lanczos2, // 모바일: 빠른 커널
        });
      }

      // EXIF 회전 정보가 있을 때만 회전
      if (metadata.orientation && metadata.orientation > 1) {
        pipeline = pipeline.rotate();
      }

      // 포맷별 최적화 (모바일 네트워크 고려)
      let output: Buffer;
      let contentType: string;

      switch (format) {
        case "webp":
          output = await pipeline
            .webp({
              quality,
              effort: Math.min(effort, 3), // 모바일: effort 3 제한
              smartSubsample: true,
              nearLossless: false, // 모바일: 파일 크기 우선
              alphaQuality: Math.max(quality - 10, 50), // 알파 채널 품질 조정
            })
            .toBuffer();
          contentType = "image/webp";
          break;

        case "avif":
          output = await pipeline
            .avif({
              quality: Math.min(quality, 80), // 모바일: AVIF 품질 제한
              effort: Math.min(effort, 3), // 모바일: 빠른 인코딩
              chromaSubsampling: "4:2:0", // 모바일: 파일 크기 우선
            })
            .toBuffer();
          contentType = "image/avif";
          break;

        default:
          output = await pipeline.webp({ quality: 75, effort: 3 }).toBuffer();
          contentType = "image/webp";
      }

      // 캐시 저장 및 응답
      // 메모리 사용량 확인 후 캐시 저장
      if (output.length < 1024 * 1024 * 2) {
        // 1MB 이하만 캐시
        imageCache.set(cacheKey, {
          buffer: output,
          contentType,
          timestamp: Date.now(),
        });
      }

      return new NextResponse(output, {
        headers: {
          "Content-Type": contentType,
          "Cache-Control": "public, max-age=31536000, immutable",
          "X-Cache": "MISS",
          Vary: "Accept",
          "Content-Length": output.length.toString(),
        },
      });
    } finally {
      clearTimeout(timeoutId);
    }
  } catch (err) {
    console.error("이미지 최적화 오류:", err);
  }
}
