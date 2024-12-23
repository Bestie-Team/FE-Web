"use client";
import Image from "next/image";
import React, { useCallback, useRef } from "react";
import { toPng } from "html-to-image";
import Flex from "../shared/Flex";
import Spacing from "../shared/Spacing";
import { useSetRecoilState } from "recoil";
import { cardImageUrlAtom } from "@/atoms/card";

export default function Card() {
  const setCardImageUrl = useSetRecoilState(cardImageUrlAtom);
  const ref = useRef<HTMLDivElement>(null);

  const onButtonClick = useCallback(() => {
    if (ref.current === null) {
      return;
    }
    toPng(ref.current, { cacheBust: true })
      .then((dataUrl) => {
        setCardImageUrl(dataUrl);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [ref]);

  return (
    <div
      id="card"
      ref={ref}
      className={cardContainerStyle}
      onClick={onButtonClick}
    >
      <Flex
        justify="space-between"
        direction="column"
        className={cardWrapperStyle}
      >
        <div className={imageWrapperStyle}>
          <Image
            src="https://d1al3w8x2wydb3.cloudfront.net/images/bini.JPG"
            width={230}
            height={230}
            alt="img"
            className={imageStyle}
          />
        </div>
        <Spacing size={10} />
        <div className={textWrapperStyle}>모여~~~</div>
        <Spacing size={16} />
        <div className={dateWrapperStyle}>날짜</div>
      </Flex>
    </div>
  );
}

const cardContainerStyle =
  "flex bg-base-white w-[339px] h-[453px] rounded-[20px] justify-center items-center";

const cardWrapperStyle =
  "bg-base-white px-[14px] py-[18px] rounded-[20px] shadow-sm w-[258px] h-[351px]";

const imageWrapperStyle =
  "w-[230px] h-[230px] rounded-[12px] bg-grayscale-50 overflow-hidden";

const imageStyle = "object-cover w-full h-full";

const textWrapperStyle = "flex-grow text-[10px] font-[500] leading-[16.49px]";

const dateWrapperStyle =
  "text-[10px] font-[500] leading-[11.15px] text-grayscale-500";
