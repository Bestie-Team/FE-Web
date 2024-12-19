import React, { useState } from "react";
import Flex from "../shared/Flex";
import Image from "next/image";
import PhotoIcon from "../shared/icons/PhotoIcon";
import Spacing from "../shared/Spacing";

export default function AddGroupPhoto() {
  const [image, setImage] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target?.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setImage(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

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
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
      />
    </label>
  );
}
