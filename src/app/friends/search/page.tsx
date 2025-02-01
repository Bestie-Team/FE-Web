"use client";
import FriendsPageHeader from "@/components/friends/FriendsPageHeader";
import SearchInput from "@/components/shared/Input/SearchBar";
import Spacing from "@/components/shared/Spacing";
import { friendSearchModalStateAtom, userSearchAtom } from "@/atoms/friends";
import { useRecoilState, useRecoilValue } from "recoil";
import useDebounce from "@/hooks/debounce";
import useSearchUsers from "@/components/users/hooks/useSearchUsers";
import UserListContainer from "@/components/users/UserListContainer";

export default function SearchPage() {
  const [isModalOpen, setIsModalOpen] = useRecoilState(
    friendSearchModalStateAtom
  );
  const search = useRecoilValue(userSearchAtom);
  const debouncedSearch = useDebounce(search);

  const {
    data: userData,
    loadMore,
    hasNextPage,
    isFetching,
  } = useSearchUsers({
    search: debouncedSearch,
    enabled: debouncedSearch.length >= 2,
  });

  return (
    <div className="flex flex-col bg-grayscale-50 overflow-y-scroll no-scrollbar h-screen">
      <div className="bg-grayscale-50 max-w-[430px] fixed w-full z-10">
        <FriendsPageHeader label="친구 추가" />
        <Spacing size={20} />
        <div className="px-[20px] pb-5 bg-grayscale-50">
          <SearchInput
            type="users"
            className="!bg-base-white"
            placeholder="아이디를 검색해보세요."
          />
        </div>
      </div>
      <UserListContainer
        isFetching={isFetching}
        hasMore={hasNextPage}
        loadMore={loadMore}
        searchedFriends={userData}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
    </div>
  );
}
