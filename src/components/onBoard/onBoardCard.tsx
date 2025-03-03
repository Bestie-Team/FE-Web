import React, { useRef, useState } from "react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { NavigationOptions } from "swiper/types";
import Flex from "../shared/Flex";
import Image from "next/image";
import Spacing from "../shared/Spacing";
import clsx from "clsx";
import { Navigation, Pagination } from "swiper/modules";
import { useRouter } from "next/navigation";

export default function OnBoardCardSlider() {
  const nextRef = useRef<HTMLDivElement | null>(null);
  const [swiperIndex, setSwiperIndex] = useState(0);
  const router = useRouter();
  return (
    <div
      className="absolute inset-0 h-dvh min-h-[400px] bg-grayscale-50"
      style={{
        zIndex: 999,
      }}
    >
      <Spacing size={24} />
      <Swiper
        onRealIndexChange={(swiper) => setSwiperIndex(swiper.activeIndex)}
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
        {onBoardCardContents.map(
          ({ title, description, imageUrl, width }, idx) => (
            <SwiperSlide className="h-full" key={idx}>
              <Flex
                className="h-full pt-24 pb-10"
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
                  width={width}
                  height={435}
                  className={clsx(
                    "object-contain",
                    idx === 0 ? " h-[500px]" : "h-[435px]"
                  )}
                />
              </Flex>
            </SwiperSlide>
          )
        )}
      </Swiper>
      <div className={styles.buttonWrapper}>
        <div
          role="button"
          ref={nextRef}
          onMouseDown={() => {
            if (swiperIndex === onBoardCardContents.length - 1) {
              router.replace("/feed?ref=signup");
            }
          }}
          className={styles.button}
        >
          다음
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
    imageUrl: "https://cdn.lighty.today/onBoard/00.webp",
    width: 350,
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
    imageUrl: "https://cdn.lighty.today/onBoard/01.webp",
    width: 430,
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
    imageUrl: "https://cdn.lighty.today/onBoard/02.webp",
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
    imageUrl: "https://cdn.lighty.today/onBoard/03.webp",
    width: 430,
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
    imageUrl: "https://cdn.lighty.today/onBoard/04.webp",
    width: 275,
  },
];

const styles = {
  buttonWrapper:
    "bg-base-white w-full px-5 py-3 font-[600] text-[16px] text-center leading-[16.8px]",
  button: "rounded-full bg-grayscale-900 py-[18px] w-full text-base-white",
};
