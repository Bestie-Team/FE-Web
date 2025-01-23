import React, { useState } from "react";
import FriendsListContainer from "./FriendsListContainer";
import useSearchFriends from "./hooks/useSearchFriends";

export default function SearchedFriendsListContainer({
  debouncedSearch,
}: {
  debouncedSearch: string;
}) {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const { data, loadMore, isFetching, hasNextPage } = useSearchFriends({
    search: debouncedSearch,
    enabled: debouncedSearch.length >= 2,
  });

  return (
    <FriendsListContainer
      isFetching={isFetching}
      hasMore={hasNextPage}
      loadMore={loadMore}
      friends={data}
      isModalOpen={isModalOpen}
      setIsModalOpen={setIsModalOpen}
    />
  );
}
