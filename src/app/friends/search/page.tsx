"use client";
import FriendsPageHeader from "@/components/friends/FriendsPageHeader";
import SearchInput from "@/components/shared/Input/SearchBar";
import Spacing from "@/components/shared/Spacing";
import { friendSearchModalStateAtom, userSearchAtom } from "@/atoms/friends";
import { useRecoilState, useRecoilValue } from "recoil";
import useDebounce from "@/hooks/debounce";
import useSearchUsers from "@/components/users/hooks/useSearchUsers";
import UserListContainer from "@/components/users/UserListContainer";
import useInfiniteScroll from "@/hooks/useInfiniteScroll";
import clsx from "clsx";
import { useScrollThreshold } from "@/hooks/useScrollThreshold";

export default function SearchPage() {
  const [isModalOpen, setIsModalOpen] = useRecoilState(
    friendSearchModalStateAtom
  );
  const search = useRecoilValue(userSearchAtom);
  const debouncedSearch = useDebounce(search);
  const isPast = useScrollThreshold();

  const {
    data: userData,
    loadMore,
    isFetching,
  } = useSearchUsers({
    search: debouncedSearch,
    enabled: debouncedSearch.length >= 2,
  });

  useInfiniteScroll({ isFetching, loadMore });

  return (
    <div className="h-full">
      <div
        className={clsx(
          "bg-grayscale-50 max-w-[430px] fixed w-full z-10",
          isPast ? "shadow-bottom" : ""
        )}
      >
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
        searchedFriends={userData}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
    </div>
  );
}
