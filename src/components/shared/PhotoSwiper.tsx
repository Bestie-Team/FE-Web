import Image from "next/image";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import Spacing from "./Spacing";
import clsx from "clsx";
import { useRouter } from "next/navigation";

export default function PhotoSwiper({
  images,
  percent,
  type,
}: {
  images: string[];
  percent?: number;
  type?: "home" | "feed";
}) {
  const router = useRouter();
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
      {images.map((imageUrl, idx) => (
        <SwiperSlide
          onClick={() => {
            router.push(`/gathering/${1}`);
          }}
          className={clsx(
            "relative",
            type === "home"
              ? "rounded-[16px] shadow-bottom mt-[8px] mb-[52px]"
              : ""
          )}
          key={`slide${idx}`}
        >
          <Image
            src={imageUrl}
            alt={`img${idx + 1}`}
            className={imageStyle}
            width={340}
            height={360}
            key={`swiperImg${idx + 1}`}
          />
          {idx === 0 && type === "feed" ? (
            <div className={feedImageInfoStyle}>
              <span>안녕</span>
              <span>2025.07.24</span>
            </div>
          ) : null}
          {type === "home" ? (
            <div className={gatheringImageInfoStyle}>
              <span>christmas party</span>
              <Spacing size={4} />
              <span className="text-C2 text-grayscale-400">2024.12.24</span>
            </div>
          ) : null}
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

const feedImageInfoStyle =
  "flex justify-between w-full absolute bottom-0 text-base-white text-C2 px-[16px] py-[10px] rounded-b-[16px] bg-[#00000080]";

const gatheringImageInfoStyle =
  "flex flex-col justify-between w-full absolute bottom-[-0.5px] text-grayscale-900 text-T5 p-[12px] pt-[8px] rounded-b-[16px] bg-base-white";

const imageStyle = "slide-img object-cover rounded-[16px] aspect-[17/18]";
