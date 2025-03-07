"use client";
import React, { useEffect, useMemo, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { useRouter, useSearchParams } from "next/navigation";
import { useRecoilState } from "recoil";
import ArrowRightIcon from "@/components/shared/Icon/ArrowRightIcon";
import Spacing from "../shared/Spacing";
import Flex from "@/components/shared/Flex";
import Panel from "@/components/shared/Panel/Panel";

import useInfiniteScroll, {
  useInfiniteScrollByRef,
} from "@/hooks/useInfiniteScroll";
import { useAuth } from "../shared/providers/AuthProvider";
import useFriends from "../friends/hooks/useFriends";
import useFriendsRequestTotalCount from "../friends/hooks/useFriendsRequestCount";
import { friendsSelectedTabAtom } from "@/atoms/friends";
import DotSpinner from "../shared/Spinner/DotSpinner";
import UserFriendsListContainer from "../friends/UserFriendsListContainer";
import Link from "next/link";

const Groups = dynamic(() => import("@/components/groups/Group"), {
  ssr: false,
  loading: () => <DotSpinner />,
});

export default function FriendsAndGroups() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isClient, setIsClient] = useState<boolean>(false);
  const { userInfo } = useAuth();
  const [selectedTab, setSelectedTab] = useRecoilState(friendsSelectedTabAtom);
  const targetRef = useRef<HTMLDivElement>(null);
  const {
    data: friends = [],
    loadMore,
    isFetching,
  } = useFriends({
    userId: userInfo?.accountId || "",
  });

  const { data: requestCount = { count: 0 }, isFetching: isFetching_c } =
    useFriendsRequestTotalCount();

  useInfiniteScroll({ isFetching, loadMore });

  useEffect(() => {
    if (!isClient) {
      setIsClient(true);
    }
    const tabParam = searchParams?.get("tab");
    if (tabParam) {
      setSelectedTab(tabParam === "group" ? "2" : "1");
      router.replace("/social");
    }
  }, [searchParams, setSelectedTab, isClient]);

  const renderTabContent = useMemo(() => {
    if (selectedTab === "1") {
      return <UserFriendsListContainer friends={friends} />;
    } else return <Groups />;
  }, [selectedTab, friends]);

  useInfiniteScrollByRef({
    isFetching,
    loadMore,
    targetRef,
  });

  if (isFetching || isFetching_c) {
    return <DotSpinner />;
  }

  return (
    <>
      <div className="px-5 pt-12">
        <Panel
          title1="친구"
          title2="그룹"
          long="short"
          selectedTab={selectedTab}
          onClick={setSelectedTab}
          year={false}
        />
        <Spacing size={20} />
      </div>
      <div
        className="h-[calc(100dvh-164px)] overflow-y-scroll no-scrollbar"
        ref={targetRef}
      >
        {selectedTab !== "2" && (
          <Flex
            direction="column"
            justify="space-between"
            align="center"
            className="px-5 gap-4 pb-4"
          >
            <Flex justify="space-between" align="center" className="w-full">
              <span className="text-T4" id="friendList">
                {`친구 ${friends.length}`}
              </span>
              <Link className={styles.button} href="/friends/search">
                친구 추가
              </Link>
            </Flex>
            <Link href="/friends" className={styles.li}>
              <span>
                {`요청`}
                <span className="text-[#FA6767] ml-1">{`${requestCount.count}`}</span>
              </span>
              <ArrowRightIcon />
            </Link>
          </Flex>
        )}
        {renderTabContent}
      </div>
    </>
  );
}

const styles = {
  button:
    "py-2 px-3 bg-grayscale-50 text-T6 rounded-lg cursor-pointer active:bg-grayscale-100 transition duration-75",
  li: "text-T5 w-full flex py-5 px-6 rounded-[20px] items-center cursor-pointer border border-grayscale-100 justify-between alien-center active:bg-grayscale-50 transition duration-75",
};
