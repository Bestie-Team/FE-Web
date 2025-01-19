"use client";
import { usePathname } from "next/navigation";
import Flex from "../shared/Flex";
import Spacing from "../shared/Spacing";
import getHeader from "@/utils/getHeader";
import FixedBottomButton from "../shared/Button/FixedBottomButton";
import Image from "next/image";
import { Dispatch, SetStateAction } from "react";

export default function StepToInvitation({
  setStep,
}: {
  setStep: Dispatch<SetStateAction<number>>;
}) {
  const pathname = usePathname();
  const header = getHeader(pathname);
  return (
    <div className="flex flex-col bg-base-white h-full">
      {header}
      <Flex direction="column" className="h-screen pt-[106px]" align="center">
        <Spacing size={140} />
        <span className="text-T2">이제 초대장을 만들 차례에요!</span>
        <Spacing size={12} />
        <span className="text-B3 text-grayscale-400">
          초대장을 통해 친구들을 약속에 초대해요.
        </span>
        <Spacing size={48} />
        <Image
          src={"/heart_letter.png"}
          alt="invitation_img"
          width={110}
          height={108}
        />
        <FixedBottomButton label={"초대장 만들기"} onClick={() => setStep(4)} />
      </Flex>
    </div>
  );
}
