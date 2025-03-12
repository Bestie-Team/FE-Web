import { useRouter } from "next/navigation";
import Flex from "../shared/Flex";
import Spacing from "../shared/Spacing";
import getHeader from "@/utils/getHeader";
import FixedBottomButton from "../shared/Button/FixedBottomButton";
import Image from "next/image";
import CheckSpinner from "../shared/Spinner/CheckSpinner";
import DotSpinnerSmall from "../shared/Spinner/DotSpinnerSmall";
import { useMemo } from "react";
import { HEART_LETTER } from "@/constants/images";
import { useReactNativeWebView } from "../shared/providers/ReactNativeWebViewProvider";

export default function MakingGatheringStatus({
  isPending,
}: {
  isPending: boolean;
}) {
  const header = useMemo(() => getHeader("/gathering/new"), []);
  const router = useRouter();
  const { isReactNativeWebView } = useReactNativeWebView();
  return (
    <Flex direction="column" className="h-dvh bg-base-white" align="center">
      {header}
      <Flex
        className="h-[calc(100dvh-120px)]"
        direction="column"
        justify="center"
        align="center"
      >
        {isPending === true ? (
          <DotSpinnerSmall width={28} height={28} />
        ) : (
          <CheckSpinner />
        )}
        <Spacing size={20} />
        {isPending === true ? (
          <span className="text-T2">초대장 보내는 중</span>
        ) : (
          <span className="text-T2">
            초대장 <span className="text-T2 text-[#6795FA]">발송 완료!</span>
          </span>
        )}
        <Spacing size={12} />
        <span className="text-B3 text-grayscale-400">
          생성된 초대장은 [보낸 초대장] 에서
        </span>
        <Spacing size={2} />
        <span className="text-B3 text-grayscale-400">확인할 수 있어요.</span>
        <Spacing size={24} />
        <div className="p-[13px]">
          <Image
            src={HEART_LETTER}
            alt="invitation_img"
            width={110}
            height={108}
          />
        </div>
      </Flex>
      <FixedBottomButton
        label={"홈으로 가기"}
        onClick={() => {
          router.replace("/feed");
        }}
        className={isReactNativeWebView ? "mb-safe-bottom" : ""}
      />
    </Flex>
  );
}
