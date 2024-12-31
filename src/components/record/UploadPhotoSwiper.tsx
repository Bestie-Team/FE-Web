import Image from "next/image";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import clsx from "clsx";
import Flex from "../shared/Flex";
import { PlusCircleButtonSmall } from "../shared/buttons/PlusCircleButton";
import Spacing from "../shared/Spacing";

export default function UploadPhotoSwiper({
  images,
  onImageClick,
  setImages,
}: {
  images: string[];
  onImageClick?: (groupId: string) => void;
  setImages: React.Dispatch<
    React.SetStateAction<{
      imageUrl: string[];
      recordContent: string;
    }>
  >;
}) {
  const maxImages = 5;

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files as ArrayLike<File>);
    if (images.length + files.length > maxImages) {
      alert(`최대 ${maxImages}장까지만 업로드 가능합니다.`);
      return;
    }

    const newImages = files.map((file) => URL.createObjectURL(file));
    setImages((prev) => ({
      ...prev,
      imageUrl: [...prev.imageUrl, ...newImages],
    }));
  };
  return (
    <div className="relative w-full">
      <Swiper
        slidesPerView={1.59}
        spaceBetween={12}
        grabCursor={true}
        className="custom-swiper w-full h-[250px]"
      >
        <SwiperSlide
          className={clsx(
            "ml-[20px] relative h-[250px] w-[240px] rounded-[16px] overflow-hidden"
          )}
        >
          <>
            <Image
              alt="empty"
              className="slide-img w-[240px] h-[250px]"
              src={"https://cdn.lighty.today/rectEdit.png"}
              width={240}
              height={250}
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <label className="cursor-pointer">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  multiple
                />
                <Flex direction="column" align="center">
                  <PlusCircleButtonSmall className="w-[25.2px] h-[25.2px]" />
                  <Spacing size={6} />
                  <span>
                    <span className="text-T6 text-grayscale-300">사진</span>
                    <span className="text-T6 text-grayscale-900">{` ${images.length}`}</span>
                    <span className="text-T6 text-grayscale-300">/5</span>
                  </span>
                </Flex>
              </label>
            </div>
          </>
        </SwiperSlide>
        {images.map((imageUrl, idx) => (
          <SwiperSlide
            onClick={() => {
              if (onImageClick) {
                onImageClick(String(idx));
              } else return;
            }}
            className={clsx(
              "h-[250px] w-[240px] rounded-[16px] overflow-hidden",
              idx === 0 && "ml-[20px]"
            )}
            key={`${imageUrl}${idx}`}
          >
            <Image
              src={imageUrl}
              alt={`${idx + 1}번째 이미지`}
              className="slide-img object-cover w-[240px] h-[250px]"
              width={270}
              height={320}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
