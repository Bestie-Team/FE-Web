import React from "react";
import Image from "next/image";
import ArrowLeftIcon from "../shared/icons/ArrowLeftIcon";
import Flex from "../shared/Flex";
import Spacing from "../shared/Spacing";
import Options from "../shared/icons/Options";
import { useRouter } from "next/navigation";

export default function GroupBannerContainer() {
  const router = useRouter();
  return (
    <div className="relative">
      <Image
        alt="homeImage"
        src="https://d1al3w8x2wydb3.cloudfront.net/images/gathering.png"
        width={600}
        height={316}
        className="h-[316px] object-cover"
      />
      <div className="absolute inset-0 bg-transparent-black-50" />
      <Flex align="center" className={headerWrapperStyle}>
        <div
          className="cursor-pointer"
          onClick={() => {
            router.back();
          }}
        >
          <ArrowLeftIcon color="white" />
        </div>
        <Spacing size={6} direction="horizontal" />
        <span className="flex-grow text-T3 text-base-white">그룹 상세</span>
        <Spacing size={6} direction="horizontal" />
        <Options type="group" color="white" />
      </Flex>
    </div>
  );
}

const headerWrapperStyle =
  "w-full before:h-[48px] absolute left-0 top-0 pl-[17px] pr-[20px] items-center";
