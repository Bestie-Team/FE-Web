"use client";
import TabBar from "@/components/shared/tab/TabBar";
import { useRecoilState, useRecoilValue } from "recoil";
import { friendSearchAtom, friendsSelectedTabAtom } from "@/atoms/friends";
import Spacing from "@/components/shared/Spacing";
import SearchInput from "@/components/shared/inputs/SearchBar";
import FriendsPageHeader from "@/components/friends/FriendsPageHeader";
import clsx from "clsx";
import { useRef } from "react";
import useScrollShadow from "@/hooks/useScrollShadow";
import UserFriendsListContainer from "@/components/friends/UserFriendsListContainer";
import SentReceivedFriendRequestsList from "@/components/friends/SentReceivedFriendRequestsList";
import useDebounce from "@/hooks/debounce";
import SearchedFriendsListContainer from "@/components/friends/SearchedFriendsListContainer";

export default function FriendsPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const hasShadow = useScrollShadow(containerRef);
  const [selectedTab, setSelectedTab] = useRecoilState(friendsSelectedTabAtom);
  const search = useRecoilValue(friendSearchAtom);
  const debouncedSearch = useDebounce(search);

  const renderContent = () => {
    if (selectedTab === "1") {
      return debouncedSearch.length > 0 ? (
        <SearchedFriendsListContainer debouncedSearch={debouncedSearch} />
      ) : (
        <UserFriendsListContainer />
      );
    }

    if (selectedTab === "2") {
      return <SentReceivedFriendRequestsList />;
    }

    return null;
  };
  console.log(debouncedSearch);
  return (
    <div
      ref={containerRef}
      className="h-screen overflow-y-scroll no-scrollbar bg-grayscale-50"
    >
      <div
        className={clsx(
          "max-w-[430px] fixed w-full z-10 bg-grayscale-50",
          hasShadow ? "shadow-bottom" : ""
        )}
      >
        <FriendsPageHeader label="친구" addFriendIcon />
        <div className="px-[20px]">
          <TabBar
            title1="전체"
            title2="요청"
            long="short"
            selectedTab={selectedTab}
            onClick={(selected) => setSelectedTab(selected)}
          />
          <Spacing size={20} />
          <SearchInput
            type="friends"
            className="!bg-base-white "
            placeholder="이름/아이디로 검색하기"
          />
          <Spacing size={20} />
        </div>
      </div>
      {renderContent()}
    </div>
  );
}
