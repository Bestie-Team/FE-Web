"use client";
import { useRecoilState, useRecoilValue } from "recoil";
import { friendSearchAtom, friendsSelectedTabAtom } from "@/atoms/friends";
import Spacing from "@/components/shared/Spacing";
import SearchInput from "@/components/shared/Input/SearchBar";
import FriendsPageHeader from "@/components/friends/FriendsPageHeader";
import clsx from "clsx";
import { useRef, useMemo, useCallback } from "react";
import useScrollShadow from "@/hooks/useScrollShadow";
import UserFriendsListContainer from "@/components/friends/UserFriendsListContainer";
import SentReceivedFriendRequestsList from "@/components/friends/SentReceivedFriendRequestsList";
import useDebounce from "@/hooks/debounce";
import SearchedFriendsListContainer from "@/components/friends/SearchedFriendsListContainer";
import { PanelLength } from "@/components/shared/Panel/Panel";
import Panel from "@/components/shared/Panel/Panel";

export default function FriendsPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const hasShadow = useScrollShadow(containerRef);
  const [selectedTab, setSelectedTab] = useRecoilState(friendsSelectedTabAtom);
  const search = useRecoilValue(friendSearchAtom);
  const debouncedSearch = useDebounce(search);

  const renderSelectedTabContent = useCallback(() => {
    // 전체
    if (selectedTab === "1") {
      return debouncedSearch.length > 0 ? (
        <SearchedFriendsListContainer debouncedSearch={debouncedSearch} />
      ) : (
        <UserFriendsListContainer />
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

  return (
    <div
      ref={containerRef}
      className="h-screen overflow-y-scroll no-scrollbar bg-grayscale-50"
    >
      <div
        className={clsx(
          "max-w-[430px] fixed w-full z-1 bg-grayscale-50",
          hasShadow ? "shadow-bottom" : ""
        )}
      >
        <FriendsPageHeader label="친구" addFriendIcon />
        <div className="px-[20px]">
          <Panel {...PanelProps} />
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
