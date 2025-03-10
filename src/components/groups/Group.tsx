"use client";
import GroupContainer from "@/components/groups/GroupContainer";
import useGroup from "@/components/groups/hooks/useGroups";
import Flex from "@/components/shared/Flex";
import Spacing from "@/components/shared/Spacing";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Group } from "lighty-type";
import useInfiniteScroll from "@/hooks/useInfiniteScroll";
import useUserDetail from "@/components/users/hooks/useUserDetail";
import DotSpinnerSmall from "@/components/shared/Spinner/DotSpinnerSmall";
import DotSpinner from "../shared/Spinner/DotSpinner";
import Link from "next/link";
import clsx from "clsx";

const GroupList = ({ groups }: { groups: Group[] }) => {
  const router = useRouter();
  return groups.map((group) => (
    <GroupContainer
      key={`${group.id}`}
      group={group}
      className="cursor-pointer"
      onClick={(e: React.MouseEvent<HTMLLIElement>) => {
        e.stopPropagation();
        router.push(`/groups/${group.id}`);
      }}
    />
  ));
};

export default function Groups() {
  const [isClient, setIsClient] = useState(false);
  const { data: detail, isFetching: isFetchingDetail } = useUserDetail();
  const { data: groups, isFetching, loadMore } = useGroup({ limit: 6 });

  useEffect(() => {
    if (!isClient) {
      setIsClient(true);
    }
  }, [isClient]);

  useInfiniteScroll({ isFetching, loadMore });

  if (!isClient) {
    return <DotSpinner />;
  }

  return (
    <div
      className={clsx(
        "h-[calc(100dvh-144px)] px-5 text-T4 mt-3 pb-20",
        window.ReactNativeWebView ? "pt-safe-top" : ""
      )}
    >
      <Flex align="center">
        <span>전체 그룹</span>
        <Spacing size={4} direction="horizontal" />
        <span className="flex-grow">{detail?.groupCount}</span>
        <Spacing size={4} direction="horizontal" />
        <Link href={`/groups/new`} className={styles.button}>
          그룹 추가
        </Link>
      </Flex>
      <Spacing size={16} />
      <ul className="flex flex-col gap-4 pb-20">
        {groups && <GroupList groups={groups} />}
      </ul>
      {(isFetching || isFetchingDetail) && <DotSpinnerSmall />}
    </div>
  );
}

const styles = {
  headerWrapper:
    "h-12 fixed max-w-[430px] w-full transition-shadow duration-300",
  button:
    "bg-grayscale-50 py-2 px-3 bg-base-white text-T6 rounded-lg transition-transform cursor-pointer active:bg-grayscale-100",
};
