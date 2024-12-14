import Image from "next/image";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";

export default function PhotoSwiper({
  images,
  percent,
}: {
  images: string[];
  percent?: number;
}) {
  return (
    <div className="pl-[20px]">
      <Swiper
        slidesPerView={percent ?? 1.077}
        spaceBetween={12}
        grabCursor={true}
        className="custom-swiper w-full"
      >
        {images.map((imageUrl, idx) => (
          <SwiperSlide className="relative" key={`slide${idx}`}>
            <Image
              src={imageUrl}
              alt={`img${idx + 1}`}
              className={imageStyle}
              width={340}
              height={360}
              key={`swiperImg${idx + 1}`}
            />
            {idx === 0 && (
              <div className={imageInfoStyle}>
                <span>안녕</span>
                <span>2024.07.24</span>
              </div>
            )}
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

const imageInfoStyle =
  "flex justify-between w-full absolute bottom-0 text-base-white text-C2 px-[16px] py-[10px] rounded-b-[16px] bg-[#00000080]";

const imageStyle = "slide-img object-cover rounded-[16px] aspect-[17/18]";
