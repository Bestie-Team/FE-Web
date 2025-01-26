import React, { useState } from "react";
import FriendsListContainer from "./FriendsListContainer";
import useSearchFriends from "./hooks/useSearchFriends";
import DotSpinnerSmall from "../shared/Spinner/DotSpinnerSmall";

export default function SearchedFriendsListContainer({
  debouncedSearch,
}: {
  debouncedSearch: string;
}) {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const { data, isFetching, loadMore, hasNextPage } = useSearchFriends({
    search: debouncedSearch,
    enabled: debouncedSearch.length >= 2,
  });
  if (isFetching) return <DotSpinnerSmall />;
  return (
    <FriendsListContainer
      hasMore={hasNextPage}
      loadMore={loadMore}
      friends={data}
      isModalOpen={isModalOpen}
      setIsModalOpen={setIsModalOpen}
    />
  );
}
