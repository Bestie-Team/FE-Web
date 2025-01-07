"use client";
import { useRecoilState } from "recoil";
import Flex from "../shared/Flex";
import LightyLogo from "../shared/icons/LightyLogo";
import Spacing from "../shared/Spacing";
import FixedBottomButton from "../shared/buttons/FixedBottomButton";
import { GATHERINGS_PASSED } from "@/constants/gathering";
import { cardSelectedGatheringAtom } from "@/atoms/card";
import { GatheringResponse } from "@/models/gathering";
import ClickableGatheringSwiperForDeco from "./ClickableGatheringSwiperForDeco";

export default function ChoosingGatheringToDecorate({
  onNext,
}: {
  onNext: () => void;
}) {
  const [cardSelectedGathering, setCardSelectedGathering] = useRecoilState<
    Partial<GatheringResponse>
  >(cardSelectedGatheringAtom);

  const gatheringsPassed = GATHERINGS_PASSED;

  const handleImageClick = (
    gatheringInfo: {
      id: string;
      name: string;
      description: string;
      invitation_img_url: string;
      date: string;
    } | null
  ) => {
    setCardSelectedGathering(gatheringInfo as Partial<GatheringResponse>);
  };

  return (
    <Flex direction="column" className="bg-base-white h-screen pt-[48px]">
      <Flex direction="column" className="px-[24px]">
        <Spacing size={28} />
        <LightyLogo />
        <Spacing size={16} />
        <span className="text-T2">어떤 피드의</span>
        <Spacing size={7} />
        <span className="text-T2">추억 카드를 꾸밀까요?</span>
        <Spacing size={16} />
        <span className="text-B3 text-grayscale-500">
          직접 작성한 피드만 카드로 꾸밀 수 있어요.
        </span>
      </Flex>
      <Spacing size={40} />
      <ClickableGatheringSwiperForDeco
        gathering={gatheringsPassed}
        onImageClick={handleImageClick}
        selectedGatheringId={cardSelectedGathering?.id || null}
      />
      <FixedBottomButton
        disabled={cardSelectedGathering?.id === ""}
        label={"꾸미기 시작!"}
        onClick={() => {
          onNext();
        }}
      />
    </Flex>
  );
}
