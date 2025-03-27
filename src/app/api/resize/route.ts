import { type NextRequest, NextResponse } from "next/server";
import sharp from "sharp";

export async function GET(request: NextRequest) {
  try {
    // URL에서 쿼리 파라미터 가져오기
    const { searchParams } = new URL(request.url);
    const imageUrl = searchParams.get("url");
    const width = Number.parseInt(searchParams.get("w") || "800");
    const height = Number.parseInt(searchParams.get("h") || "600");
    const quality = Number.parseInt(searchParams.get("q") || "80");
    const effort = Number.parseInt(searchParams.get("effort") || "4");

    if (!imageUrl) {
      return NextResponse.json(
        { error: "이미지 URL이 제공되지 않았습니다" },
        { status: 400 }
      );
    }

    // 이미지 가져오기
    const imageResponse = await fetch(imageUrl);
    const imageBuffer = Buffer.from(await imageResponse.arrayBuffer());

    // Sharp를 사용하여 이미지를 WebP로 최적화
    const optimizedBuffer = await sharp(imageBuffer)
      .resize({
        width,
        height,
        withoutEnlargement: true,
      })
      .webp({
        quality,
        lossless: false,
        nearLossless: false,
        smartSubsample: true,
        effort: effort, // 높을수록 압축률 증가 (시간도 증가)
      })
      .toBuffer();

    // 최적화된 WebP 이미지 반환
    return new NextResponse(optimizedBuffer, {
      headers: {
        "Content-Type": "image/webp",
        "Cache-Control": "public, max-age=31536000, immutable",
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
