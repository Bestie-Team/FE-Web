import Image from "next/image";
import "swiper/css";
import "swiper/css/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import Spacing from "../shared/Spacing";
import Flex from "../shared/Flex";
import clsx from "clsx";
import { useEffect, useRef } from "react";
import { Navigation } from "swiper/modules";
import { NavigationOptions } from "swiper/types";
import { cardFrameAtom, cardSelectedGatheringAtom } from "@/atoms/card";
import { useRecoilValue, useSetRecoilState } from "recoil";

export default function SelectFrameSwiper() {
  const selectedGathering = useRecoilValue(cardSelectedGatheringAtom);
  const setSelectedFrame = useSetRecoilState(cardFrameAtom);
  const ref = useRef<HTMLDivElement>(null);

  const prevRef = useRef<HTMLDivElement | null>(null);
  const nextRef = useRef<HTMLDivElement | null>(null);

  const frames = [
    "/frame1.jpeg",
    "/frame2.jpeg",
    "/frame3.jpeg",
    "/frame4.jpeg",
  ];
  const frameNames = ["ribbon", "zebra", "green", "check"];

  useEffect(() => {
    onChangeFrame(0);
  }, []);

  const onChangeFrame = (id: number) => {
    setSelectedFrame(id);
  };

  return (
    <div className={styles.swiperContainer}>
      <div ref={prevRef} className={styles.prevButton}>
        <Image src="/swiper-left.png" alt="prev" width={56} height={56} />
      </div>
      <div ref={nextRef} className={styles.nextButton}>
        <Image src="/swiper-right.png" alt="next" width={56} height={56} />
      </div>
      <Swiper
        navigation={{
          prevEl: prevRef.current,
          nextEl: nextRef.current,
        }}
        onNavigationNext={(swiper) => onChangeFrame(swiper.activeIndex)}
        onNavigationPrev={(swiper) => onChangeFrame(swiper.activeIndex)}
        modules={[Navigation]}
        onBeforeInit={(swiper) => {
          if (swiper.params.navigation) {
            const navigation = swiper.params.navigation as NavigationOptions;
            navigation.prevEl = prevRef.current;
            navigation.nextEl = nextRef.current;
          }
        }}
        className="custom-swiper w-[324px] h-[451px]"
      >
        {frames.map((frame, idx) => (
          <SwiperSlide className={styles.slide} key={`frame${idx}`}>
            <Flex direction="column">
              <div ref={ref} className={clsx(styles.frameWrapper)}>
                <div className={styles.cardWrapper}>
                  <div className={styles.imageWrapper}>
                    <Image
                      src={selectedGathering?.invitationImageUrl || ""}
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
                    <span className="text-C5">
                      {selectedGathering.description}
                    </span>
                    <Spacing size={16} />
                    <span className={styles.dateWrapper}>
                      {selectedGathering.date}
                    </span>
                  </Flex>
                </div>
                <Image
                  src={frame}
                  width={282}
                  height={372}
                  alt="card"
                  className={styles.frame}
                />
              </div>
              <Spacing size={20} />
              <div className={styles.frameName}>{frameNames[idx]}</div>
            </Flex>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

const styles = {
  prevButton: "absolute top-[167px] left-[32px] z-10 transform cursor-pointer",
  nextButton: "absolute top-[167px] right-[32px] z-10 transform cursor-pointer",
  frameWrapper: "relative p-[22px] h-[390px] shadow-custom rounded-[20px]",
  frame: "absolute inset-0 h-full w-full z-[-1] rounded-[20px]",
  swiperContainer: "relative w-full bg-gray-100",

  frameName:
    "w-fit bg-base-white text-C1 py-[12px] px-[16px] border rounded-[12px] mx-auto",

  slide: "relative w-[324px] !h-[450px] my-auto overflow-hidden cursor-pointer",
  cardContainer:
    "relative px-[33px] py-[40px] flex bg-base-white rounded-[20px] justify-center items-center border border-[#AEAEAE] border-dotted w-[350px] h-[453px]",
  cardWrapper: "flex flex-col bg-base-white rounded-[12px] w-full h-full",

  imageWrapper:
    "w-full h-full rounded-t-[12px] bg-grayscale-50 overflow-hidden",
  image: "object-cover w-full h-full",
  textWrapper: "flex-grow text-T5 ",
  dateWrapper: "text-C5 text-grayscale-500",
};
