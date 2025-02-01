import Flex from "../shared/Flex";
import Image from "next/image";
import Spacing from "../shared/Spacing";
import { Pagination } from "swiper/modules";
import { HOME_BANNER, HOME_BANNER2 } from "@/constants/images";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
const BANNER_DATA = [
  {
    id: 1,
    subTitle: "Welcome To Lighty",
    title: "소중한 당신의 추억을 기록하세요",
    image: HOME_BANNER,
    sliceAt: 7,
  },
  {
    id: 2,
    subTitle: "친구 초대 이벤트",
    title: "'찐친' 1명만 추가해도 스티커팩 제공",
    image: HOME_BANNER2,
    sliceAt: 13,
  },
  {
    id: 3,
    subTitle: "모임 약속 만들기",
    title: "모임 약속을 만들어볼까요?",
    image: HOME_BANNER2,
    sliceAt: 6,
  },
  {
    id: 4,
    subTitle: "포토 카드 꾸미기",
    title: "다꾸말고 '포꾸'는 어때?",
    image: HOME_BANNER2,
    sliceAt: 4,
  },
];
const BannerSlide = ({
  subTitle,
  title,
  image,
  sliceAt,
}: {
  subTitle: string;
  title: string;
  image: string;
  sliceAt: number;
}) => (
  <div className="relative w-full">
    <div className="h-[420px] w-full">
      <Image
        priority
        alt="homeBanner"
        src={image}
        width={600}
        height={420}
        className={styles.homeBannerImage}
      />
    </div>
    <Flex direction="column" className={styles.textWrapper}>
      <span className={styles.subTitle}>{subTitle}</span>
      <Spacing size={8} />
      <Flex direction="column">
        <span className={styles.title}>{title.slice(0, sliceAt)}</span>
        <Spacing size={6} />
        <span className={styles.title}>{title.slice(sliceAt)}</span>
      </Flex>
    </Flex>
  </div>
);

export default function HomeBannerContainer() {
  return (
    <Swiper modules={[Pagination]} pagination={{ type: "fraction" }}>
      {BANNER_DATA.map((slide) => (
        <SwiperSlide key={slide.id}>
          <BannerSlide {...slide} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

const styles = {
  homeBannerImage: "h-[420px]",

  textWrapper: "absolute bottom-0 left-0 pl-6 pb-8",
  subTitle:
    "text-base-white font-[500] text-[14px] leading-[24px] tracking-[-0.42px]",
  title: "text-base-white text-T1",
};
