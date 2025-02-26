import { getFeedMine } from "@/remote/feed";
import { useInfiniteQuery } from "@tanstack/react-query";
import { v4 as uuidv4 } from "uuid";
import { useCallback, useMemo } from "react";
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
  const defaultCursor = {
    createdAt: order === "DESC" ? maxDate : minDate,
    id: uuid,
  };
  const { data, hasNextPage, fetchNextPage, isFetching } = useInfiniteQuery({
    queryKey: ["get/feeds/mine"],
    queryFn: async ({ pageParam: cursor }): Promise<FeedResponse> =>
      getFeedMine({ cursor, order, minDate, maxDate, limit }),
    getNextPageParam: (lastPage) => lastPage?.nextCursor,
    initialPageParam: defaultCursor,
    throwOnError: true,
    staleTime: 60 * 1000,
  });
  const loadMore = useCallback(() => {
    if (hasNextPage === false || isFetching) {
      return;
    }
    fetchNextPage();
  }, [fetchNextPage, hasNextPage, isFetching]);

  const friends = useMemo(
    () => data?.pages.flatMap(({ feeds }) => feeds) ?? [],
    [data]
  );

  return { data: friends, loadMore, isFetching, hasNextPage };
}
