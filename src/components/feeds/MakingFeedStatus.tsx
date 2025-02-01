"use client";
import { useRouter } from "next/navigation";
import Flex from "../shared/Flex";
import Spacing from "../shared/Spacing";
import getHeader from "@/utils/getHeader";
import FixedBottomButton from "../shared/Button/FixedBottomButton";
import Image from "next/image";
import CheckSpinner from "../shared/Spinner/CheckSpinner";
import FullPageLoader from "../shared/FullPageLoader";
import { FEED_SUCCESS } from "@/constants/images";

const StatusMessage = () => (
  <>
    <span className="text-T2">
      피드 <span className="text-[#6795FA]">작성 완료!</span>
    </span>
    <Spacing size={12} />
    <span className="text-B3 text-grayscale-400">
      작성 된 피드는 피드탭에서
    </span>
    <Spacing size={2} />
    <span className="text-B3 text-grayscale-400">확인할 수 있어요.</span>
  </>
);

const SuccessImage = () => (
  <div className="p-[13px]">
    <Image
      src={FEED_SUCCESS}
      alt="피드 작성 완료"
      width={110}
      height={105}
      priority
    />
  </div>
);

export default function MakingFeedStatus({
  isPending,
}: {
  isPending: boolean;
}) {
  const router = useRouter();
  const header = getHeader("/record");

  const handleHomeClick = () => {
    router.replace("/");
  };
  return (
    <div className="flex flex-col bg-base-white h-full">
      {header} {isPending === true ? <FullPageLoader /> : <CheckSpinner />}
      <Flex direction="column" className="h-screen pt-[106px]" align="center">
        <Spacing size={140} />
        <Spacing size={20} />
        {!isPending && <StatusMessage />}
        <Spacing size={24} />
        <SuccessImage />
        <FixedBottomButton label={"홈으로 가기"} onClick={handleHomeClick} />
      </Flex>
    </div>
  );
}
