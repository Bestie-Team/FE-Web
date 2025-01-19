"use client";
import { useRecoilState } from "recoil";
import Flex from "../shared/Flex";
import LightyLogo from "../shared/Icon/LightyLogo";
import Spacing from "../shared/Spacing";
import FixedBottomButton from "../shared/Button/FixedBottomButton";
import { cardSelectedGatheringAtom } from "@/atoms/card";
import { GatheringResponse } from "@/models/gathering";
import ClickableGatheringSwiperForDeco from "./ClickableGatheringSwiperForDeco";
import useFeedMine from "../feeds/hooks/useFeedMine";

export default function ChoosingGatheringToDecorate({
  onNext,
}: {
  onNext: () => void;
}) {
  const [cardSelectedGathering, setCardSelectedGathering] = useRecoilState<
    Partial<GatheringResponse>
  >(cardSelectedGatheringAtom);

  const minDate = new Date("2025-01-01").toISOString();
  const maxDate = new Date("2025-12-31").toISOString();

  const { data } = useFeedMine({ order: "DESC", minDate, maxDate, limit: 20 });

  const handleImageClick = (
    gatheringInfo: {
      id: string;
      name: string;
      description: string;
      invitationImageUrl: string;
      date: string;
    } | null
  ) => {
    setCardSelectedGathering(gatheringInfo as Partial<GatheringResponse>);
  };

  const feeds = data?.feeds;
  if (!feeds) {
    return <div>작성할 수 있는 피드가 없네여~</div>;
  }
  return (
    <Flex direction="column" className="bg-base-white h-screen pt-[48px]">
      <Flex direction="column" className="px-[24px]">
        <Spacing size={28} />
        <LightyLogo />
        <Spacing size={16} />
        <span className="text-T2">어떤 피드의</span>
        <Spacing size={7} />
        <span className="text-T2">포토 카드를 꾸밀까요?</span>
        <Spacing size={16} />
        <span className="text-B3 text-grayscale-500">
          직접 작성한 피드만 카드로 꾸밀 수 있어요.
        </span>
      </Flex>
      <Spacing size={40} />
      <ClickableGatheringSwiperForDeco
        gathering={feeds}
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
