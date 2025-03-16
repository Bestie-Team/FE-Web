import Image from "next/image";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import { formatToDisplay } from "@/utils/makeUTC";
import { Feed } from "@/models/feed";
import { Lighty } from "@/constants/images";
import { memo, useState } from "react";

const PhotoSwiper = memo(
  ({ feed, percent = 1.077 }: { feed: Feed; percent?: number }) => {
    const [loaded, setLoaded] = useState(false);
    const formattedDate = () => {
      const date = feed.gathering?.gatheringDate
        ? new Date(feed.gathering.gatheringDate)
        : new Date(feed.createdAt);
      return formatToDisplay(date).slice(0, 10);
    };

    return (
      <Swiper
        slidesPerView={percent}
        spaceBetween={12}
        grabCursor={true}
        style={{ paddingLeft: "20px" }}
        className="custom-swiper w-full"
        onTouchStart={(swiper, e) => {
          e.stopPropagation();
        }}
        onTouchMove={(swiper, e) => {
          e.stopPropagation();
        }}
        onTouchEnd={(swiper, e) => {
          e.stopPropagation();
        }}
      >
        {feed.images.map((image, idx) => (
          <SwiperSlide
            className="relative bg-[#F4F4F4] rounded-2xl"
            key={`slide${idx}`}
          >
            {loaded === false && (
              <div className="absolute inset-0 rounded-2xl bg-grayscale-50" />
            )}
            <Image
              loading="eager"
              src={image || Lighty}
              alt={`Feed image ${idx + 1}`}
              className={styles.image}
              width={340}
              height={360}
              key={`swiperImg${idx + 1}`}
              onLoad={() => setLoaded(true)}
            />

            {idx === 0 && (
              <div className={styles.feedImageInfo}>
                <span>{feed.gathering?.name}</span>
                <span>{formattedDate()}</span>
              </div>
            )}
            {/* {type === "home" && (
              <div className={styles.gatheringImageInfo}>
                <span>{feed.gathering?.name}</span>
                <Spacing size={4} />
                <span className="text-C2 text-grayscale-400">
                  {formattedDate()}
                </span>
              </div>
            )} */}
          </SwiperSlide>
        ))}
      </Swiper>
    );
  }
);

PhotoSwiper.displayName = "PhotoSwiper";

export default PhotoSwiper;

const styles = {
  feedImageInfo:
    "flex justify-between w-full absolute bottom-0 text-base-white text-C2 px-4 py-[10px] rounded-b-[16px] bg-[#00000080]",
  gatheringImageInfo:
    "flex flex-col justify-between w-full absolute bottom-[-0.5px] text-grayscale-900 text-T5 p-3 pt-2 rounded-b-[16px] bg-base-white",
  image: "slide-img object-cover rounded-2xl aspect-[17/18]",
};
