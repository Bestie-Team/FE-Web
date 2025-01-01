"use client";
import GroupContainer from "@/components/groups/GroupContainer";
import Button from "@/components/shared/buttons";
import Flex from "@/components/shared/Flex";
import Spacing from "@/components/shared/Spacing";
import { GROUPS } from "@/constants/groups";
import HeaderReturner from "@/utils/headerReturner";
import { useRouter } from "next/navigation";
import React from "react";

export default function GroupsPage() {
  const router = useRouter();
  const myGroups = GROUPS;

  return (
    <div className="h-screen">
      <div>{HeaderReturner()}</div>
      <Flex direction="column" className="p-[20px] text-T4">
        <Flex align="center">
          <span>전체 그룹</span>
          <Spacing size={4} direction="horizontal" />
          <span className="flex-grow">{myGroups.length}</span>
          <Spacing size={4} direction="horizontal" />
          <Button
            className={buttonStyle}
            onClick={() => {
              router.push("/groups/new");
            }}
          >
            그룹 추가
          </Button>
        </Flex>
        {myGroups.map((group, idx) => {
          return (
            <React.Fragment key={`${group}${idx}`}>
              <Spacing size={16} />
              <GroupContainer
                group={group}
                className="cursor-pointer"
                onClick={() => {
                  router.push(`/groups/${group.id}`);
                }}
              />
            </React.Fragment>
          );
        })}
      </Flex>
    </div>
  );
}

const buttonStyle =
  "py-[8px] px-[12px] bg-base-white text-T6 rounded-[8px] hover:scale-105 transition-transform";
