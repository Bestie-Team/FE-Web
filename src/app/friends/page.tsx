"use client";
import { useRecoilState, useRecoilValue } from "recoil";
import { friendSearchAtom, friendsSelectedTabAtom } from "@/atoms/friends";
import Spacing from "@/components/shared/Spacing";
import SearchInput from "@/components/shared/Input/SearchBar";
import FriendsPageHeader from "@/components/friends/FriendsPageHeader";
import clsx from "clsx";
import { useMemo, useCallback, useEffect, useState } from "react";
import UserFriendsListContainer from "@/components/friends/UserFriendsListContainer";
import SentReceivedFriendRequestsList from "@/components/friends/SentReceivedFriendRequestsList";
import useDebounce from "@/hooks/debounce";
import SearchedFriendsListContainer from "@/components/friends/SearchedFriendsListContainer";
import { PanelLength } from "@/components/shared/Panel/Panel";
import Panel from "@/components/shared/Panel/Panel";
import FullPageLoader from "@/components/shared/FullPageLoader";
import { useScrollThreshold } from "@/hooks/useScrollThreshold";

export default function FriendsPage() {
  const [isClient, setIsClient] = useState(false);
  const [selectedTab, setSelectedTab] = useRecoilState(friendsSelectedTabAtom);
  const search = useRecoilValue(friendSearchAtom);
  const debouncedSearch = useDebounce(search);
  const isPast = useScrollThreshold();

  const renderSelectedTabContent = useCallback(() => {
    // 전체
    if (selectedTab === "1") {
      return debouncedSearch.length > 0 ? (
        <>
          <Spacing size={177} />
          <SearchedFriendsListContainer debouncedSearch={debouncedSearch} />
        </>
      ) : (
        <>
          <Spacing size={177} />
          <UserFriendsListContainer />
        </>
      );
    }
    // 요청
    if (selectedTab === "2") {
      return <SentReceivedFriendRequestsList />;
    }
    return null;
  }, [selectedTab, debouncedSearch]);

  const PanelProps = useMemo(
    () => ({
      title1: "전체",
      title2: "요청",
      long: "short" as PanelLength,
      selectedTab,
      onClick: setSelectedTab,
    }),
    [selectedTab, setSelectedTab]
  );

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return <FullPageLoader />;
  }

  return (
    <div className="bg-grayscale-50 h-full">
      <div
        className={clsx(
          "max-w-[430px] fixed w-full z-1 bg-grayscale-50",
          isPast ? "shadow-bottom" : ""
        )}
      >
        <FriendsPageHeader label="친구" addFriendIcon />
        <div className="px-[20px]">
          <Panel {...PanelProps} year={false} />
          <Spacing size={20} />
          <SearchInput
            type="friends"
            className="!bg-base-white "
            placeholder="이름/아이디로 검색하기"
          />
          <Spacing size={20} />
        </div>
      </div>
      {renderSelectedTabContent()}
    </div>
  );
}
