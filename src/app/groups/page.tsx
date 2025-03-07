"use client";
import GroupContainer from "@/components/groups/GroupContainer";
import useGroup from "@/components/groups/hooks/useGroups";
import Button from "@/components/shared/Button/Button";
import Flex from "@/components/shared/Flex";
import Spacing from "@/components/shared/Spacing";
import getHeader from "@/utils/getHeader";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import FullPageLoader from "@/components/shared/FullPageLoader";
import { Group } from "lighty-type";
import useInfiniteScroll from "@/hooks/useInfiniteScroll";
import useUserDetail from "@/components/users/hooks/useUserDetail";
import DotSpinnerSmall from "@/components/shared/Spinner/DotSpinnerSmall";
import ErrorPage from "@/components/shared/ErrorPage";

const Header = React.memo(
  ({ pathname, shadow }: { pathname: string; shadow: boolean }) => {
    const header = useMemo(() => getHeader(pathname), [pathname]);
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

const GroupList = ({
  groups,
  onGroupClick,
}: {
  groups: Group[];
  onGroupClick: (id: string) => void;
}) => {
  return groups.map((group) => (
    <GroupContainer
      key={`${group.id}`}
      group={group}
      className="cursor-pointer"
      onClick={() => onGroupClick(group.id)}
    />
  ));
};

Header.displayName = "Header";

export default function GroupsPage() {
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);
  const { data: detail, isFetching: isFetchingDetail } = useUserDetail();
  const { data: groups, isFetching, loadMore } = useGroup({ limit: 6 });

  const handleGroupClick = useCallback(
    (groupId: string) => {
      router.push(`/groups/${groupId}`);
    },
    [router]
  );

  const handleAddGroup = useCallback(() => {
    router.push("/groups/new");
  }, [router]);

  useEffect(() => {
    if (!isClient) {
      setIsClient(true);
    }
  }, [isClient]);

  useInfiniteScroll({ isFetching, loadMore });

  if (!isClient) {
    return <FullPageLoader />;
  } else if (!groups || !detail) return <ErrorPage />;

  return (
    <div className="min-h-dvh">
      <div className="pt-[68px] min-h-[calc(100dvh-68px)] p-5 text-T4">
        <Flex align="center">
          <span>전체 그룹</span>
          <Spacing size={4} direction="horizontal" />
          <span className="flex-grow">{detail?.groupCount}</span>
          <Spacing size={4} direction="horizontal" />
          <Button className={styles.button} onMouseDown={handleAddGroup}>
            그룹 추가
          </Button>
        </Flex>
        <Spacing size={16} />
        <Flex direction="column" className="gap-4">
          <GroupList groups={groups} onGroupClick={handleGroupClick} />
        </Flex>
        {(isFetching || isFetchingDetail) && <DotSpinnerSmall />}
      </div>
    </div>
  );
}

const styles = {
  headerWrapper:
    "h-12 fixed max-w-[430px] w-full transition-shadow duration-300",
  button:
    "py-2 px-3 bg-base-white text-T6 rounded-lg active:scale-105 transition-transform cursor-pointer",
};
