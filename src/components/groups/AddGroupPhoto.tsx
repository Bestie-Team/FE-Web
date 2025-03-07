import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import Flex from "../shared/Flex";
import Image from "next/image";
import PhotoIcon from "../shared/Icon/PhotoIcon";
import Spacing from "../shared/Spacing";
import useUploadGroupCoverImage from "./hooks/useUploadGroupCoverImage";
import { CreateGroupRequest, UpdateGroupRequest } from "@/models/group";
import { SetterOrUpdater } from "recoil";
import { lightyToast } from "@/utils/toast";

export default function AddGroupPhoto({
  image,
  setGroup,
  setNewGroup,
}: {
  image: string | null;
  setGroup?: Dispatch<SetStateAction<UpdateGroupRequest>>;
  setNewGroup?: SetterOrUpdater<CreateGroupRequest>;
}) {
  const [groupImageFile, setGroupImageFile] = useState<File>();

  const { mutate: uploadGroupCover } = useUploadGroupCoverImage({
    file: groupImageFile as File,
    onSuccess: (data) => {
      if (setGroup) {
        setGroup((prev) => ({ ...prev, groupImageUrl: data.url }));
      } else if (setNewGroup) {
        setNewGroup((prev) => ({ ...prev, groupImageUrl: data.url }));
      }
    },
  });

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
        const convertedFile = await convertToWebP(file);
        console.log("converted", convertedFile);
        setGroupImageFile(convertedFile);
        return;
      } else {
        setGroupImageFile(file);
        return;
      }
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
        accept="image/jpeg, image/jpg, image/webp, image/png"
        className="hidden"
        onChange={handleFileChange}
      />
    </label>
  );
}
