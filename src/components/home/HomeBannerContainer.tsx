import Flex from "../shared/Flex";
import Image from "next/image";
import Spacing from "../shared/Spacing";
import { Pagination } from "swiper/modules";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { BANNER_DATA } from "@/constants/banner";

export interface AD_IMAGE {
  src: string;
  className: string;
  width: number;
  height: number;
}

const BannerSlide = ({
  subTitle,
  title,
  image,
  sliceAt,
  ad_image,
}: {
  subTitle: string;
  title: string;
  image: string;
  sliceAt: number;
  ad_image: AD_IMAGE | null;
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
    {ad_image != null && (
      <Image
        src={ad_image.src}
        alt={title}
        className={ad_image.className}
        width={ad_image.width}
        height={ad_image.height}
      />
    )}
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
