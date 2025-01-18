"use client";
import * as lighty from "lighty-type";
import FriendsPageHeader from "@/components/friends/FriendsPageHeader";
import SearchInput from "@/components/shared/inputs/SearchBar";
import Spacing from "@/components/shared/Spacing";
import { friendSearchModalStateAtom, userSearchAtom } from "@/atoms/friends";
import { useRecoilState, useRecoilValue } from "recoil";
import { useEffect, useState } from "react";
import useDebounce from "@/hooks/debounce";
import useSearchUsers from "@/components/users/hooks/useSearchUsers";
import UserListContainer from "@/components/users/UserListContainer";

export default function SearchPage() {
  const [isModalOpen, setIsModalOpen] = useRecoilState(
    friendSearchModalStateAtom
  );
  const [users, setUsers] = useState<lighty.User[]>([]);
  const [userCursor, setUserCursor] = useState<lighty.UserCursor | null>();
  const search = useRecoilValue(userSearchAtom);
  const debouncedSearch = useDebounce(search);
  const [hasMore, setHasMore] = useState<boolean>(true);

  const {
    data: userData,
    isError,
    error,
  } = useSearchUsers({
    name: userCursor?.name ?? "가",
    accountId: userCursor?.accountId ?? "a",
    limit: 10,
    search: debouncedSearch,
    enabled: hasMore && debouncedSearch.length >= 2,
  });

  if (isError) {
    console.error("에러 발생:", error);
  }

  useEffect(() => {
    console.log(debouncedSearch);
    setUsers([]);
    setUserCursor(null);
    setHasMore(true);
  }, [debouncedSearch]);

  useEffect(() => {
    if (userData && debouncedSearch) {
      setUsers(userData.users);
    }

    if (userData?.nextCursor != null) {
      setUserCursor(userData?.nextCursor);
    }
  }, [userData]);

  return (
    <div className="flex flex-col bg-grayscale-50 no-scrollbar h-screen">
      <div className="max-w-[430px] fixed w-full z-10">
        <FriendsPageHeader label="친구 추가" />
        <div className="px-[20px]">
          <Spacing size={20} />
          <SearchInput
            type="users"
            className="!bg-base-white"
            placeholder="아이디를 검색해보세요."
          />
        </div>
        <Spacing size={16} />
      </div>
      <UserListContainer
        searchedFriends={users}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
    </div>
  );
}
