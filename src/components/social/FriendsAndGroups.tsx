"use client";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import dynamic from "next/dynamic";
import { useRouter, useSearchParams } from "next/navigation";
import { useRecoilState, useRecoilValue } from "recoil";

import ArrowRightIcon from "@/components/shared/Icon/ArrowRightIcon";
import Spacing from "../shared/Spacing";
import Flex from "@/components/shared/Flex";
import Button from "@/components/shared/Button/Button";
import Panel from "@/components/shared/Panel/Panel";
import SearchInput from "@/components/shared/Input/SearchBar";

import useDebounce from "@/hooks/debounce";
import useInfiniteScroll from "@/hooks/useInfiniteScroll";
import { useAuth } from "../shared/providers/AuthProvider";
import useFriends from "../friends/hooks/useFriends";
import useFriendsRequestTotalCount from "../friends/hooks/useFriendsRequestCount";
import { friendSearchAtom, friendsSelectedTabAtom } from "@/atoms/friends";
import DotSpinner from "../shared/Spinner/DotSpinner";

const UserFriendsListContainer = dynamic(
  () => import("@/components/friends/UserFriendsListContainer"),
  { ssr: false, loading: () => <DotSpinner /> }
);

const SearchedFriendsListContainer = dynamic(
  () => import("@/components/friends/SearchedFriendsListContainer"),
  { ssr: false, loading: () => <DotSpinner /> }
);

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
  const search = useRecoilValue(friendSearchAtom);
  const debouncedSearch = useDebounce(search);

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

  const handleAddFriend = useCallback(
    () => router.push("/friends/search"),
    [router]
  );

  const handleNavigateToFriends = useCallback(
    () => router.push("/friends"),
    [router]
  );

  const renderTabContent = useMemo(() => {
    if (selectedTab === "1") {
      return debouncedSearch.length > 0 ? (
        <SearchedFriendsListContainer debouncedSearch={debouncedSearch} />
      ) : (
        <UserFriendsListContainer friends={friends} />
      );
    }
    return <Groups />;
  }, [selectedTab, debouncedSearch, friends]);

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
            <Button
              className="py-2 px-3 bg-grayscale-50 text-T6 rounded-[8px] hover:scale-105 transition-transform cursor-pointer hover:bg-grayscale-100"
              onMouseDown={handleAddFriend}
            >
              친구 추가
            </Button>
          </Flex>

          <SearchInput
            type="friends"
            className="!bg-grayscale-50"
            placeholder="이름/아이디로 검색하기"
          />

          <li
            className="text-T5 w-full flex py-5 px-6 rounded-[20px] items-center cursor-pointer border border-grayscale-100 justify-between alien-center hover:bg-grayscale-50"
            onMouseDown={handleNavigateToFriends}
          >
            <span>
              {`요청`}
              <span className="text-[#FA6767] ml-1">{`${requestCount.count}`}</span>
            </span>
            <ArrowRightIcon />
          </li>
        </Flex>
      )}
      {renderTabContent}
    </>
  );
}
