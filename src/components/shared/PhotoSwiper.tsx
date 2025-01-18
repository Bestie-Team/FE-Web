import Image from "next/image";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import Spacing from "./Spacing";
import clsx from "clsx";
import { Feed } from "@/models/feed";
import { formatToDisplay } from "@/utils/makeUTC";

export default function PhotoSwiper({
  feed,
  percent,
  type,
}: {
  feed: Feed;
  percent?: number;
  type?: "home" | "feed";
}) {
  const formattedDate = formatToDisplay(
    feed.gathering?.gatheringDate
      ? feed.gathering?.gatheringDate
      : feed.createdAt
  ).slice(0, 10);
  return (
    <Swiper
      slidesPerView={percent ?? 1.077}
      spaceBetween={12}
      grabCursor={true}
      style={{
        paddingLeft: "20px",
      }}
      className="custom-swiper w-full"
    >
      {feed.images.map((image, idx) => (
        <SwiperSlide
          className={clsx(
            "relative",
            type === "home"
              ? "rounded-[16px] shadow-bottom mt-[8px] mb-[52px]"
              : ""
          )}
          key={`slide${idx}`}
        >
          <Image
            priority
            src={image}
            alt={`img${idx + 1}`}
            className={styles.image}
            width={340}
            height={360}
            key={`swiperImg${idx + 1}`}
          />
          {idx === 0 && type === "feed" ? (
            <div className={styles.feedImageInfo}>
              <span>{feed.gathering?.name}</span>
              <span>{formattedDate}</span>
            </div>
          ) : null}
          {type === "home" ? (
            <div className={styles.gatheringImageInfo}>
              <span>{feed.gathering?.name}</span>
              <Spacing size={4} />
              <span className="text-C2 text-grayscale-400">
                {formattedDate}
              </span>
            </div>
          ) : null}
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

const styles = {
  feedImageInfo:
    "flex justify-between w-full absolute bottom-0 text-base-white text-C2 px-[16px] py-[10px] rounded-b-[16px] bg-[#00000080]",
  gatheringImageInfo:
    "flex flex-col justify-between w-full absolute bottom-[-0.5px] text-grayscale-900 text-T5 p-[12px] pt-[8px] rounded-b-[16px] bg-base-white",
  image: "slide-img object-cover rounded-[16px] aspect-[17/18]",
};
