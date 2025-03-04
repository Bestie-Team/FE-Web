import { useCallback, useMemo } from "react";
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
  enabled = true,
}: {
  order: "DESC" | "ASC";
  minDate: string;
  maxDate: string;
  limit: number;
  enabled?: boolean;
}) {
  const defaultCursor = {
    createdAt: order === "DESC" ? maxDate : minDate,
    id: uuid,
  };
  const { data, hasNextPage, fetchNextPage, isFetching } = useInfiniteQuery({
    queryKey: ["get/feeds/all"],
    queryFn: async ({ pageParam: cursor }): Promise<FeedResponse> =>
      getFeedAll({ cursor, order, minDate, maxDate, limit }),
    getNextPageParam: (lastPage) => lastPage?.nextCursor,
    initialPageParam: defaultCursor,
    staleTime: 60 * 1000,
    refetchOnWindowFocus: true,
    enabled: enabled,
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
