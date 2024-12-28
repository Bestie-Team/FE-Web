"use client";
import TabBar from "@/components/shared/tab/TabBar";
import { useRecoilState } from "recoil";
import { friendsSelectedTabAtom } from "@/atoms/friends";
import Spacing from "@/components/shared/Spacing";
import SearchInput from "@/components/shared/inputs/SearchBar";
import FriendsPageHeader from "@/components/friends/FriendsPageHeader";
import FriendsListContainer from "@/components/friends/FriendsListContainer";
import RequestFriendListContainer from "@/components/friends/RequestFriendListContainer";

export default function FriendsPage() {
  const [selectedTab, setSelectedTab] = useRecoilState(friendsSelectedTabAtom);

  return (
    <div>
      <div className="max-w-[430px] fixed w-full z-10">
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
