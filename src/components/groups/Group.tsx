"use client";
import GroupContainer from "@/components/groups/GroupContainer";
import useGroup from "@/components/groups/hooks/useGroups";
import Button from "@/components/shared/Button/Button";
import Flex from "@/components/shared/Flex";
import Spacing from "@/components/shared/Spacing";
import { useRouter } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";
import { Group } from "lighty-type";
import useInfiniteScroll from "@/hooks/useInfiniteScroll";
import useUserDetail from "@/components/users/hooks/useUserDetail";
import DotSpinnerSmall from "@/components/shared/Spinner/DotSpinnerSmall";
import DotSpinner from "../shared/Spinner/DotSpinner";
import { useSetRecoilState } from "recoil";
import { selectedGroupDetailAtom } from "@/atoms/group";

const GroupList = ({
  groups,
  onGroupClick,
}: {
  groups: Group[];
  onGroupClick: ({ groupId, group }: { groupId: string; group: Group }) => void;
}) => {
  return groups.map((group) => (
    <GroupContainer
      key={`${group.id}`}
      group={group}
      className="cursor-pointer"
      onClick={() => onGroupClick({ groupId: group.id, group })}
    />
  ));
};

export default function Groups() {
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);
  const { data: detail, isFetching: isFetchingDetail } = useUserDetail();
  const { data: groups, isFetching, loadMore } = useGroup({ limit: 6 });
  const setSelectedGroup = useSetRecoilState(selectedGroupDetailAtom);
  const handleGroupClick = useCallback(
    ({ groupId, group }: { groupId: string; group: Group }) => {
      setSelectedGroup(group);
      router.push(`/groups/${groupId}`);
    },
    [router]
  );

  const handleAddGroup = useCallback(() => {
    router.push("/groups/new");
  }, [router]);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useInfiniteScroll({ isFetching, loadMore });

  if (!isClient) {
    return <DotSpinner />;
  }

  return (
    <div className="min-h-[calc(100dvh-107px)] px-5 text-T4">
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
        {groups && (
          <GroupList groups={groups} onGroupClick={handleGroupClick} />
        )}
      </Flex>
      {(isFetching || isFetchingDetail) && <DotSpinnerSmall />}
    </div>
  );
}

const styles = {
  headerWrapper:
    "h-12 fixed max-w-[430px] w-full transition-shadow duration-300",
  button:
    "bg-grayscale-50 py-2 px-3 bg-base-white text-T6 rounded-[8px] hover:scale-105 transition-transform cursor-pointer hover:bg-grayscale-100",
};
