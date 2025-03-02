"use client";
import React, { useCallback, useEffect } from "react";
import ArrowRightIcon from "@/components/shared/Icon/ArrowRightIcon";
import * as lighty from "lighty-type";
import Spacing from "../shared/Spacing";
import UserFriendsListContainer from "@/components/friends/UserFriendsListContainer";
import useDebounce from "@/hooks/debounce";
import SearchedFriendsListContainer from "@/components/friends/SearchedFriendsListContainer";
import Groups from "@/components/groups/Group";
import Flex from "@/components/shared/Flex";
import Button from "@/components/shared/Button/Button";
import Panel, { PanelLength } from "@/components/shared/Panel/Panel";
import SearchInput from "@/components/shared/Input/SearchBar";
import { useRecoilState, useRecoilValue } from "recoil";
import { friendSearchAtom, friendsSelectedTabAtom } from "@/atoms/friends";
import { useAuth } from "../shared/providers/AuthProvider";
import useFriends from "../friends/hooks/useFriends";
import useInfiniteScroll from "@/hooks/useInfiniteScroll";
import FullPageLoader from "../shared/FullPageLoader";
import { useRouter, useSearchParams } from "next/navigation";

const TabSection = ({
  selectedTab,
  setSelectedTab,
}: {
  selectedTab: "1" | "2";
  setSelectedTab: (tabName: "1" | "2") => void;
}) => {
  const PanelProps = {
    title1: "친구",
    title2: "그룹",
    long: "short" as PanelLength,
    selectedTab,
    onClick: setSelectedTab,
  };

  return (
    <div className="px-5 pt-12">
      <Panel {...PanelProps} year={false} />
      <Spacing size={20} />
    </div>
  );
};

const TabContent = ({
  selectedTab,
  debouncedSearch,
  friends,
}: {
  selectedTab: string;
  debouncedSearch: string;
  friends: lighty.User[];
}) => {
  return (
    <>
      <div style={{ display: selectedTab === "1" ? "block" : "none" }}>
        {debouncedSearch.length > 0 ? (
          <SearchedFriendsListContainer debouncedSearch={debouncedSearch} />
        ) : (
          friends && <UserFriendsListContainer friends={friends} />
        )}
      </div>
      <div style={{ display: selectedTab === "2" ? "block" : "none" }}>
        <Groups />
      </div>
    </>
  );
};

const FriendListSection = ({
  friends,
  onAddFriend,
  onNavigateToFriends,
}: {
  friends: lighty.User[];
  onAddFriend: () => void;
  onNavigateToFriends: () => void;
}) => {
  return (
    <>
      <Flex
        direction="column"
        justify="space-between"
        align="center"
        className="px-5 gap-4"
      >
        <Flex justify="space-between" align="center" className="w-full">
          <span
            className="text-T5"
            id="friendList"
          >{`친구 ${friends.length}`}</span>
          <Button className={styles.button} onMouseDown={onAddFriend}>
            친구 추가
          </Button>
        </Flex>
        <SearchInput
          type="friends"
          className="!bg-grayscale-50"
          placeholder="이름/아이디로 검색하기"
        />
        <li className={styles.request} onMouseDown={onNavigateToFriends}>
          <span>
            {`요청`}
            <span className="text-[#FA6767] ml-1">{`${4}`}</span>
          </span>
          <ArrowRightIcon />
        </li>
      </Flex>
      <Spacing size={16} />
    </>
  );
};

const styles = {
  button:
    "py-2 px-3 bg-grayscale-50 text-T6 rounded-[8px] hover:scale-105 transition-transform cursor-pointer hover:bg-grayscale-100",
  request:
    "text-T5 w-full flex py-5 px-6 rounded-[20px] items-center cursor-pointer border border-grayscale-100 justify-between alien-center hover:bg-grayscale-50",
};

export default function FriendsAndGroups() {
  const [selectedTab, setSelectedTab] = useRecoilState(friendsSelectedTabAtom);
  const search = useRecoilValue(friendSearchAtom);
  const searchParams = useSearchParams();
  const debouncedSearch = useDebounce(search);
  const router = useRouter();
  const { userInfo } = useAuth();
  const {
    data: friends = [],
    loadMore,
    isFetching,
  } = useFriends({
    userId: userInfo?.accountId,
  });

  useEffect(() => {
    const tabParam = searchParams.get("tab");
    if (tabParam === "group") {
      setSelectedTab("2");
    }
  }, [searchParams]);

  useInfiniteScroll({ isFetching, loadMore });

  const handleAddFriend = useCallback(() => {
    router.push("/friends/search");
  }, [router]);

  const handleNavigateToFriends = useCallback(() => {
    router.push("/friends");
  }, [router]);

  if (isFetching) {
    return <FullPageLoader />;
  }

  return (
    <>
      <TabSection selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
      {selectedTab !== "2" && (
        <FriendListSection
          friends={friends}
          onAddFriend={handleAddFriend}
          onNavigateToFriends={handleNavigateToFriends}
        />
      )}
      <TabContent
        selectedTab={selectedTab}
        debouncedSearch={debouncedSearch}
        friends={friends}
      />
    </>
  );
}
