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
import UserListContainer from "@/components/users/UserListContainer";
import clsx from "clsx";
import HeaderWithBtn from "@/components/shared/Header/HeaderWithBtn";
import { useRouter } from "next/navigation";

export default function SearchPage() {
  const search = useRecoilValue(userSearchAtom);
  const debouncedSearch = useDebounce(search);
  const router = useRouter();

  const {
    data: searchedUsers,
    loadMore,
    isFetching,
  } = useSearchUsers({
    search: debouncedSearch,
    enabled: debouncedSearch.length >= 2,
  });

  // const clickBackBtnHandler = () => {
  //   if (type === "groupEdit" || type === "group" || type === "gathering") {
  //     if (setStep) {
  //       setStep(1);
  //     }
  //   } else {
  //     router.back();
  //   }
  // };

  useInfiniteScroll({ isFetching, loadMore });

  return (
    <div className="h-dvh">
      <HeaderWithBtn
        headerLabel="친구 추가"
        onClickBackBtn={() => router.back}
        bgColor="#f4f4f4"
      >
        <Spacing size={20} />
        <div className={"w-full px-5 pb-5"}>
          <SearchInput
            type="users"
            className="!bg-base-white"
            placeholder="아이디를 검색해보세요."
          />
        </div>
      </HeaderWithBtn>
      {debouncedSearch.length < 1 && (
        <Flex
          direction="column"
          align="center"
          justify="center"
          className={clsx(
            "h-[calc(100dvh-48px)] gap-5 pt-safe-top pb-safe-bottom"
          )}
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
      <UserListContainer
        isFetching={isFetching}
        searchedUsers={searchedUsers}
      />
    </div>
  );
}
