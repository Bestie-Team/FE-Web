import React, { useEffect, useState } from "react";
import Flex from "../shared/Flex";
import Image from "next/image";
import PhotoIcon from "../shared/Icon/PhotoIcon";
import Spacing from "../shared/Spacing";
import { SetterOrUpdater } from "recoil";
import useUploadInvitationImage from "./hooks/useUploadInvitationImage";
import * as lighty from "lighty-type";
import { lightyToast } from "@/utils/toast";
import DotSpinner from "../shared/Spinner/DotSpinner";
import { compressImage } from "@/utils/compress";

export default function AddGatheringPhoto({
  image,
  setImage,
}: {
  image: string | null;
  setImage: SetterOrUpdater<lighty.CreateGatheringRequest>;
}) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [gatheringImageFile, setGatheringImageFile] = useState<File>();
  const { mutate: uploadInvitationImage } = useUploadInvitationImage({
    file: gatheringImageFile as File,
    onSuccess: (data: { imageUrl: string; message: string }) => {
      console.log(data.imageUrl);
      setImage((prev) => ({ ...prev, invitationImageUrl: data.imageUrl }));
    },
    onError: (error: Error) => lightyToast.error(error.message),
  });

  // const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const file = e.target?.files?.[0];

  //   if (file) {
  //     setGatheringImageFile(file);
  //     const reader = new FileReader();
  //     reader.onload = (event) => {
  //       const selectedImage = event.target?.result;
  //       console.log(selectedImage);
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // };

  // const convertToWebP = (file: File): Promise<File> => {
  //   return new Promise((resolve, reject) => {
  //     const reader = new FileReader();
  //     reader.readAsDataURL(file);
  //     reader.onload = (event) => {
  //       const img = new window.Image();
  //       img.src = event.target?.result as string;
  //       img.onload = () => {
  //         const canvas = document.createElement("canvas");
  //         canvas.width = img.width;
  //         canvas.height = img.height;
  //         const ctx = canvas.getContext("2d");

  //         if (!ctx) {
  //           console.error("Canvas context가 존재하지 않음");
  //           reject(new Error("Canvas context not found"));
  //           return;
  //         }

  //         ctx.drawImage(img, 0, 0);
  //         canvas.toBlob(
  //           (blob) => {
  //             if (!blob) {
  //               console.error("WebP 변환 실패");
  //               reject(new Error("WebP 변환 실패"));
  //               return;
  //             }
  //             const webpFile = new File(
  //               [blob],
  //               file.name.replace(/\.\w+$/, ".webp"),
  //               {
  //                 type: "image/webp",
  //               }
  //             );
  //             resolve(webpFile);
  //           },
  //           "image/webp",
  //           0.8
  //         );
  //       };
  //       img.onerror = (error) => {
  //         console.error("이미지 로드 실패", error);
  //         reject(error);
  //       };
  //     };
  //     reader.onerror = (error) => {
  //       console.error("FileReader 실패", error);
  //       reject(error);
  //     };
  //   });
  // };
  const getFileExt = (fileName: string) => {
    const ext = fileName.split(".").pop()?.toLowerCase();
    if (ext === "jpg" || ext === "png" || ext === "jpeg" || ext === "webp") {
      return ext;
    }
    return null;
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target?.files?.[0];

    if (file) {
      const ext = getFileExt(file.name);
      if (!ext) {
        lightyToast.error(
          "지원되지 않는 파일 형식입니다. (jpg, png, jpeg, webp 형식만 가능)"
        );
        return null;
      }

      if (ext === "png" || ext === "jpg" || ext === "jpeg") {
        const convertedFile = await compressImage(file);
        console.log("converted", convertedFile);
        setGatheringImageFile(convertedFile);
        return;
      } else {
        setGatheringImageFile(file);
        return;
      }
    }
  };

  useEffect(() => {
    if (gatheringImageFile) {
      uploadInvitationImage();
    }
  }, [gatheringImageFile]);

  return (
    <label
      style={{
        display: "inline-block",
        width: "fit-content",
        cursor: "pointer",
      }}
      htmlFor="fileInput"
    >
      <Flex
        justify="center"
        align="center"
        direction="column"
        className="relative overflow-hidden w-[300px] h-[210px] bg-grayscale-50 rounded-[14.62px] text-C1 text-grayscale-300"
      >
        {image ? (
          <>
            {isLoaded === false ? <DotSpinner /> : null}
            <Image
              src={image}
              alt="upload_image"
              width={300}
              height={210}
              className="!h-[210px] w-[300px] object-cover"
              onLoad={() => setIsLoaded(true)}
            />
          </>
        ) : (
          <>
            <PhotoIcon />
            <Spacing size={8} />
            <span>그룹 이미지 등록</span>
          </>
        )}
      </Flex>
      <input
        id="fileInput"
        type="file"
        accept="image/jpeg, image/jpg, image/bmp, image/webp, image/png"
        className="hidden"
        onChange={handleFileChange}
      />
    </label>
  );
}
