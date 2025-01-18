import getHeader from "@/utils/getHeader";
import { usePathname } from "next/navigation";
import Flex from "../shared/Flex";
import Spacing from "../shared/Spacing";
import FixedBottomButton from "../shared/buttons/FixedBottomButton";
import VerticalInvitationCard from "../invitation/VerticalInvitationCard";
import * as lighty from "lighty-type";
import { SetterOrUpdater } from "recoil";
import useMakeGathering from "./hooks/useMakeGathering";
import MakingGatheringStatus from "./MakeGatheringStatus";

export default function MakingInvitation({
  gathering,
  setGathering,
}: {
  gathering: lighty.CreateGatheringRequest;
  setGathering: SetterOrUpdater<lighty.CreateGatheringRequest>;
}) {
  const pathname = usePathname();
  const header = getHeader(pathname);
  const {
    mutate: makeGathering,
    isPending,
    isSuccess,
  } = useMakeGathering({
    gathering,
  });

  if (isPending || isSuccess) {
    return <MakingGatheringStatus isSuccess={isSuccess} />;
  }
  return (
    <div className="flex flex-col bg-grayscale-50 h-full">
      {header}
      <Flex direction="column" className="h-screen pt-[50px]" align="center">
        <Spacing size={40} />
        <span className="text-T2">초대장에 이미지를 채워주세요!</span>
        <Spacing size={30} />
        <VerticalInvitationCard
          gathering={gathering}
          setGathering={setGathering}
        />

        <FixedBottomButton
          bgColor="bg-grayscale-50"
          label={"초대장 만들기"}
          onClick={() => {
            console.log(gathering);
            makeGathering();
          }}
        />
      </Flex>
    </div>
  );
}
