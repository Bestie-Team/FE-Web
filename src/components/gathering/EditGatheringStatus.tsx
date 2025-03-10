import Flex from "../shared/Flex";
import Spacing from "../shared/Spacing";
import getHeader from "@/utils/getHeader";
import Image from "next/image";
import CheckSpinner from "../shared/Spinner/CheckSpinner";
import { HEART_LETTER } from "@/constants/images";
import DotSpinner from "../shared/Spinner/DotSpinner";
import { useMemo } from "react";

export default function EditGatheringStatus({
  isPending,
}: {
  isPending: boolean;
}) {
  const header = useMemo(() => getHeader("/gathering/*/edit"), []);

  return (
    <Flex
      direction="column"
      justify="center"
      className="bg-base-white min-h-dvh"
    >
      {header}
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
            alt="invitation_img"
            width={110}
            height={108}
          />
        </div>
      </Flex>
    </Flex>
  );
}
