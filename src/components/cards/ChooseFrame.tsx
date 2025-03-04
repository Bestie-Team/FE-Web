"use client";
import { cardFrameAtom } from "@/atoms/card";
import SelectFrameSwiper from "@/components/cards/SelectFrameSwiper";
import Flex from "@/components/shared/Flex";
import Spacing from "@/components/shared/Spacing";
import { useRecoilValue } from "recoil";
import FixedBottomButton from "../shared/Button/FixedBottomButton";

export default function ChooseFrame({ onNext }: { onNext: () => void }) {
  const selectedFrame = useRecoilValue(cardFrameAtom);

  return (
    <Flex className="bg-grayscale-50 h-screen" direction="column">
      <Spacing size={88} />
      <Flex className="px-6 gap-4" direction="column">
        <span className="text-T2">프레임을 선택해 주세요</span>
        <span className="text-B3">나만의 특별한 카드를 만들어봐요</span>
      </Flex>
      <Spacing size={40} />
      <SelectFrameSwiper />
      <FixedBottomButton
        bgColor="bg-grayscale-50"
        disabled={selectedFrame == null}
        label={"스티커로 꾸미기"}
        onClick={() => {
          onNext();
        }}
      />
    </Flex>
  );
}
