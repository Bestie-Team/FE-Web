export const dynamic = "force-dynamic";

import { type NextRequest, NextResponse } from "next/server";
import sharp from "sharp";

export async function GET(request: NextRequest) {
  try {
    // URL에서 쿼리 파라미터 가져오기
    const { searchParams } = new URL(request.url);
    const imageUrl = searchParams.get("url");
    const width = Number.parseInt(searchParams.get("width") || "0"); // 0 means original width
    const height = Number.parseInt(searchParams.get("height") || "0"); // 0 means original height
    const quality = Number.parseInt(searchParams.get("quality") || "90"); // Increased default quality
    const effort = Number.parseInt(searchParams.get("effort") || "2"); // Lower effort for better quality
    const format = searchParams.get("format") || "webp";

    // 추가 옵션
    const fit = searchParams.get("fit") || "cover";
    const withoutEnlargement = searchParams.get("noEnlarge") !== "false"; // Default true

    if (!imageUrl) {
      return NextResponse.json(
        { error: "이미지 URL이 제공되지 않았습니다" },
        { status: 400 }
      );
    }

    // 이미지 가져오기
    const imageResponse = await fetch(imageUrl);

    if (!imageResponse.ok) {
      return NextResponse.json(
        { error: "이미지를 가져오는데 실패했습니다" },
        { status: imageResponse.status }
      );
    }

    const imageBuffer = Buffer.from(await imageResponse.arrayBuffer());

    // 이미지 처리 파이프라인 설정
    let pipeline = sharp(imageBuffer, {
      failOnError: false,
    });

    // 리사이징 옵션 설정 (width나 height가 0이면 해당 차원은 원본 유지)
    if (width > 0 || height > 0) {
      pipeline = pipeline.resize({
        width: width > 0 ? width * 2.5 : undefined,
        height: height > 0 ? height * 2.5 : undefined,
        fit: fit as keyof sharp.FitEnum,
        withoutEnlargement: withoutEnlargement,
      });
    }

    // 포맷에 따른 출력 설정
    let outputBuffer;
    let contentType;

    if (format === "webp") {
      outputBuffer = await pipeline
        .webp({
          quality,
          lossless: quality >= 100, // 100% 품질에서는 무손실 사용
          nearLossless: quality >= 95, // 95% 이상에서는 near-lossless 사용
          smartSubsample: true,
          effort: effort,
        })
        .toBuffer();
      contentType = "image/webp";
    } else if (format === "avif") {
      outputBuffer = await pipeline
        .avif({
          quality,
          lossless: quality >= 100,
          effort: effort,
        })
        .toBuffer();
      contentType = "image/avif";
    } else if (format === "png") {
      outputBuffer = await pipeline
        .png({
          quality: Math.min(quality, 100),
          compressionLevel: 9 - Math.floor(effort * 1.5),
        })
        .toBuffer();
      contentType = "image/png";
    } else if (format === "jpeg" || format === "jpg") {
      outputBuffer = await pipeline
        .jpeg({
          quality,
          progressive: true,
          optimizeScans: true,
        })
        .toBuffer();
      contentType = "image/jpeg";
    } else {
      // 기본값은 WebP
      outputBuffer = await pipeline
        .webp({
          quality,
          lossless: quality >= 100,
          nearLossless: quality >= 95,
          smartSubsample: true,
          effort: effort,
        })
        .toBuffer();
      contentType = "image/webp";
    }

    // 최적화된 이미지 반환
    return new NextResponse(outputBuffer, {
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=31536000, immutable",
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
