import getHeader from "@/utils/getHeader";
import Flex from "../shared/Flex";
import Spacing from "../shared/Spacing";
import FixedBottomButton from "../shared/Button/FixedBottomButton";
import * as lighty from "lighty-type";
import { SetterOrUpdater } from "recoil";
import UploadableVerticalInvitationCard from "../invitation/VerticalInvitationCard";
import { useAuth } from "../shared/providers/AuthProvider";
import { useMemo } from "react";
import { lightyToast } from "@/utils/toast";
import clsx from "clsx";
import { useReactNativeWebView } from "../shared/providers/ReactNativeWebViewProvider";

export default function MakingInvitation({
  gathering,
  setGathering,
  makeGathering,
}: {
  gathering: lighty.CreateGatheringRequest;
  setGathering: SetterOrUpdater<lighty.CreateGatheringRequest>;
  makeGathering: () => void;
}) {
  const { userInfo } = useAuth();
  const header = useMemo(() => getHeader("/gathering/new"), []);
  const { isReactNativeWebView } = useReactNativeWebView();
  const handleMakeGathering = () => {
    if (gathering.invitationImageUrl !== "") {
      makeGathering();
    }
    if (gathering.invitationImageUrl == "") {
      lightyToast.error("이미지가 업로드되지 않았어요.");
    }
  };
  return (
    <Flex direction="column" className="bg-grayscale-50 h-full">
      {header}
      <Flex
        direction="column"
        className={clsx(
          "min-h-[calc(100dvh+20px)]",
          isReactNativeWebView ? "pt-safe-top" : ""
        )}
        align="center"
      >
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
          label={"초대장 보내기"}
          onClick={handleMakeGathering}
          className={isReactNativeWebView ? "mb-safe-bottom" : ""}
        />
      </Flex>
    </Flex>
  );
}
