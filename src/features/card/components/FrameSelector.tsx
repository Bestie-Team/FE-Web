import React, { useRef } from "react";
import Flex from "@/shared/components/Flex";
import Spacing from "@/shared/components/Spacing";
import BottomButton from "@/shared/components/Button/BottomButton";
import { format } from "date-fns";
import { FRAMES } from "@/features/card/components/constants";

interface FrameSelectorProps {
    selectedFrame: number;
    isCapturing: boolean;
    captureError: unknown;
    onStartDecorate: () => void;
    selectedFeedInfo: {
        imageUrl: string;
        name: string;
        content: string;
        date: string;
    } | null;
    croppedImage: string | null;
    frameRef: React.RefObject<HTMLDivElement>;
}

const CARD_WIDTH = 282;
const CARD_HEIGHT = 372;
const CROP_WIDTH = 230;

export default function FrameSelector({
    selectedFrame,
    isCapturing,
    captureError,
    onStartDecorate,
    selectedFeedInfo,
    croppedImage,
    frameRef,
}: FrameSelectorProps) {
    return (
        <Flex
            className="min-h-dvh pt-safe-top pb-12"
            direction="column"
            justify="space-between"
        >
            <div className="pt-[76px]">
                <Flex direction="column" className="gap-3 px-6">
                    <span className="text-T2">해당 프레임을 선택할까요?</span>
                    <span className="text-B3 text-grayscale-500">
                        꾸미기 시작하면 프레임을 바꿀 수 없어요.
                    </span>
                </Flex>
                <Flex
                    direction="column"
                    justify="center"
                    align="center"
                    className={styles.cardContainer}
                >
                    <div
                        ref={frameRef}
                        id="card"
                        className="relative rounded-[20px] w-full"
                    >
                        <img
                            alt="frame"
                            height={CARD_HEIGHT}
                            width={CARD_WIDTH}
                            className={styles.frame}
                            crossOrigin="anonymous"
                            src={FRAMES[selectedFrame] || "/placeholder.svg"}
                        />
                        <div className={styles.cardWrapper}>
                            <div className={styles.imageWrapper}>
                                {croppedImage ? (
                                    <img
                                        src={croppedImage || "/placeholder.svg"}
                                        alt="Cropped Image"
                                        width={CROP_WIDTH}
                                        height={218}
                                    />
                                ) : (
                                    <div
                                        style={{
                                            backgroundColor: "#AEAEAE",
                                            height: 218,
                                            width: CROP_WIDTH,
                                        }}
                                    />
                                )}
                            </div>
                            <Flex direction="column" className="px-5 py-1 pb-5 h-[100px]">
                                <span className={styles.textWrapper}>
                                    {selectedFeedInfo?.name ?? ""}
                                </span>
                                <Spacing size={8} />
                                {selectedFeedInfo?.content && (
                                    <span className="text-C5">
                                        {selectedFeedInfo.content.length >= 40
                                            ? selectedFeedInfo.content.slice(0, 40)
                                            : selectedFeedInfo.content}
                                    </span>
                                )}
                                <Spacing size={12} />
                                <span className={styles.dateWrapper}>
                                    {selectedFeedInfo?.date
                                        ? format(
                                            selectedFeedInfo.date.slice(0, 10),
                                            "yyyy.MM.dd"
                                        )
                                        : ""}
                                </span>
                            </Flex>
                        </div>
                    </div>
                </Flex>
            </div>
            <div className="mb-safe-bottom">
                <BottomButton
                    disabled={selectedFrame == null || isCapturing}
                    onClick={onStartDecorate}
                    label={isCapturing ? "이미지 생성중..." : "꾸미기 시작"}
                />
                {!!captureError && (
                    <div className="px-6 pt-3 text-C5 text-red-500">
                        이미지 생성에 실패했어요. 다시 시도해주세요.
                    </div>
                )}
            </div>
        </Flex>
    );
}

const styles = {
    frame: "rounded-[20px] w-[282px] h-[372px]",
    cardContainer:
        "relative rounded-[20px] w-[282px] h-[453px] self-center mx-auto",
    cardWrapper:
        "absolute top-[27px] left-[26.5px] flex flex-col bg-base-white rounded-xl w-[230px] h-[318px]",
    imageWrapper:
        "w-[230px] h-full rounded-t-[12px] bg-grayscale-50 overflow-hidden",
    textWrapper: "text-T5 ",
    dateWrapper: "text-C5 text-grayscale-500",
};
