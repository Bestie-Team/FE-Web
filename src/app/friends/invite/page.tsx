"use client";
import FriendsPageHeader from "@/components/friends/FriendsPageHeader";
import SelectFriendsContainer from "@/components/friends/SelectFriendsContainer";
import SearchInput from "@/components/shared/inputs/SearchBar";
import Spacing from "@/components/shared/Spacing";

export default function InvitePage() {
  return (
    <div>
      <div className="max-w-[430px] fixed w-full z-10 bg-grayscale-50">
        <FriendsPageHeader label="초대할 친구" addFriendIcon={false} />
        <div className="px-[20px]">
          <Spacing size={20} />
          <SearchInput
            className="!bg-base-white"
            placeholder="이름/아이디로 검색하기"
          />
        </div>
        <Spacing size={16} />
      </div>
      <SelectFriendsContainer paddingTop="138px" />
    </div>
  );
}
