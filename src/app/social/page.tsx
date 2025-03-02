"use client";
import { useRecoilState, useRecoilValue } from "recoil";
import { friendSearchAtom, friendsSelectedTabAtom } from "@/atoms/friends";
import Spacing from "@/components/shared/Spacing";
import clsx from "clsx";
import { useMemo, useCallback } from "react";
import UserFriendsListContainer from "@/components/friends/UserFriendsListContainer";
import useDebounce from "@/hooks/debounce";
import SearchedFriendsListContainer from "@/components/friends/SearchedFriendsListContainer";
import { PanelLength } from "@/components/shared/Panel/Panel";
import Panel from "@/components/shared/Panel/Panel";
import FullPageLoader from "@/components/shared/FullPageLoader";
import { useScrollThreshold } from "@/hooks/useScrollThreshold";
import getHeader from "@/utils/getHeader";
import Groups from "@/components/groups/Group";
import Flex from "@/components/shared/Flex";
import Button from "@/components/shared/Button/Button";
import SearchInput from "@/components/shared/Input/SearchBar";
import { useRouter } from "next/navigation";
import useFriends from "@/components/friends/hooks/useFriends";
import { useAuth } from "@/components/shared/providers/AuthProvider";
import useInfiniteScroll from "@/hooks/useInfiniteScroll";
import ArrowRightIcon from "@/components/shared/Icon/ArrowRightIcon";

const styles = {
  button:
    "py-2 px-3 bg-grayscale-50 text-T6 rounded-[8px] hover:scale-105 transition-transform cursor-pointer",
  request:
    "text-T5 w-full flex py-5 px-6 rounded-[20px] items-center cursor-pointer border border-grayscale-100 justify-between alien-center",
};

export default function SocialPage() {
  const header = useMemo(() => getHeader("/social"), []);
  const { userInfo } = useAuth();
  const router = useRouter();
  const [selectedTab, setSelectedTab] = useRecoilState(friendsSelectedTabAtom);
  const search = useRecoilValue(friendSearchAtom);
  const debouncedSearch = useDebounce(search);
  const isPast = useScrollThreshold();

  const {
    data: friends = [],
    loadMore,
    isFetching,
  } = useFriends({
    userId: userInfo?.accountId,
  });

  useInfiniteScroll({ isFetching, loadMore });

  const handleAddFriend = useCallback(() => {
    router.push("/friends/search");
  }, [router]);

  const PanelProps = {
    title1: "친구",
    title2: "그룹",
    long: "short" as PanelLength,
    selectedTab,
    onClick: setSelectedTab,
  };

  const SelectedTabContent = useMemo(() => {
    if (selectedTab === "1") {
      return debouncedSearch.length > 0 ? (
        <SearchedFriendsListContainer debouncedSearch={debouncedSearch} />
      ) : (
        friends.length > 0 && <UserFriendsListContainer friends={friends} />
      );
    }
    if (selectedTab === "2") {
      return <Groups />;
    }
    return null;
  }, [selectedTab, debouncedSearch, friends]);

  if (isFetching) {
    return <FullPageLoader />;
  }

  return (
    <div className="h-dvh">
      <div
        className={clsx(
          "max-w-[430px] fixed w-full z-1",
          isPast ? "shadow-bottom" : ""
        )}
      >
        {header}
        <div className="px-5 pt-12">
          <Panel {...PanelProps} year={false} />
          <Spacing size={20} />
        </div>
      </div>
      <Spacing size={107} />
      {selectedTab !== "2" && (
        <>
          <Flex
            direction="column"
            justify="space-between"
            align="center"
            className="px-5 gap-4"
          >
            <Flex justify="space-between" align="center" className="w-full">
              <span
                className="text-T5"
                id="friendList"
              >{`친구 ${friends.length}`}</span>
              <Button className={styles.button} onMouseDown={handleAddFriend}>
                친구 추가
              </Button>
            </Flex>
            <SearchInput
              type="friends"
              className="!bg-grayscale-50"
              placeholder="이름/아이디로 검색하기"
            />

            <li
              className={styles.request}
              onMouseDown={() => router.push("/friends")}
            >
              <span>
                {`요청`}
                <span className="text-[#FA6767] ml-1">{`${4}`}</span>
              </span>
              <ArrowRightIcon />
            </li>
          </Flex>
          <Spacing size={16} />
        </>
      )}
      {SelectedTabContent}
    </div>
  );
}
