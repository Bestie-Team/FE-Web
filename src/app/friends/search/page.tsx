"use client";
import FriendsPageHeader from "@/components/friends/FriendsPageHeader";
import SearchInput from "@/components/shared/Input/SearchBar";
import Spacing from "@/components/shared/Spacing";
import { userSearchAtom } from "@/atoms/friends";
import { useRecoilValue } from "recoil";
import useDebounce from "@/hooks/debounce";
import useSearchUsers from "@/components/users/hooks/useSearchUsers";
import useInfiniteScroll from "@/hooks/useInfiniteScroll";
import Flex from "@/components/shared/Flex";
import Button from "@/components/shared/Button/Button";
import Link from "next/link";
import dynamic from "next/dynamic";
import DotSpinner from "@/components/shared/Spinner/DotSpinner";

const UserListContainer = dynamic(
  () => import("@/components/users/UserListContainer"),
  { ssr: false, loading: () => <DotSpinner /> }
);

export default function SearchPage() {
  const search = useRecoilValue(userSearchAtom);
  const debouncedSearch = useDebounce(search);

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
    <div className="h-dvh">
      <div className={"fixed bg-grayscale-50 max-w-[430px] w-full z-10"}>
        <FriendsPageHeader label="친구 추가" type="default" />
        <Spacing size={20} />
        <div className="px-5 pb-5 bg-grayscale-50">
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
            className="rounded-xl py-3 px-[14px] text-base-white text-B3"
          >
            <Link href="/friends/search">💌 친구 초대하기</Link>
          </Button>
        </Flex>
      )}
      <UserListContainer isFetching={isFetching} searchedFriends={userData} />
    </div>
  );
}
