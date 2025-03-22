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
import { cardFrameAtom, cardSelectedFeedAtom } from "@/atoms/card";
import { useRecoilState, useRecoilValue } from "recoil";
import { frames } from "@/constants/photoCard";
import { format } from "date-fns";
import ArrowLeftIcon from "../shared/Icon/ArrowLeftIcon";
import ArrowRightIcon from "../shared/Icon/ArrowRightIcon";
import cloudFrontLoader from "@/utils/cloudfrontLoader";

export default function SelectFrameSwiper() {
  const selectedFeed = useRecoilValue(cardSelectedFeedAtom);
  const [selectedFrame, setSelectedFrame] = useRecoilState(cardFrameAtom);
  const ref = useRef<HTMLDivElement>(null);

  const prevRef = useRef<HTMLDivElement | null>(null);
  const nextRef = useRef<HTMLDivElement | null>(null);

  const frameNames = [
    "ribbon",
    "zebra",
    "green",
    "check_yellow",
    "check_pink",
    "check_purple",
    "check_blue",
    "check_green",
    "diagonal_pink",
    "vertical_yellow",
  ];

  useEffect(() => {
    onChangeFrame(0);
  }, []);

  const onChangeFrame = (id: number) => {
    setSelectedFrame(id);
  };

  const isLastFrame = selectedFrame === frameNames.length - 1;
  const isFirstFrame = selectedFrame === 0;

  return (
    <div className={styles.swiperContainer}>
      <div
        ref={prevRef}
        className={clsx(
          styles.prevButton,
          isFirstFrame ? "hidden" : "bg-grayscale-900"
        )}
      >
        <ArrowLeftIcon width="24" height="24" color="white" />
      </div>
      <div
        ref={nextRef}
        className={clsx(
          styles.nextButton,
          isLastFrame ? "hidden" : "bg-grayscale-900"
        )}
      >
        <ArrowRightIcon width="24" height="24" color="white" />
      </div>
      <Swiper
        navigation={{
          prevEl: prevRef.current,
          nextEl: nextRef.current,
        }}
        onActiveIndexChange={(swiper) => onChangeFrame(swiper.activeIndex)}
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
            <Flex direction="column" className="gap-5">
              <div ref={ref} className={clsx(styles.frameWrapper)}>
                <Flex direction="column" className={styles.cardWrapper}>
                  <div className={styles.imageWrapper}>
                    <Image
                      loader={cloudFrontLoader}
                      src={selectedFeed.imageUrl}
                      width={230}
                      height={230}
                      style={{
                        flexGrow: 1,
                      }}
                      alt="img"
                      className={styles.image}
                    />
                  </div>
                  <Flex direction="column" className="px-5 py-[15px]">
                    <span className={styles.textWrapper}>
                      {selectedFeed.name}
                    </span>
                    <Spacing size={8} />
                    <span className="text-C5">{selectedFeed.content}</span>
                    <Spacing size={16} />
                    <span className={styles.dateWrapper}>
                      {format(selectedFeed.date.slice(0, 10), "yyyy.MM.dd")}
                    </span>
                  </Flex>
                </Flex>
                <Image
                  loading="eager"
                  loader={cloudFrontLoader}
                  src={frame}
                  width={282}
                  height={372}
                  alt="card"
                  className={styles.frame}
                  priority={idx === 0}
                />
              </div>
              <div className={styles.frameName}>{frameNames[idx]}</div>
            </Flex>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

const styles = {
  prevButton:
    "absolute top-[167px] left-[32px] z-10 transform cursor-pointer w-[56px] h-[56px] rounded-full flex justify-center items-center",
  nextButton:
    "absolute top-[167px] right-[32px] z-10 transform cursor-pointer w-[56px] h-[56px] rounded-full flex justify-center items-center",
  frameWrapper: "relative p-[22px] h-[390px] shadow-custom rounded-[20px]",
  frame: "absolute inset-0 h-full w-full z-[-1] rounded-[20px]",
  swiperContainer: "relative w-full bg-gray-50",

  frameName:
    "w-fit bg-base-white text-C1 py-[12px] px-[16px] border rounded-xl mx-auto",

  slide:
    "relative w-[324px] !h-[450px] my-auto overflow-hidden cursor-pointer rounded-[20px]",
  cardContainer:
    "relative px-[33px] py-[40px] flex bg-base-white rounded-[20px] justify-center items-center border border-[#AEAEAE] border-dotted w-[350px] h-[453px]",
  cardWrapper: "bg-base-white rounded-xl w-full h-full",

  imageWrapper:
    "w-full h-full rounded-t-[12px] bg-grayscale-50 overflow-hidden",
  image: "object-cover w-full h-full",
  textWrapper: "flex-grow text-T5 ",
  dateWrapper: "text-C5 text-grayscale-500",
};
