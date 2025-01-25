"use client";
import GroupContainer from "@/components/groups/GroupContainer";
import useGroup from "@/components/groups/hooks/useGroups";
import Button from "@/components/shared/Button/Button";
import Flex from "@/components/shared/Flex";
import Spacing from "@/components/shared/Spacing";
import useScrollShadow from "@/hooks/useScrollShadow";
import getHeader from "@/utils/getHeader";
import clsx from "clsx";
import { usePathname, useRouter } from "next/navigation";
import React, { useCallback, useRef } from "react";
import FullPageLoader from "@/components/shared/FullPageLoader";

export default function GroupsPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const hasShadow = useScrollShadow(containerRef);
  const router = useRouter();
  const pathname = usePathname();
  const header = getHeader(pathname);
  const MemoizedGroupContainer = React.memo(GroupContainer);
  const { data: groups, isFetching } = useGroup();

  const handleGroupClick = useCallback(
    (groupId: string) => {
      router.push(`/groups/${groupId}`);
    },
    [router]
  );

  if (!groups) return;

  return (
    <div
      className="h-screen overflow-y-scroll no-scrollbar bg-grayscale-50"
      ref={containerRef}
    >
      <div
        style={{
          zIndex: 5,
        }}
        className={clsx(styles.headerWrapper, hasShadow ? "shadow-bottom" : "")}
      >
        {header}
      </div>
      {isFetching ? (
        <FullPageLoader />
      ) : (
        <Flex direction="column" className="pt-[68px] p-[20px] text-T4">
          <Flex align="center">
            <span>전체 그룹</span>
            <Spacing size={4} direction="horizontal" />
            <span className="flex-grow">{groups?.length}</span>
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
          {groups.map((group, idx) => {
            return (
              <React.Fragment key={`${group.id}_${idx}`}>
                <Spacing size={16} />
                <MemoizedGroupContainer
                  group={group}
                  className="cursor-pointer"
                  onClick={() => handleGroupClick(group.id)}
                />
              </React.Fragment>
            );
          })}
        </Flex>
      )}
    </div>
  );
}

const styles = {
  headerWrapper:
    "h-[48px] fixed max-w-[430px] w-full transition-shadow duration-300",
  button:
    "py-[8px] px-[12px] bg-base-white text-T6 rounded-[8px] hover:scale-105 transition-transform",
};
