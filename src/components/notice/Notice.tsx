"use client";
import { useRouter } from "next/navigation";
import Flex from "../shared/Flex";
import ArrowLeftIcon from "../shared/Icon/ArrowLeftIcon";
import NoticeContainer from "./NoticeContainer";

export default function Notice() {
  const router = useRouter();
  return (
    <Flex direction="column" className="h-screen bg-grayscale-50">
      <Flex align="center" className="fixed h-12 gap-[6px]">
        <div
          className={arrowIconContainerStyle}
          onClick={() => {
            router.back();
          }}
        >
          <ArrowLeftIcon />
        </div>
        <span className="text-T3">알림</span>
      </Flex>
      <NoticeContainer />
    </Flex>
  );
}
const arrowIconContainerStyle =
  "w-10 h-10 py-[10px] pl-[17px] pr-[3px] cursor-pointer";
