import { getFeedHidden } from "@/remote/feed";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useCallback } from "react";
import { v4 as uuidv4 } from "uuid";
import { FeedResponse } from "@/models/feed";

const uuid = uuidv4();

export default function useFeedHidden({ limit }: { limit: number }) {
  const cursor = {
    createdAt: new Date().toISOString(),
    id: uuid,
  };
  const { data, hasNextPage, fetchNextPage, isFetching } = useInfiniteQuery({
    queryKey: ["get/feeds/hidden"],
    queryFn: async ({ pageParam: cursor }): Promise<FeedResponse> =>
      getFeedHidden({ cursor, limit }),
    getNextPageParam: (lastPage) => lastPage?.nextCursor,
    initialPageParam: cursor,
    refetchOnWindowFocus: "always",
    throwOnError: true,
  });

  const loadMore = useCallback(() => {
    if (hasNextPage === false || isFetching) {
      return;
    }
    fetchNextPage();
  }, [fetchNextPage, hasNextPage, isFetching]);

  const friends = data?.pages.map(({ feeds }) => feeds).flat();

  return { data: friends, loadMore, isFetching, hasNextPage };
}
