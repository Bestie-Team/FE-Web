"use client";
import Image from "next/image";
import React, { useCallback, useRef, useState } from "react";
import { toPng } from "html-to-image";
import Spacing from "../shared/Spacing";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  cardDecorateModalStateAtom,
  cardFrameAtom,
  cardImageUrlAtom,
  cardSelectedGatheringAtom,
} from "@/atoms/card";
import Flex from "../shared/Flex";
import clsx from "clsx";
import FixedBottomButton from "../shared/buttons/FixedBottomButton";
import Decorate from "./Decorate";
import { useRouter } from "next/navigation";
import SheetOpenBtnContainer from "../shared/bottomSheet/shared/SheetOpenBtnContainer";
import DecoStickerBottomSheet from "../shared/bottomSheet/DecoStickerBottomSheet";

export default function SelectFrame({ onNext }: { onNext: () => void }) {
  const selectedFrame = useRecoilValue(cardFrameAtom);
  const setCardImageUrl = useSetRecoilState(cardImageUrlAtom);
  const [hide, setHide] = useState<boolean>(false);
  const selectedGathering = useRecoilValue(cardSelectedGatheringAtom);
  const ref = useRef<HTMLDivElement>(null);
  const route = useRouter();
  const [decoModalOpen, setDecoModalOpen] = useRecoilState(
    cardDecorateModalStateAtom
  );
  const frames = ["/frame1.jpeg", "/frame2.jpeg", "/frame3.jpeg"];

  const onClickToDecorate = useCallback(() => {
    if (ref.current === null) {
      return;
    }
    toPng(ref.current, { cacheBust: true })
      .then((dataUrl) => {
        setCardImageUrl(dataUrl);
      })
      .then(() => setHide(true))
      .catch((err) => {
        console.log(err);
      });
  }, [setCardImageUrl]);

  const onClickSelectFrame = () => {
    route.push("/card/frame");
  };

  return (
    <div className="h-screen flex flex-col pt-[72px] px-[20px] items-center">
      <Flex justify="space-between" className="px-[20px] w-full" align="center">
        <span className="text-B4 text-grayscale-500">
          점선 영역이 이미지 영역이에요!
        </span>
        <button className={styles.button} onClick={onClickSelectFrame}>
          프레임 선택
        </button>
        <button className={styles.button} onClick={onClickToDecorate}>
          스티커 꾸미기
        </button>
      </Flex>
      <Spacing size={24} />
      {hide === false ? (
        <div id="card" className={clsx(styles.cardContainer)}>
          <div ref={ref} className="relative rounded-[20px] w-full shadow-sm">
            <Image
              src={frames[0 || selectedFrame!]}
              width={282}
              height={372}
              alt="card"
              className="h-[372px] w-[282px] rounded-[20px]"
            />
            <div className={styles.cardWrapper}>
              <div className={styles.imageWrapper}>
                <Image
                  src={selectedGathering.invitation_img_url as string}
                  width={230}
                  height={230}
                  style={{
                    flexGrow: 1,
                  }}
                  alt="img"
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
      <DecoStickerBottomSheet
        open={decoModalOpen}
        onClose={() => setDecoModalOpen(false)}
      />
      {<SheetOpenBtnContainer tooltip />}
      {hide === true ? <Decorate /> : null}
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
  image: "object-cover w-full h-full",
  textWrapper: "flex-grow text-T5 ",
  dateWrapper: "text-C5 text-grayscale-500",
};
