import getHeader from "@/utils/getHeader";
import Flex from "../shared/Flex";
import Spacing from "../shared/Spacing";
import FixedBottomButton from "../shared/Button/FixedBottomButton";
import * as lighty from "lighty-type";
import { SetterOrUpdater, useResetRecoilState } from "recoil";
import useMakeGathering from "./hooks/useMakeGathering";
import MakingGatheringStatus from "./MakeGatheringStatus";
import UploadableVerticalInvitationCard from "../invitation/VerticalInvitationCard";
import { useAuth } from "../shared/providers/AuthProvider";
import { newGatheringInfo } from "@/atoms/gathering";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import FullPageLoader from "../shared/FullPageLoader";

export default function MakingInvitation({
  gathering,
  setGathering,
}: {
  gathering: lighty.CreateGatheringRequest;
  setGathering: SetterOrUpdater<lighty.CreateGatheringRequest>;
}) {
  const reset = useResetRecoilState(newGatheringInfo);
  const { userInfo } = useAuth();
  const header = getHeader("/gathering/new");
  const router = useRouter();
  const {
    mutate: makeGathering,
    isPending,
    isSuccess,
  } = useMakeGathering({
    gathering,
    onSuccess: (data: { message: string }) => {
      router.replace("/");
      reset();
      toast.success(data.message);
    },
  });

  if (isPending || isSuccess) {
    return <MakingGatheringStatus isSuccess={isSuccess} />;
  }
  return (
    <div className="flex flex-col bg-grayscale-50 h-full">
      {header}
      <Flex direction="column" className="h-screen pt-[50px]" align="center">
        {isPending ? <FullPageLoader /> : null}
        <Spacing size={40} />
        <span className="text-T2">초대장에 이미지를 채워주세요!</span>
        <Spacing size={30} />
        <UploadableVerticalInvitationCard
          userId={userInfo?.accountId}
          gathering={gathering}
          setGathering={setGathering}
        />
        <FixedBottomButton
          bgColor="bg-grayscale-50"
          label={"초대장 만들기"}
          onClick={() => {
            makeGathering();
          }}
        />
      </Flex>
    </div>
  );
}
