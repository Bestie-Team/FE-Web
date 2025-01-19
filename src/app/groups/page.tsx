"use client";
import GroupContainer from "@/components/groups/GroupContainer";
import useGroup from "@/components/groups/hooks/useGroups";
import Button from "@/components/shared/Button/Button";
import Flex from "@/components/shared/Flex";
import * as lighty from "lighty-type";
import Spacing from "@/components/shared/Spacing";
import useScrollShadow from "@/hooks/useScrollShadow";
import getHeader from "@/utils/getHeader";
import clsx from "clsx";
import { usePathname, useRouter } from "next/navigation";
import React, { useCallback, useEffect, useRef, useState } from "react";

export default function GroupsPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const hasShadow = useScrollShadow(containerRef);
  const router = useRouter();
  const pathname = usePathname();
  const header = getHeader(pathname);
  const MemoizedGroupContainer = React.memo(GroupContainer);
  const dateCursor = new Date().toISOString();
  const [groupCursor, setGroupCursor] = useState<string | null>(dateCursor);
  const [groups, setGroups] = useState<lighty.Group[]>([]);
  const { data: group_data } = useGroup({ cursor: groupCursor, limit: 50 });

  useEffect(() => {
    if (group_data) {
      console.log(group_data);
    }
    if (!group_data?.groups) return;
    setGroups((prevGroups) => [
      ...prevGroups,
      ...group_data.groups.filter(
        (newGroup) => !prevGroups.some((group) => group.id === newGroup.id)
      ),
    ]);
    if (group_data.nextCursor != null) {
      setGroupCursor(group_data?.nextCursor);
    }
  }, [group_data?.groups]);

  const handleGroupClick = useCallback(
    (groupId: string) => {
      router.push(`/groups/${groupId}`);
    },
    [router]
  );

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
      {groups != null ? (
        <Flex direction="column" className="pt-[68px] p-[20px] text-T4">
          <Flex align="center">
            <span>전체 그룹</span>
            <Spacing size={4} direction="horizontal" />
            <span className="flex-grow">{groups.length}</span>
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
      ) : null}
    </div>
  );
}

const styles = {
  headerWrapper:
    "h-[48px] fixed max-w-[430px] w-full transition-shadow duration-300",
  button:
    "py-[8px] px-[12px] bg-base-white text-T6 rounded-[8px] hover:scale-105 transition-transform",
};
