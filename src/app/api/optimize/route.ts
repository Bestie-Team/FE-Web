import { type NextRequest, NextResponse } from "next/server";
import sharp from "sharp";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("image") as File;

    if (!file) {
      return NextResponse.json(
        { error: "이미지가 제공되지 않았습니다" },
        { status: 400 }
      );
    }

    // 파일을 버퍼로 변환
    const buffer = Buffer.from(await file.arrayBuffer());

    // Sharp를 사용하여 이미지 최적화
    const optimizedBuffer = await sharp(buffer)
      .resize({
        width: 800,
        height: 600,
        withoutEnlargement: true,
      })
      .webp({
        quality: 80,
        lossless: false,
        nearLossless: false,
        smartSubsample: true,
        effort: 3, // 높을수록 압축률 증가 (시간도 증가)
      })
      .toBuffer();

    // 최적화된 이미지 반환
    return new NextResponse(optimizedBuffer, {
      headers: {
        "Content-Type": "image/wepb",
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
