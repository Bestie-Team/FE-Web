import React, { useEffect, useState } from "react";
import Flex from "../shared/Flex";
import Image from "next/image";
import PhotoIcon from "../shared/icons/PhotoIcon";
import Spacing from "../shared/Spacing";
import { SetterOrUpdater } from "recoil";
import * as lighty from "lighty-type";
import useUploadGroupCoverImage from "./hooks/useUploadGroupCoverImage";

export default function AddGroupPhoto({
  image,
  setImage,
}: {
  image: string | null;
  setImage: SetterOrUpdater<lighty.CreateGroupRequest>;
}) {
  const [groupImageFile, setGroupImageFile] = useState<File>();
  const { mutate: uploadGroupCover, isPending } = useUploadGroupCoverImage({
    file: groupImageFile as File,
    onSuccess: (data) => {
      setImage((prev) => ({
        ...prev,
        groupImageUrl: data,
      }));
      console.log("making upload success");
    },
  });
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target?.files?.[0];

    if (file) {
      setGroupImageFile(file);
      const reader = new FileReader();
      reader.onload = (event) => {
        const selectedImage = event.target?.result;
        if (selectedImage && typeof selectedImage === "string") {
          setImage((prev) => ({
            ...prev,
            groupImageUrl: selectedImage,
          }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    if (groupImageFile) {
      uploadGroupCover();
    }
  }, [groupImageFile]);

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
        className="overflow-hidden w-[170px] h-[170px] bg-grayscale-50 rounded-[14.62px] text-C1 text-grayscale-300"
      >
        {image ? (
          <Image
            src={image}
            alt="upload_image"
            width={170}
            height={170}
            className="object-cover w-[170px] h-[170px]"
          />
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
