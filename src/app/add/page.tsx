"use client";
import FriendsPageHeader from "@/components/friends/FriendsPageHeader";
import SearchInput from "@/components/shared/inputs/SearchBar";
import Spacing from "@/components/shared/Spacing";

export default function AddPage() {
  return (
    <div className="max-w-[430px] fixed w-full bg-grayscale-50">
      <FriendsPageHeader type="add" />
      <div className="px-[20px]">
        <Spacing size={20} />
        <SearchInput
          className="!bg-base-white !text-B3"
          placeholder="아이디를 검색해보세요."
        />
      </div>
      <Spacing size={16} />
    </div>
  );
}
