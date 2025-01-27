"use client";
import GroupContainer from "@/components/groups/GroupContainer";
import useGroup from "@/components/groups/hooks/useGroups";
import Button from "@/components/shared/Button/Button";
import Flex from "@/components/shared/Flex";
import Spacing from "@/components/shared/Spacing";
import getHeader from "@/utils/getHeader";
import clsx from "clsx";
import { usePathname, useRouter } from "next/navigation";
import React, { useCallback, useMemo } from "react";
import FullPageLoader from "@/components/shared/FullPageLoader";
import { useRecoilValue } from "recoil";
import { scrollProgressAtom } from "@/atoms/scroll";
import { Group } from "lighty-type";

const Header = React.memo(
  ({ pathname, shadow }: { pathname: string; shadow: boolean }) => {
    const header = getHeader(pathname);
    return (
      <div
        style={{ zIndex: 12 }}
        className={clsx(styles.headerWrapper, shadow ? "shadow-bottom" : "")}
      >
        {header}
      </div>
    );
  }
);

const GroupList = React.memo(
  ({
    groups,
    onGroupClick,
  }: {
    groups: Group[];
    onGroupClick: (id: string) => void;
  }) => {
    return groups.map((group, idx) => (
      <React.Fragment key={`${group.id}_${idx}`}>
        <Spacing size={16} />
        <GroupContainer
          group={group}
          className="cursor-pointer"
          onClick={() => onGroupClick(group.id)}
        />
      </React.Fragment>
    ));
  }
);

Header.displayName = "Header";
GroupList.displayName = "GroupList";

export default function GroupsPage() {
  const router = useRouter();
  const scrollProgress = useRecoilValue(scrollProgressAtom);
  const pathname = usePathname();
  const { data: groups, isFetching } = useGroup();

  const handleGroupClick = useCallback(
    (groupId: string) => {
      router.push(`/groups/${groupId}`);
    },
    [router]
  );

  const handleAddGroup = useCallback(() => {
    router.push("/groups/new");
  }, [router]);

  const groupCount = useMemo(() => groups?.length || 0, [groups]);

  if (!groups) return null;

  return (
    <div className="bg-grayscale-50">
      <Header pathname={pathname} shadow={scrollProgress > 0.1} />
      {isFetching ? (
        <FullPageLoader />
      ) : (
        <Flex direction="column" className="pt-[68px] p-5 text-T4">
          <Flex align="center">
            <span>전체 그룹</span>
            <Spacing size={4} direction="horizontal" />
            <span className="flex-grow">{groupCount}</span>
            <Spacing size={4} direction="horizontal" />
            <Button className={styles.button} onClick={handleAddGroup}>
              그룹 추가
            </Button>
          </Flex>

          <GroupList groups={groups} onGroupClick={handleGroupClick} />
        </Flex>
      )}
    </div>
  );
}

const styles = {
  headerWrapper:
    "h-12 fixed max-w-[430px] w-full transition-shadow duration-300",
  button:
    "py-2 px-3 bg-base-white text-T6 rounded-[8px] hover:scale-105 transition-transform",
};
