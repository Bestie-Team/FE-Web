"use client";
import GroupContainer from "@/components/groups/GroupContainer";
import Button from "@/components/shared/buttons";
import Flex from "@/components/shared/Flex";
import Spacing from "@/components/shared/Spacing";
import HeaderReturner from "@/utils/headerReturner";

export default function GroupsPage() {
  return (
    <div className="h-screen">
      <div>{HeaderReturner()}</div>
      <Flex direction="column" className="p-[20px] text-T4">
        <Flex align="center">
          <span>전체 그룹</span>
          <Spacing size={4} direction="horizontal" />
          <span className="flex-grow">{4}</span>
          <Spacing size={4} direction="horizontal" />
          <Button className={buttonStyle}>그룹 추가</Button>
        </Flex>
        {
          <>
            <Spacing size={16} />
            <GroupContainer />
            <Spacing size={16} />
            <GroupContainer />
            <Spacing size={16} />
            <GroupContainer />
          </>
        }
      </Flex>
    </div>
  );
}

const buttonStyle = "py-[8px] px-[12px] bg-base-white text-T6 rounded-[8px]";
