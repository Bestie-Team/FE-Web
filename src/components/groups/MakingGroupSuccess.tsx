"use client";
import { useRouter } from "next/navigation";
import Flex from "../shared/Flex";
import Spacing from "../shared/Spacing";
import getHeader from "@/utils/getHeader";
import * as lighty from "lighty-type";
import CheckSpinner from "../shared/Spinner/CheckSpinner";
import NewGroupContainer from "./NewGroupContainer";
import FixedBottomButton from "../shared/Button/FixedBottomButton";

export default function MakingGroupSuccess({
  group,
}: {
  group: lighty.CreateGroupRequest;
}) {
  const router = useRouter();
  const header = getHeader("/groups/new");
  return (
    <div className="flex flex-col bg-base-white h-full">
      {header}
      <Flex direction="column" className="h-screen pt-[106px]" align="center">
        <CheckSpinner />
        <Spacing size={17} />
        <span className="text-T2">그룹 생성 완료!</span>
        <Spacing size={12} />
        <span className="text-B3">앞으로 그룹 별로 약속을 만들 수 있어요</span>
        <Spacing size={48} />
        <NewGroupContainer className="shadow-sm" group={group} />
        <FixedBottomButton
          label={"홈으로 이동하기"}
          onClick={() => router.push("/")}
        />
      </Flex>
    </div>
  );
}
