import { useCallback } from "react";
import { getFeedAll } from "@/remote/feed";
import { useInfiniteQuery } from "@tanstack/react-query";
import { v4 as uuidv4 } from "uuid";
const uuid = uuidv4();
import { FeedResponse } from "@/models/feed";

export default function useFeedAll({
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
    queryKey: ["get/feeds/all"],
    queryFn: async ({ pageParam: cursor }): Promise<FeedResponse> =>
      getFeedAll({ cursor, order, minDate, maxDate, limit }),
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
