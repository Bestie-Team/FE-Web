import Image from "next/image";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import clsx from "clsx";
import Flex from "../shared/Flex";
import { PlusCircleButtonSmall } from "../shared/Button/BottomSheetOpenButton";
import Spacing from "../shared/Spacing";
import { useEffect, useState } from "react";
import { SQUARE } from "@/constants/images";

export default function UploadPhotoSwiper({
  feedInfoToEdit,
  filesToUpload,
  onImageClick,
  setFilesToUpload,
}: {
  feedInfoToEdit?: { content: string; images: string[] };
  filesToUpload: File[];
  onImageClick?: (groupId: string) => void;
  setFilesToUpload: React.Dispatch<React.SetStateAction<File[]>>;
}) {
  const [images, setImages] = useState<string[]>(
    feedInfoToEdit?.images ? feedInfoToEdit.images : []
  );
  const maxImages = 5;

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target?.files?.[0];

    if (file) {
      if (filesToUpload.length + filesToUpload.length > maxImages) {
        alert(`최대 ${maxImages}장까지만 업로드 가능합니다.`);
        return;
      }
      setFilesToUpload((prev) => (prev ? [...prev, file] : [file]));

      const reader = new FileReader();
      reader.onload = (event) => {
        const selectedImage = event.target?.result;
        console.log(selectedImage);
        if (selectedImage && typeof selectedImage === "string") {
          setImages((prev) => [...prev, selectedImage]);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    console.log(filesToUpload);
  }, [filesToUpload]);

  return (
    <div className="relative w-full">
      <Swiper
        slidesPerView={1.59}
        spaceBetween={12}
        grabCursor={true}
        className="custom-swiper w-full h-[250px]"
      >
        {feedInfoToEdit ? null : (
          <SwiperSlide className={styles.slide}>
            <>
              <Image
                alt="empty"
                layout="intrinsic"
                className="slide-img w-[240px] h-[250px]"
                src={SQUARE}
                width={240}
                height={250}
              />
              <div className={styles.inputWrapper}>
                <label className="cursor-pointer">
                  <input
                    type="file"
                    accept="image/jpeg, image/jpg, image/bmp, image/webp, image/png"
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
        )}
        {images.map((imageUrl, idx) => (
          <SwiperSlide
            onClick={() => {
              if (onImageClick) {
                onImageClick(String(idx));
              } else return;
            }}
            className={clsx(
              styles.uploadedImageWrapper,
              idx === 0 && "ml-[20px]"
            )}
            key={`${imageUrl}${idx}`}
          >
            <Image
              src={imageUrl}
              layout="intrinsic"
              alt={`${idx + 1}번째 이미지`}
              className={styles.uploadedImage}
              width={270}
              height={320}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

const styles = {
  slide:
    "ml-[20px] relative h-[250px] w-[240px] rounded-[16px] overflow-hidden",
  inputWrapper: "absolute inset-0 flex items-center justify-center",
  uploadedImageWrapper: "h-[250px] w-[240px] rounded-[16px] overflow-hidden",
  uploadedImage: "slide-img object-cover w-[240px] h-[250px]",
};
