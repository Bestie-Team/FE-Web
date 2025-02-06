"use client";
import { useRecoilState } from "recoil";
import Flex from "../shared/Flex";
import LightyLogo from "../shared/Icon/LightyLogo";
import Spacing from "../shared/Spacing";
import { recordGatheringAtom } from "@/atoms/record";
import FixedBottomButton from "../shared/Button/FixedBottomButton";
import BigClickableGatheringSwiper from "./BigClickableGatheringSwiper";
import { Gathering } from "@/models/gathering";
import getHeader from "@/utils/getHeader";
import { NoGatheringToRecord } from "../gathering/NoGathering";

export default function ChoosingGatheringToRecord({
  gathering,
  onNext,
}: {
  gathering?: Gathering[];
  onNext: (gatheringId: string) => void;
}) {
  const header = getHeader("/record");

  const [selectedGatheringId, setSelectedGatheringId] =
    useRecoilState(recordGatheringAtom);

  const handleImageClick = (gatheringId: string | null) => {
    setSelectedGatheringId(gatheringId);
  };

  return (
    <div className="bg-base-white pt-[48px] h-dvh">
      {header}
      <Flex
        direction="column"
        style={{ paddingLeft: "24px", paddingRight: "24px" }}
      >
        <Spacing size={28} />
        <LightyLogo />
        <Spacing size={16} />
        <span className="text-T2">어떤 약속의</span>
        <Spacing size={7} />
        <span className="text-T2">추억을 기록할까요?</span>
        <Spacing size={16} />
        <span className="text-B3 text-grayscale-500">
          작성한 기록은 약속에 참여한 이들만 볼 수 있어요
        </span>
      </Flex>
      <Spacing size={40} />
      {!gathering || gathering.length < 1 ? (
        <NoGatheringToRecord />
      ) : (
        <>
          <BigClickableGatheringSwiper
            gathering={gathering}
            onImageClick={handleImageClick}
            selectedGatheringId={selectedGatheringId}
          />
          <FixedBottomButton
            bgColor="#f4f4f4"
            disabled={selectedGatheringId === null}
            label={"기록 시작하기"}
            onClick={() => {
              onNext("1");
            }}
          />
        </>
      )}
    </div>
  );
}
