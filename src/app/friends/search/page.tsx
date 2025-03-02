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
import Flex from "@/components/shared/Flex";
import Button from "@/components/shared/Button/Button";
import Link from "next/link";

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
      {debouncedSearch.length < 1 && (
        <Flex
          direction="column"
          align="center"
          justify="center"
          className="h-[calc(100dvh-48px)] gap-5"
        >
          <span className="text-B2">
            친구가 아직 라이티를 가입하지 않았다면?
          </span>
          <Button
            color="#0a0a0a"
            className="rounded-[12px] py-[12px] px-[14px] text-base-white text-B3"
          >
            <Link href="/friends/search">💌 친구 초대하기</Link>
          </Button>
        </Flex>
      )}
      <UserListContainer
        isFetching={isFetching}
        searchedFriends={userData}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
    </div>
  );
}
