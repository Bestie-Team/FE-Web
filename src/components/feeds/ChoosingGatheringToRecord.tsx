import { useRecoilState } from "recoil";
import Flex from "../shared/Flex";
import LightyLogo from "../shared/Icon/LightyLogo";
import Spacing from "../shared/Spacing";
import { recordGatheringAtom } from "@/atoms/record";
import FixedBottomButton from "../shared/Button/FixedBottomButton";
import BigClickableGatheringSwiper from "./BigClickableGatheringSwiper";
import useGatheringNoFeeds from "../gathering/hooks/useGatheringNoFeed";
import dynamic from "next/dynamic";
const NoGatheringToRecord = dynamic(
  () => import("../gathering/NoGatheringToRecord")
);

export default function ChoosingGatheringToRecord({
  onNext,
}: {
  onNext: (gatheringId: string) => void;
}) {
  const { data: gathering_noFeed } = useGatheringNoFeeds({
    limit: 30,
  });
  const [selectedGatheringId, setSelectedGatheringId] =
    useRecoilState(recordGatheringAtom);
  const handleImageClick = (gatheringId: string) => {
    setSelectedGatheringId(gatheringId);
  };

  return (
    <>
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
      {!gathering_noFeed || gathering_noFeed.length < 1 ? (
        <Flex style={{ paddingLeft: "24px", paddingRight: "24px" }}>
          <NoGatheringToRecord />
        </Flex>
      ) : (
        <>
          <BigClickableGatheringSwiper
            gathering={gathering_noFeed}
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
    </>
  );
}
