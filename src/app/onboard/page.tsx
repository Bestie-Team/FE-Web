"use client";
import React, { MouseEvent, useRef, useState } from "react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { NavigationOptions } from "swiper/types";
import Image from "next/image";
import { Navigation, Pagination } from "swiper/modules";
import { useRouter } from "next/navigation";
import Flex from "@/components/shared/Flex";
import { Swiper as SwiperType } from "swiper";

export default function OnBoardCardSlider() {
  const nextRef = useRef<HTMLDivElement | null>(null);
  const swiperRef = useRef<SwiperType | null>(null);
  const [button, setButton] = useState("다음");
  const router = useRouter();

  const onClickHandler = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();

    if (!swiperRef.current) return;
    else if (nextRef.current?.textContent == "시작하기") {
      router.push("/feed");
    }
    console.log(swiperRef.current.activeIndex, onBoardCardContents.length - 1);
  };

  return (
    <div
      className="absolute inset-0 h-dvh min-h-[400px] bg-grayscale-50 pt-6"
      style={{
        zIndex: 999,
      }}
    >
      <Swiper
        onSlideChange={(swiper) => {
          if (swiper.activeIndex === onBoardCardContents.length - 1) {
            setButton("시작하기");
          } else {
            setButton("다음");
          }
        }}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        modules={[Pagination, Navigation]}
        navigation={{
          nextEl: nextRef.current,
        }}
        className="h-[calc(100dvh-100px)]"
        slidesPerView={1}
        onBeforeInit={(swiper) => {
          if (swiper.params.navigation) {
            const navigation = swiper.params.navigation as NavigationOptions;
            navigation.nextEl = nextRef.current;
          }
        }}
        pagination={{ type: "bullets" }}
      >
        {onBoardCardContents.map(({ title, description, imageUrl }, idx) => (
          <SwiperSlide className="h-full" key={idx}>
            <Flex
              className="h-full pt-20 pb-4 gap-10"
              direction="column"
              justify="space-between"
              align="center"
            >
              <Flex
                direction="column"
                justify="center"
                align="center"
                className="gap-4"
              >
                <span className="text-[24px] font-[600] leading-[31.2px]">
                  {title}
                </span>
                {description}
              </Flex>
              <Image
                alt="title"
                src={imageUrl}
                width={390}
                height={460}
                loading="eager"
                className={"object-contain h-5/6"}
              />
            </Flex>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className={styles.buttonWrapper}>
        <div ref={nextRef} className={styles.button} onClick={onClickHandler}>
          {button}
        </div>
      </div>
    </div>
  );
}

const onBoardCardContents = [
  {
    title: "피드 작성",
    description: (
      <Flex
        direction="column"
        className="gap-[6px] text-B2 text-grayscale-600"
        justify="center"
        align="center"
      >
        <span>추억을 공유하고 싶은 이들을</span>
        <span>선택해서 피드를 작성해요</span>
      </Flex>
    ),
    imageUrl: "https://cdn.lighty.today/onBoard/1.webp",
  },
  {
    title: "피드 작성",
    description: (
      <Flex
        direction="column"
        className="gap-[6px] text-B2 text-grayscale-600"
        justify="center"
        align="center"
      >
        <span>내가 선택한 이들에게만</span>
        <span>피드가 보여져요</span>
      </Flex>
    ),
    imageUrl: "https://cdn.lighty.today/onBoard/2.webp",
  },

  {
    title: "포토 카드",
    description: (
      <Flex
        direction="column"
        className="gap-[6px] text-B2 text-grayscale-600"
        justify="center"
        align="center"
      >
        <span>오직 라이티만 있는 기능!</span>
        <span>피드를 포토카드로 만들 수 있어요</span>
      </Flex>
    ),
    imageUrl: "https://cdn.lighty.today/onBoard/3.webp",
    width: 430,
  },
  {
    title: "약속 만들기",
    description: (
      <Flex
        direction="column"
        className="gap-[6px] text-B2 text-grayscale-600"
        justify="center"
        align="center"
      >
        <span>라이티에서는 친구들과</span>
        <span>특별한 약속을 만들 수 있어요</span>
      </Flex>
    ),
    imageUrl: "https://cdn.lighty.today/onBoard/4.webp",
  },
  {
    title: "초대장 보내기",
    description: (
      <Flex
        direction="column"
        className="gap-[6px] text-B2 text-grayscale-600"
        justify="center"
        align="center"
      >
        <span>약속 초대는 특별하게!</span>
        <span>귀여운 초대장을 보낼 수 있어요</span>
      </Flex>
    ),
    imageUrl: "https://cdn.lighty.today/onBoard/5.webp",
  },
];

const styles = {
  buttonWrapper:
    "bg-base-white w-full px-5 py-3 font-[600] text-base text-center leading-[16.8px]",
  button:
    "rounded-full bg-grayscale-900 py-[18px] w-full text-base-white cursor-pointer",
};
