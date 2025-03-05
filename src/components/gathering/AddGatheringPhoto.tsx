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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target?.files?.[0];

    if (file) {
      setGatheringImageFile(file);
      const reader = new FileReader();
      reader.onload = (event) => {
        const selectedImage = event.target?.result;
        console.log(selectedImage);
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
              onLoadingComplete={() => setIsLoaded(true)}
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
