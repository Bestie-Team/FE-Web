import React, { useEffect, useState } from "react";
import * as lighty from "lighty-type";
import FriendsListContainer from "./FriendsListContainer";
import useSearchFriends from "./hooks/useSearchFriends";

export default function SearchedFriendsListContainer({
  debouncedSearch,
}: {
  debouncedSearch: string;
}) {
  const [searchedFriends, setSearchedFriends] = useState<lighty.User[]>([]);
  const [cursor, setCursor] = useState<lighty.UserCursor | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const {
    data: searchedFriendsData,
    isError,
    error,
  } = useSearchFriends({
    name: cursor?.name ?? "가",
    accountId: cursor?.accountId ?? "a",
    limit: 10,
    search: debouncedSearch,
    enabled: hasMore && debouncedSearch.length >= 2,
  });

  // debouncedSearch가 변경될 때만 데이터 초기화
  useEffect(() => {
    setSearchedFriends([]);
    setCursor(null);
    setHasMore(true);
  }, [debouncedSearch]);

  // 데이터 업데이트 처리
  useEffect(() => {
    if (searchedFriendsData && debouncedSearch) {
      // 새로운 데이터가 있는지 확인
      if (searchedFriendsData.users.length === 0) {
        setHasMore(false);
        return;
      }
      setSearchedFriends((prev) => [...prev, ...searchedFriendsData.users]);

      // 다음 커서가 없으면 더 이상 데이터가 없는 것
      if (!searchedFriendsData.nextCursor) {
        setHasMore(false);
      } else {
        setCursor(searchedFriendsData.nextCursor);
      }
    }
  }, [searchedFriendsData, debouncedSearch]);

  if (isError) {
    return <div>에러가 발생했습니다: {error.message}</div>;
  }

  return (
    <FriendsListContainer
      searchedFriends={searchedFriends}
      isModalOpen={isModalOpen}
      setIsModalOpen={setIsModalOpen}
    />
  );
}
