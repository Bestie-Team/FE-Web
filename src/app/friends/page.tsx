"use client";
import TabBar from "@/components/shared/tab/TabBar";
import { useRecoilState } from "recoil";
import { friendsSelectedTabAtom } from "@/atoms/friends";
import Spacing from "@/components/shared/Spacing";
import SearchInput from "@/components/shared/inputs/SearchBar";
import FriendsPageHeader from "@/components/friends/FriendsPageHeader";
import FriendsListContainer from "@/components/friends/FriendsListContainer";
import RequestFriendListContainer from "@/components/friends/RequestFriendListContainer";
import clsx from "clsx";
import { useRef } from "react";
import useScrollShadow from "@/hooks/useScrollShadow";

export default function FriendsPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const hasShadow = useScrollShadow(containerRef);
  const [selectedTab, setSelectedTab] = useRecoilState(friendsSelectedTabAtom);

  return (
    <div
      ref={containerRef}
      className="h-screen overflow-y-scroll no-scrollbar bg-grayscale-50"
    >
      <div
        className={clsx(
          "h-screen max-w-[430px] fixed w-full z-10",
          hasShadow ? "shadow-bottom" : ""
        )}
      >
        <FriendsPageHeader label="친구" addFriendIcon />
        <div className="px-[20px] bg-grayscale-50">
          <TabBar
            title1="전체"
            title2="요청"
            long="short"
            atom={friendsSelectedTabAtom}
            onClick={(selected) => setSelectedTab(selected)}
          />
          <Spacing size={20} />
          <SearchInput
            className="!bg-base-white "
            placeholder="이름/아이디로 검색하기"
          />
          <Spacing size={20} />
        </div>
      </div>
      {selectedTab === "1" ? <FriendsListContainer /> : null}
      {selectedTab === "2" ? <RequestFriendListContainer /> : null}
    </div>
  );
}
