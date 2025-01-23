import { getFriends } from "@/remote/friends";
import { useInfiniteQuery } from "@tanstack/react-query";
import * as lighty from "lighty-type";
import { useCallback } from "react";

function useFriends() {
  const { data, hasNextPage, fetchNextPage, isFetching } = useInfiniteQuery({
    queryKey: ["friends", { accountId: "aaaa", limit: 10 }],
    queryFn: async ({ pageParam }): Promise<lighty.FriendListResponse> => {
      return getFriends({ ...pageParam, limit: 10 });
    },
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    initialPageParam: {
      name: "가가",
      accountId: "aaaaa",
    },
    refetchOnWindowFocus: "always",
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

export default useFriends;
