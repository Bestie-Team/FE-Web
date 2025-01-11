"use client";
import GroupContainer from "@/components/groups/GroupContainer";
import Button from "@/components/shared/buttons/Button";
import Flex from "@/components/shared/Flex";
import Spacing from "@/components/shared/Spacing";
import { GROUPS } from "@/constants/groups";
import useScrollShadow from "@/hooks/useScrollShadow";
import getHeader from "@/utils/getHeader";
import clsx from "clsx";
import { usePathname, useRouter } from "next/navigation";
import React, { useRef } from "react";

export default function GroupsPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const hasShadow = useScrollShadow(containerRef);
  const router = useRouter();
  const myGroups = GROUPS;
  const pathname = usePathname();
  const header = getHeader(pathname);

  return (
    <div
      className="h-screen overflow-y-scroll no-scrollbar bg-grayscale-50"
      ref={containerRef}
    >
      <div
        className={clsx(styles.headerWrapper, hasShadow ? "shadow-bottom" : "")}
      >
        {header}
      </div>
      <Flex direction="column" className="pt-[68px] p-[20px] text-T4">
        <Flex align="center">
          <span>전체 그룹</span>
          <Spacing size={4} direction="horizontal" />
          <span className="flex-grow">{myGroups.length}</span>
          <Spacing size={4} direction="horizontal" />
          <Button
            className={styles.button}
            onClick={() => {
              router.push("/groups/new");
            }}
          >
            그룹 추가
          </Button>
        </Flex>
        {myGroups.map((group, idx) => {
          return (
            <React.Fragment key={`${group.id}_${idx}`}>
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

const styles = {
  headerWrapper:
    "h-[48px] fixed max-w-[430px] w-full transition-shadow duration-300",
  button:
    "py-[8px] px-[12px] bg-base-white text-T6 rounded-[8px] hover:scale-105 transition-transform",
};
