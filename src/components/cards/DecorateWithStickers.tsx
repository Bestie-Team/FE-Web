"use client";
import React, { useCallback, useRef, useState } from "react";
import { toPng } from "html-to-image";
import Spacing from "../shared/Spacing";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  cardDecorateModalStateAtom,
  cardFrameAtom,
  cardImageAtom,
  cardSelectedGatheringAtom,
} from "@/atoms/card";
import Flex from "../shared/Flex";
import clsx from "clsx";
import FixedBottomButton from "../shared/buttons/FixedBottomButton";
import Decorate from "./Decorate";
import SheetOpenBtnContainer from "../shared/bottomSheet/shared/SheetOpenBtnContainer";
import DecoStickerBottomSheet from "../shared/bottomSheet/DecoStickerBottomSheet";
// import Image from "next/image";

export default function DecorateWithStickers({
  onNext,
}: {
  onNext: () => void;
}) {
  const selectedFrame = useRecoilValue(cardFrameAtom);
  // const [cardImageUrl, setCardImageUrl] = useRecoilState(cardImageUrlAtom);
  const [img, setImg] = useRecoilState(cardImageAtom);
  const [hide, setHide] = useState<boolean>(false);
  const selectedGathering = useRecoilValue(cardSelectedGatheringAtom);
  const [decoModalOpen, setDecoModalOpen] = useRecoilState(
    cardDecorateModalStateAtom
  );

  const ref = useRef<HTMLDivElement>(null);

  const frames = ["/frame1.jpeg", "/frame2.jpeg", "/frame3.jpeg"];

  const handleCaptureImage = useCallback(async () => {
    if (ref.current === null) return;

    try {
      const dataUrl = await toPng(ref.current);
      const img = new Image();
      img.src = dataUrl;
      img.onload = () => setImg(img);
      setHide(true);
    } catch (err) {
      console.error("이미지 캡처 오류:", err);
    }
  }, [setImg]);

  return (
    <div className="h-screen flex flex-col pt-[72px] px-[20px] items-center">
      <Flex justify="space-between" className="px-[20px] w-full" align="center">
        <span className="text-B4 text-grayscale-500">
          점선 영역이 이미지 영역이에요!
        </span>
        <button className={styles.button} onClick={handleCaptureImage}>
          스티커 꾸미기
        </button>
      </Flex>
      <Spacing size={24} />
      {hide === false ? (
        <div className={clsx(styles.cardContainer)}>
          <div
            ref={ref}
            id="card"
            className="relative rounded-[20px] w-full shadow-sm"
          >
            <div
              style={{
                backgroundImage: `url('${frames[selectedFrame!]}')`,
                backgroundSize: "cover",
              }}
              className={clsx(`h-[372px] w-[282px] rounded-[20px]`)}
            />
            <div className={styles.cardWrapper}>
              <div className={styles.imageWrapper}>
                <div
                  style={{
                    backgroundImage: `url('${selectedGathering.invitation_img_url}')`,
                    backgroundSize: "cover",
                  }}
                  className={styles.image}
                />
              </div>
              <Flex direction="column" className="px-[20px] py-[15px]">
                <span className={styles.textWrapper}>
                  {selectedGathering.name}
                </span>
                <Spacing size={8} />
                <span className="text-C5">{selectedGathering.description}</span>
                <Spacing size={16} />
                <span className={styles.dateWrapper}>
                  {selectedGathering.date}
                </span>
              </Flex>
            </div>
          </div>
        </div>
      ) : null}
      {img ? <Decorate /> : null}
      {/* <Decorate /> */}
      <DecoStickerBottomSheet
        open={decoModalOpen}
        onClose={() => setDecoModalOpen(false)}
      />
      {<SheetOpenBtnContainer tooltip />}
      <FixedBottomButton
        bgColor="bg-grayscale-50"
        label={"이미지 저장"}
        onClick={() => {
          onNext();
        }}
      />
    </div>
  );
}

const styles = {
  button:
    "py-[10px] px-[12px] text-C2 bg-grayscale-900 rounded-[10px] cursor-pointer text-base-white",
  cardContainer:
    "relative px-[33px] py-[40px] flex bg-base-white rounded-[20px] justify-center items-center border border-[#AEAEAE] border-dotted w-[350px] h-[453px]",
  cardWrapper:
    "absolute top-[27px] left-[26.5px] flex flex-col bg-base-white rounded-[12px] w-[230px] h-[318px]",
  imageWrapper:
    "w-[230px] h-full rounded-t-[12px] bg-grayscale-50 overflow-hidden",
  image: "object-cover w-[230px] h-[220px]",
  textWrapper: "flex-grow text-T5 ",
  dateWrapper: "text-C5 text-grayscale-500",
};
