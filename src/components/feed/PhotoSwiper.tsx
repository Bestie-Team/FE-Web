import Image from "next/image";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";

export default function PhotoSwiper({ images }: { images: string[] }) {
  return (
    <div className="pl-[20px]">
      <Swiper
        slidesPerView={1.077}
        spaceBetween={12}
        grabCursor={true}
        className="custom-swiper w-full"
      >
        {images.map((imageUrl, idx) => (
          <SwiperSlide className="relative" key={imageUrl}>
            <Image
              src={imageUrl}
              alt={`${idx + 1}번째 호텔의 이미지`}
              className="object-cover rounded-[16px] aspect-[17/18]"
              width={340}
              height={360}
            />
            <div className={imageInfoStyle}>
              <span>안녕</span>
              <span>2024.07.24</span>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

const imageInfoStyle =
  "flex justify-between w-full absolute bottom-0 text-base-white text-C2 px-[16px] py-[10px] rounded-b-[16px] bg-[#00000080]";
