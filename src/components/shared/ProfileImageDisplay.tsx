"use client";
import { PlusCircleButtonSmall } from "./Button/BottomSheetOpenButton";
import Image from "next/image";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import usePostProfileImage from "../my/hooks/usePostProfileImage";
import PhotoIcon from "./Icon/PhotoIcon";

export default function ProfileImageDisplay({
  userImage,
  setUserImage,
  small,
}: {
  userImage?: string | null;
  setUserImage: Dispatch<
    SetStateAction<{
      name: string;
      accountId: string;
      profileImageUrl: string;
    }>
  >;
  small?: boolean;
}) {
  const [file, setFile] = useState<File | null>(null);
  const [newImage, setNewImage] = useState<string>(userImage ? userImage : "");
  const { mutate } = usePostProfileImage({
    file,
    onSuccess: async (imageUrl) => {
      setUserImage((prev) => ({ ...prev, profileImageUrl: imageUrl }));
    },
    onError: (error: Error) => console.log(error),
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target?.files?.[0];
    if (!file) return;
    setFile(file);

    const reader = new FileReader();
    reader.onload = (event) => {
      const selectedImage = event.target?.result;
      if (selectedImage && typeof selectedImage === "string") {
        setNewImage(selectedImage);
      }
    };
    reader.readAsDataURL(file);
  };

  useEffect(() => {
    mutate();
  }, [file]);

  return (
    <label
      style={{
        display: "inline-block",
        width: "fit-content",
      }}
      htmlFor="fileInput"
    >
      <div
        style={{
          width: small ? `72px` : "84px",
          height: small ? `72px` : "84px",
          padding: small ? "4px" : "4.67px",
        }}
        className={uploadContainerStyle}
      >
        <div
          style={{
            width: small ? `64px` : "74.67px",
            height: small ? `64px` : "74.67px",
          }}
          className={imageWrapperStyle}
        >
          {userImage ? (
            <Image
              src={newImage}
              alt="upload_image"
              width={small ? 64 : 74.67}
              height={small ? 64 : 74.67}
              className="object-cover"
            />
          ) : (
            <PhotoIcon />
          )}
        </div>
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
      </div>
    </label>
  );
}

const imageWrapperStyle =
  "flex justify-center items-center rounded-full bg-grayscale-50 overflow-hidden";

const uploadContainerStyle = "relative flex cursor-pointer";
