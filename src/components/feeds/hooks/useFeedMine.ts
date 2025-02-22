import { getFeedMine } from "@/remote/feed";
import { useInfiniteQuery } from "@tanstack/react-query";
import { v4 as uuidv4 } from "uuid";
import { useCallback } from "react";
import { FeedResponse } from "@/models/feed";

const uuid = uuidv4();
export default function useFeedMine({
  order,
  minDate,
  maxDate,
  limit,
}: {
  order: "DESC" | "ASC";
  minDate: string;
  maxDate: string;
  limit: number;
}) {
  const cursor = {
    createdAt: order === "DESC" ? maxDate : minDate,
    id: uuid,
  };
  const { data, hasNextPage, fetchNextPage, isFetching } = useInfiniteQuery({
    queryKey: ["get/feeds/mine"],
    queryFn: async ({ pageParam: cursor }): Promise<FeedResponse> =>
      getFeedMine({ cursor, order, minDate, maxDate, limit }),
    getNextPageParam: (lastPage) => lastPage?.nextCursor,
    initialPageParam: cursor,
    throwOnError: true,
    staleTime: 3600 * 24000,
    refetchOnWindowFocus: "always",
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
