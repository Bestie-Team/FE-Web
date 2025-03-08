"use client";
import { PlusCircleButtonSmall } from "./Button/BottomSheetOpenButton";
import Image from "next/image";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import usePostProfileImage from "../my/hooks/usePostProfileImage";
import PhotoIcon from "./Icon/PhotoIcon";
import Flex from "./Flex";
import clsx from "clsx";
import { lightyToast } from "@/utils/toast";
import { compressImage } from "@/utils/compress";

export default function ProfileImageDisplay({
  userImage,
  setUserImage,
  small,
}: {
  userImage?: string | null;
  setUserImage: Dispatch<
    SetStateAction<{
      accountId: string;
      profileImageUrl: string;
    }>
  >;
  small?: boolean;
}) {
  const [newImage, setNewImage] = useState<string>(userImage ? userImage : "");
  const { mutate } = usePostProfileImage({
    onSuccess: async (imageUrl) => {
      console.log("프로필 사진 업로드 성공", imageUrl);
      setUserImage((prev) => ({ ...prev, profileImageUrl: imageUrl }));
    },
  });

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputFile = e.target?.files?.[0];
    if (!inputFile) return;
    const getFileExt = (fileName: string) => {
      const ext = fileName.split(".").pop()?.toLowerCase();
      if (ext === "jpg" || ext === "png" || ext === "jpeg" || ext === "webp") {
        return ext;
      }
      return null;
    };

    if (inputFile) {
      const ext = getFileExt(inputFile.name);
      if (!ext) {
        lightyToast.error(
          "지원되지 않는 파일 형식입니다. (jpg, png, jpeg, webp 형식만 가능)"
        );
        return null;
      }
      let imageUrl: string | null = null;

      try {
        if (ext) {
          const convertedFile = await compressImage(inputFile);
          if (!convertedFile) return;
          imageUrl = URL.createObjectURL(convertedFile);
        } else {
          imageUrl = URL.createObjectURL(inputFile);
        }

        setNewImage(imageUrl);

        mutate({ file: inputFile });
      } catch (error) {
        console.error("Error processing file:", error);
        lightyToast.error("파일 처리 중 오류가 발생했습니다.");
      }
    }
  };

  useEffect(() => {
    return () => {
      if (newImage) {
        URL.revokeObjectURL(newImage);
      }
    };
  }, [newImage]);

  return (
    <label
      style={{
        display: "inline-block",
        width: "fit-content",
      }}
      htmlFor="fileInput"
    >
      <Flex
        style={{
          width: small ? `72px` : "84px",
          height: small ? `72px` : "84px",
          padding: small ? "4px" : "4.67px",
        }}
        className={uploadContainerStyle}
      >
        <Flex
          justify="center"
          align="center"
          style={{
            width: small ? `64px` : "74.67px",
            height: small ? `64px` : "74.67px",
          }}
          className={imageWrapperStyle}
        >
          {newImage ? (
            <Image
              priority
              src={newImage}
              alt="upload_image"
              width={small ? 64 : 74.67}
              height={small ? 64 : 74.67}
              style={{
                width: small ? 64 : 74.67,
                height: small ? 64 : 74.67,
              }}
              className={clsx(
                "object-cover",
                small ? "w-8 h-8" : "w-[74.7px] h-[74.7px]"
              )}
            />
          ) : (
            <PhotoIcon />
          )}
        </Flex>
        <PlusCircleButtonSmall
          style={{
            bottom: small ? `2px` : "4.33px",
            right: small ? `2px` : "4.33px",
          }}
          className="absolute bottom-[4.33px] right-[4.33px]"
        />
        <input
          className="hidden"
          id="fileInput"
          type="file"
          accept="image/jpeg, image/jpg, image/bmp, image/webp, image/png"
          name="imageUrl"
          onChange={handleFileChange}
        />
      </Flex>
    </label>
  );
}

const imageWrapperStyle = "rounded-full bg-grayscale-50 overflow-hidden";

const uploadContainerStyle = "relative cursor-pointer";
