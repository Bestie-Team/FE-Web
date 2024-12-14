import Image from "next/image";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import Spacing from "../shared/Spacing";
import clsx from "clsx";
import CheckIcon from "../shared/icons/CheckIcon";
import Flex from "../shared/Flex";

export default function SmallPhotoSwiper({
  images,
  onImageClick,
  groupId,
}: {
  images: string[];
  onImageClick?: (groupId: string) => void;
  groupId: string | null;
}) {
  return (
    <div className="relative w-full bg-gray-100 ">
      <Swiper
        slidesPerView={1.4}
        spaceBetween={12}
        grabCursor={true}
        className="custom-swiper w-full h-[340px]"
      >
        {images.map((imageUrl, idx) => (
          <SwiperSlide
            onClick={() => {
              if (onImageClick) {
                onImageClick(String(idx));
              } else return;
            }}
            className={clsx(
              "relative !h-[320px] my-auto shadow-custom rounded-[20px] overflow-hidden",
              idx === 0 && "ml-[20px]"
            )}
            key={`${imageUrl}${idx}`}
          >
            <Image
              src={imageUrl}
              alt={`${idx + 1}`}
              className="slide-img object-cover w-[270px] h-[320px]"
              width={270}
              height={320}
            />
            <div className={imageInfoStyle}>
              <span className="text-T3">christmas party</span>
              <Spacing size={6} />
              <span className="text-C2 text-grayscale-600">
                먹고 죽는 크리스마스 돼지 파티에 초대합니다.
              </span>
            </div>
            <Flex
              align="center"
              justify="center"
              className="absolute rounded-[20px] inset-0 bg-[#00000080] pb-[79px]"
            >
              <CheckIcon />
            </Flex>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

const imageInfoStyle =
  "bg-base-white flex flex-col w-full absolute bottom-[-1px] pl-[20px] pt-[12px] pb-[24px] rounded-b-[20px] z-10";
