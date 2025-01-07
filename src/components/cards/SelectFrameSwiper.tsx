import Image from "next/image";
import "swiper/css";
import "swiper/css/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import Spacing from "../shared/Spacing";
import Flex from "../shared/Flex";
import clsx from "clsx";
import { useRef } from "react";
import { Navigation } from "swiper/modules";
import { NavigationOptions } from "swiper/types";
import { cardSelectedGatheringAtom } from "@/atoms/card";
import { useRecoilValue } from "recoil";

export default function SelectFrameSwiper() {
  const selectedGathering = useRecoilValue(cardSelectedGatheringAtom);

  const ref = useRef<HTMLDivElement>(null);
  const handleGatheringClick = (id: number) => {};

  const prevRef = useRef<HTMLDivElement | null>(null);
  const nextRef = useRef<HTMLDivElement | null>(null);

  const frames = ["/frame1.jpeg", "/frame2.jpeg", "/frame3.jpeg"];
  const frameNames = ["ribbon", "zebra", "green"];
  return (
    <div className={styles.swiperContainer}>
      <div
        ref={prevRef}
        className="absolute top-[167px] left-[32px] z-10 transform cursor-pointer"
      >
        <Image src="/swiper-left.png" alt="prev" width={56} height={56} />
      </div>
      <div
        ref={nextRef}
        className="absolute top-[167px] right-[32px] z-10 transform cursor-pointer"
      >
        <Image src="/swiper-right.png" alt="next" width={56} height={56} />
      </div>
      <Swiper
        navigation={{
          prevEl: prevRef.current,
          nextEl: nextRef.current,
        }}
        // slidesPerView={1.2}
        // spaceBetween={22}
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
          <SwiperSlide
            onClick={() => handleGatheringClick(idx)}
            className={clsx(styles.slide)}
            key={`frame${idx}`}
          >
            <Flex direction="column">
              <div
                ref={ref}
                className="relative p-[22px] h-[390px] shadow-custom rounded-[20px]"
              >
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
                  className="absolute inset-0 h-full w-full z-[-1] rounded-[20px]"
                />
              </div>
              <Spacing size={20} />
              <div className="w-fit bg-base-white text-C1 py-[12px] px-[16px] border rounded-[12px] mx-auto">
                {frameNames[idx]}
              </div>
            </Flex>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

const styles = {
  swiperContainer: "relative w-full bg-gray-100",

  slide: "relative w-[324px] !h-[450px] my-auto overflow-hidden",

  gatheringInfoWrapper:
    "bg-base-white flex flex-col w-full absolute bottom-[-2px] pl-[20px] pt-[12px] pb-[24px] rounded-b-[20px] z-10",

  checkWrapper: "absolute rounded-[20px] inset-0 bg-[#00000080] pb-[79px]",

  button:
    "py-[10px] px-[12px] text-C2 bg-grayscale-900 rounded-[10px] cursor-pointer text-base-white",
  cardContainer:
    "relative px-[33px] py-[40px] flex bg-base-white rounded-[20px] justify-center items-center border border-[#AEAEAE] border-dotted w-[350px] h-[453px]",
  cardWrapper: "flex flex-col bg-base-white rounded-[12px] w-full h-full",

  imageWrapper:
    "w-full h-full rounded-t-[12px] bg-grayscale-50 overflow-hidden",

  image: "object-cover w-full h-full",
  textWrapper: "flex-grow text-T5 ",
  dateWrapper: "text-C5 text-grayscale-500",
};
