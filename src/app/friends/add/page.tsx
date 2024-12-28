"use client";
import FriendsPageHeader from "@/components/friends/FriendsPageHeader";
import SearchInput from "@/components/shared/inputs/SearchBar";
import Spacing from "@/components/shared/Spacing";

export default function AddPage() {
  return (
    <div className="max-w-[430px] fixed w-full z-10">
      <FriendsPageHeader label="친구 추가" />
      <div className="px-[20px]">
        <Spacing size={20} />
        <SearchInput
          className="!bg-base-white"
          placeholder="아이디를 검색해보세요."
        />
      </div>
      <Spacing size={16} />
    </div>
  );
}
