import React, { RefObject } from "react";
import Flex from "@/shared/components/Flex";
import Spacing from "@/shared/components/Spacing";
import BottomButton from "@/shared/components/Button/BottomButton";
import FloatingButton from "@/features/navigation/components/FloatingButton";

interface StickerCanvasProps {
    isVisible: boolean;
    capturedCardUrl: string | null;
    cardImgUrl: string;
    frameUrl: string;
    canvasRef: RefObject<HTMLCanvasElement>;
    isFabricReady: boolean;
    onExport: () => void;
}

const CARD_WIDTH = 282;
const CARD_HEIGHT = 372;

export default function StickerCanvas({
    isVisible,
    capturedCardUrl,
    cardImgUrl,
    frameUrl,
    canvasRef,
    isFabricReady,
    onExport,
}: StickerCanvasProps) {
    return (
        <Flex
            direction="column"
            justify="space-between"
            className="min-h-dvh pt-safe-top pb-12 w-full"
            style={{ display: isVisible ? "flex" : "none" }}
        >
            <Flex className="w-full px-6 pt-[76px]" direction="column" align="center">
                <span className="text-B4 text-grayscale-500 w-full">
                    점선 영역이 이미지 영역이에요!
                </span>
                <Spacing size={32} />
                <div
                    style={{ width: CARD_WIDTH, height: CARD_HEIGHT }}
                    className="relative"
                >
                    {capturedCardUrl && (
                        <img
                            src={capturedCardUrl}
                            alt=""
                            className="absolute inset-0 w-full h-full object-cover rounded-[20px] pointer-events-none"
                        />
                    )}
                    <canvas
                        ref={canvasRef}
                        id="canvas"
                        style={{
                            width: `${CARD_WIDTH}px`,
                            height: `${CARD_HEIGHT}px`,
                            backgroundImage: capturedCardUrl
                                ? "none"
                                : `url(${cardImgUrl || frameUrl})`,
                            backgroundRepeat: "no-repeat",
                            backgroundSize: "cover",
                        }}
                    />
                </div>
            </Flex>
            <div className="relative mx-auto max-w-[430px] w-full mb-safe-bottom">
                <FloatingButton tooltip />
                <BottomButton
                    label={"이미지 저장"}
                    onClick={onExport}
                    disabled={!isFabricReady}
                />
            </div>
        </Flex>
    );
}
