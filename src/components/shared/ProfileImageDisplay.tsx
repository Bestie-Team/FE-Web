"use client";
import { PlusCircleButtonSmall } from "./Button/BottomSheetOpenButton";
import Image from "next/image";
import { Dispatch, SetStateAction, useState } from "react";
import usePostProfileImage from "../my/hooks/usePostProfileImage";
import PhotoIcon from "./Icon/PhotoIcon";
import { lightyToast } from "@/utils/toast";
import Flex from "./Flex";

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
    onError: (error: Error) => console.log(error),
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputFile = e.target?.files?.[0];
    if (!inputFile) return;

    const imageUrl = URL.createObjectURL(inputFile);

    setNewImage(imageUrl);

    const maxSize = 5 * 1024 * 1024;
    if (inputFile.size > maxSize) {
      lightyToast.error("파일첨부 사이즈는 5MB 이내로 가능합니다.");
      e.target.value = "";
      return;
    }

    mutate({ file: inputFile });
  };

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
              layout="fixed"
              alt="upload_image"
              width={small ? 64 : 74.67}
              height={small ? 64 : 74.67}
              style={{
                width: small ? 64 : 74.67,
                height: small ? 64 : 74.67,
              }}
              className="object-cover w-8 h-8"
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
