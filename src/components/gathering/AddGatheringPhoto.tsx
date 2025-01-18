import React, { useEffect, useState } from "react";
import Flex from "../shared/Flex";
import Image from "next/image";
import PhotoIcon from "../shared/icons/PhotoIcon";
import Spacing from "../shared/Spacing";
import { SetterOrUpdater } from "recoil";
import useUploadInvitationImage from "./hooks/useUploadInvitationImage";
import { CreateGatheringRequest } from "@/models/gathering";

export default function AddGatheringPhoto({
  image,
  setImage,
}: {
  image: string | null;
  setImage: SetterOrUpdater<CreateGatheringRequest>;
}) {
  const [gatheringImageFile, setGatheringImageFile] = useState<File>();
  const { mutate: uploadInvitationImage } = useUploadInvitationImage({
    file: gatheringImageFile as File,
    onSuccess: (data: { imageUrl: string; message: string }) => {
      console.log(data.imageUrl);
      setImage((prev) => ({ ...prev, invitationImageUrl: data.imageUrl }));
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target?.files?.[0];

    if (file) {
      setGatheringImageFile(file);
      const reader = new FileReader();
      reader.onload = (event) => {
        const selectedImage = event.target?.result;
        console.log(selectedImage);
        // if (selectedImage && typeof selectedImage === "string") {
        //   setImage((prev) => ({
        //     ...prev,
        //     groupImageUrl: selectedImage,
        //   }));
        // }
      };
      reader.readAsDataURL(file);
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
        className="overflow-hidden w-[300px] h-[210px] bg-grayscale-50 rounded-[14.62px] text-C1 text-grayscale-300"
      >
        {image ? (
          <Image
            src={image}
            alt="upload_image"
            width={300}
            height={210}
            className="object-cover"
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
