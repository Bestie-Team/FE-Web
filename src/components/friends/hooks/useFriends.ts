import { getFriends } from "@/remote/friends";
import { useInfiniteQuery } from "@tanstack/react-query";
import * as lighty from "lighty-type";
import { useCallback } from "react";

function useFriends({ userId }: { userId?: string }) {
  const { data, hasNextPage, fetchNextPage, isFetching } = useInfiniteQuery({
    queryKey: ["friends", userId],
    queryFn: async ({ pageParam }): Promise<lighty.FriendListResponse> => {
      return getFriends({ ...pageParam, limit: 8 });
    },
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    initialPageParam: {
      name: "가가",
      accountId: "aaaaa",
    },
    staleTime: 5 * 1000,
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

export function useFriendsAll({ userId }: { userId: string }) {
  const { data, hasNextPage, fetchNextPage, isFetching } = useInfiniteQuery({
    queryKey: ["friends/all", { accountId: "aaaa", limit: 100 }, userId],
    queryFn: async ({ pageParam }): Promise<lighty.FriendListResponse> => {
      return getFriends({ ...pageParam, limit: 100 });
    },
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    initialPageParam: {
      name: "가가",
      accountId: "aaaaa",
    },
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
