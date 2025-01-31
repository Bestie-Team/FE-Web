import { getGatheringNoFeed, getGatherings } from "@/remote/gathering";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { useCallback } from "react";
import { v4 as uuidv4 } from "uuid";

const uuid = uuidv4();

/** createdAt = 현재날짜 */
export default function useGatheringNoFeeds() {
  const cursor = { createdAt: new Date().toISOString(), id: uuid };
  const { data, hasNextPage, fetchNextPage, isFetching } = useInfiniteQuery({
    queryKey: ["gatherings/no-feed"],
    queryFn: () =>
      getGatheringNoFeed({
        cursor,
        limit: 300,
      }),
    getNextPageParam: (lastPage) => lastPage?.nextCursor,
    initialPageParam: cursor,
    refetchOnWindowFocus: "always",
  });

  const loadMore = useCallback(() => {
    if (hasNextPage === false || isFetching) {
      return;
    }
    fetchNextPage();
  }, [fetchNextPage, hasNextPage, isFetching]);

  const friends = data?.pages.map(({ gatherings }) => gatherings).flat();

  return { data: friends, loadMore, isFetching, hasNextPage };
}
