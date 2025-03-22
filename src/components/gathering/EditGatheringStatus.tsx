import Flex from "../shared/Flex";
import Spacing from "../shared/Spacing";
import Image from "next/image";
import CheckSpinner from "../shared/Spinner/CheckSpinner";
import { HEART_LETTER } from "@/constants/images";
import DotSpinner from "../shared/Spinner/DotSpinner";
import HeaderWithBtn from "../shared/Header/HeaderWithBtn";
import cloudFrontLoader from "@/utils/cloudfrontLoader";

export default function EditGatheringStatus({
  isPending,
  setStep,
}: {
  isPending: boolean;
  setStep: (step: number) => void;
}) {
  return (
    <Flex
      direction="column"
      justify="center"
      className="bg-base-white min-h-dvh pt-safe-top"
    >
      <HeaderWithBtn
        headerLabel="약속 수정"
        onClickBackBtn={() => isPending && setStep(1)}
      />
      <Flex direction="column" align="center">
        <Spacing size={140} />
        {isPending === true ? <DotSpinner /> : <CheckSpinner />}
        <Spacing size={20} />
        {isPending === true ? (
          <span className="text-T2">모임을 수정하는 중</span>
        ) : (
          <span className="text-T2">
            약속 <span className="text-[#6795FA]">수정 완료!</span>
          </span>
        )}
        <Spacing size={24} />
        <div className="p-[13px]">
          <Image
            src={HEART_LETTER}
            loader={cloudFrontLoader}
            alt="invitation_img"
            width={110}
            height={108}
          />
        </div>
      </Flex>
    </Flex>
  );
}
