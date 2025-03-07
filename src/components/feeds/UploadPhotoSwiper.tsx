import Image from "next/image";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import clsx from "clsx";
import Flex from "../shared/Flex";
import { PlusCircleButtonSmall } from "../shared/Button/BottomSheetOpenButton";
import Spacing from "../shared/Spacing";
import { useRef, useState } from "react";
import { lightyToast } from "@/utils/toast";
import CloseIcon from "../shared/Icon/CloseIcon";

export default function UploadPhotoSwiper({
  feedInfoToEdit,
  filesToUpload,
  setFilesToUpload,
}: {
  feedInfoToEdit?: { content: string; imageUrls: string[] };
  filesToUpload: File[];
  setFilesToUpload: React.Dispatch<React.SetStateAction<File[]>>;
}) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [images, setImages] = useState<string[]>(
    feedInfoToEdit?.imageUrls ? feedInfoToEdit.imageUrls : []
  );

  const maxImages = 5;

  const convertToWebP = (file: File): Promise<File> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        const img = new window.Image();
        img.src = event.target?.result as string;
        img.onload = () => {
          const canvas = document.createElement("canvas");
          canvas.width = img.width;
          canvas.height = img.height;
          const ctx = canvas.getContext("2d");

          if (!ctx) {
            console.error("Canvas context가 존재하지 않음");
            reject(new Error("Canvas context not found"));
            return;
          }

          ctx.drawImage(img, 0, 0);
          canvas.toBlob(
            (blob) => {
              if (!blob) {
                console.error("WebP 변환 실패");
                reject(new Error("WebP 변환 실패"));
                return;
              }
              const webpFile = new File(
                [blob],
                file.name.replace(/\.\w+$/, ".webp"),
                {
                  type: "image/webp",
                }
              );
              resolve(webpFile);
            },
            "image/webp",
            0.8
          );
        };
        img.onerror = (error) => {
          console.error("이미지 로드 실패", error);
          reject(error);
        };
      };
      reader.onerror = (error) => {
        console.error("FileReader 실패", error);
        reject(error);
      };
    });
  };

  const getFileExt = (fileName: string) => {
    const ext = fileName.split(".").pop()?.toLowerCase();
    if (ext === "jpg" || ext === "png" || ext === "jpeg" || ext === "webp") {
      return ext;
    }
    return null;
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target?.files?.[0];

    if (filesToUpload.length === maxImages) {
      lightyToast.error(`최대 ${maxImages}장까지만 업로드 가능합니다.`);
      return;
    }

    if (file) {
      const maxSize = 5 * 1024 * 1024;
      if (file.size > maxSize) {
        lightyToast.error("파일첨부 사이즈는 5MB 이내로 가능합니다.");
        e.target.value = "";
        return;
      }

      const ext = getFileExt(file.name);
      if (!ext) {
        lightyToast.error(
          "지원되지 않는 파일 형식입니다. (jpg, png, jpeg, webp 형식만 가능)"
        );
        return null;
      }
      const objectUrl = URL.createObjectURL(file);
      setImages((prev) => [...prev, objectUrl]);

      if (ext === "png" || ext === "jpg" || ext === "jpeg") {
        const convertedFile = await convertToWebP(file);
        if (setFilesToUpload) {
          setFilesToUpload((prev) =>
            prev ? [...prev, convertedFile] : [convertedFile]
          );
        }
      } else {
        if (setFilesToUpload) {
          setFilesToUpload((prev) => (prev ? [...prev, file] : [file]));
        }
      }
      return () => URL.revokeObjectURL(objectUrl);
    }
  };

  // const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const file = e.target?.files?.[0];
  //   if (!file) return;

  //   const maxSize = 5 * 1024 * 1024;
  //   if (file.size > maxSize) {
  //     lightyToast.error("파일첨부 사이즈는 5MB 이내로 가능합니다.");
  //     e.target.value = "";
  //     setImages([]);
  //   }
  //   if (filesToUpload.length === maxImages) {
  //     lightyToast.error(`최대 ${maxImages}장까지만 업로드 가능합니다.`);
  //     return;
  //   }
  //   const objectUrl = URL.createObjectURL(file);
  //   setImages((prev) => [...prev, objectUrl]);

  //   if (setFilesToUpload) {
  //     setFilesToUpload((prev) => (prev ? [...prev, file] : [file]));
  //   }

  //   return () => URL.revokeObjectURL(objectUrl);
  // };

  const handleImageDelete = (num: number) => {
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }

    setFilesToUpload((prev) => prev.filter((_, index) => index !== num));
    setImages((prev) => prev.filter((_, index) => index !== num));
  };

  return (
    <div className="relative w-full">
      <Swiper
        slidesPerView={1.59}
        spaceBetween={12}
        grabCursor={true}
        className="custom-swiper w-full h-[250px] "
      >
        {feedInfoToEdit ? null : (
          <SwiperSlide className={styles.slide}>
            <>
              <div className="bg-grayscale-10 w-full h-[250px] rounded-[20px] border-[1px] border-dashed border-grayscale-200" />
              <div className={styles.inputWrapper}>
                <label className="cursor-pointer">
                  <input
                    ref={fileInputRef}
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
            className={clsx(styles.uploadedImageWrapper, idx === 0 && "ml-5")}
            key={`${imageUrl}${idx}`}
          >
            <Image
              src={imageUrl}
              alt={`${idx + 1}번째 이미지`}
              className={clsx(
                styles.uploadedImage,
                feedInfoToEdit ? "opacity-65" : ""
              )}
              width={270}
              height={320}
            />
            {!feedInfoToEdit && (
              <button
                onClick={() => handleImageDelete(idx)}
                className={styles.iconContainer}
              >
                <CloseIcon width="18" height="18" />
              </button>
            )}
          </SwiperSlide>
        ))}
        <SwiperSlide>
          <div className="w-1" />
        </SwiperSlide>
      </Swiper>
    </div>
  );
}

const styles = {
  slide: "ml-[20px] relative h-[250px] !w-[240px] rounded-2xl overflow-hidden",
  inputWrapper: "absolute inset-0 flex items-center justify-center",
  uploadedImageWrapper:
    "relative h-[250px] !w-[240px] rounded-2xl overflow-hidden object-cover",
  uploadedImage: "slide-img object-cover !w-[240px] h-[250px]",
  iconContainer:
    "absolute flex justify-center items-center top-4 right-4 z-999 rounded-full w-6 h-6 bg-grayscale-200 active:bg-grayscale-300 transition-colors duration-75",
};
