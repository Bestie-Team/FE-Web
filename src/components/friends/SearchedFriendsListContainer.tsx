import React, { useState } from "react";
import FriendsListContainer from "./FriendsListContainer";
import useSearchFriends from "./hooks/useSearchFriends";
import DotSpinnerSmall from "../shared/Spinner/DotSpinnerSmall";
import useInfiniteScroll from "@/hooks/useInfiniteScroll";

export default function SearchedFriendsListContainer({
  debouncedSearch,
}: {
  debouncedSearch: string;
}) {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const { data, isFetching, loadMore } = useSearchFriends({
    search: debouncedSearch,
    enabled: debouncedSearch.length >= 2,
  });

  if (isFetching) return <DotSpinnerSmall />;

  useInfiniteScroll({ isFetching, loadMore });

  return (
    <FriendsListContainer
      friends={data}
      isModalOpen={isModalOpen}
      setIsModalOpen={setIsModalOpen}
    />
  );
}
