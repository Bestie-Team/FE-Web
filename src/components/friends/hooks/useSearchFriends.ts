import { getSearchFriends } from "@/remote/friends";
import { useInfiniteQuery } from "@tanstack/react-query";
import type * as lighty from "lighty-type";
import { useCallback } from "react";

export default function useSearchFriends({
  search,
  enabled,
}: {
  search: string;
  enabled: boolean;
}) {
  const { data, hasNextPage, fetchNextPage, isFetching } = useInfiniteQuery({
    queryKey: ["friends", { search, enabled }],
    queryFn: ({ pageParam }): Promise<lighty.FriendListResponse> => {
      return getSearchFriends({ ...pageParam, limit: 10, search });
    },
    getNextPageParam: (lastPage) => lastPage?.nextCursor,
    initialPageParam: {
      name: "가",
      accountId: "a",
    },
    enabled: enabled,
    staleTime: 5 * 60 * 1000,
  });

  const loadMore = useCallback(() => {
    if (hasNextPage === false || isFetching) {
      return;
    }
    fetchNextPage();
  }, [fetchNextPage, hasNextPage, isFetching]);

  const friends = data?.pages.map(({ users }) => users).flat();

  return { data: friends, loadMore, isFetching, hasNextPage };
}
