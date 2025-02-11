"use client";
import Flex from "../shared/Flex";
import Spacing from "../shared/Spacing";
import getHeader from "@/utils/getHeader";
import FixedBottomButton from "../shared/Button/FixedBottomButton";
import Image from "next/image";
import { Dispatch, SetStateAction, useMemo } from "react";
import { HEART_LETTER } from "@/constants/images";

export default function StepToInvitation({
  setStep,
}: {
  setStep: Dispatch<SetStateAction<number>>;
}) {
  const header = useMemo(() => getHeader("/gathering/new"), []);
  return (
    <Flex direction="column" className="h-dvh bg-base-white">
      {header}
      <Flex direction="column" className="h-dvh pt-[106px]" align="center">
        <Spacing size={140} />
        <span className="text-T2">이제 초대장을 만들 차례에요!</span>
        <Spacing size={12} />
        <span className="text-B3 text-grayscale-400">
          초대장을 통해 친구들을 약속에 초대해요.
        </span>
        <Spacing size={48} />
        <Image
          priority
          src={HEART_LETTER}
          alt="invitation_img"
          width={110}
          height={108}
          className="w-[110px] h-[108px]"
        />
        <FixedBottomButton label={"초대장 만들기"} onClick={() => setStep(4)} />
      </Flex>
    </Flex>
  );
}
