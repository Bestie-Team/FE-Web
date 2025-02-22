import { getGatheringNoFeed } from "@/remote/gathering";
import { useInfiniteQuery } from "@tanstack/react-query";
import * as lighty from "lighty-type";
import { useCallback } from "react";
import { v4 as uuidv4 } from "uuid";

const uuid = uuidv4();

/** createdAt = 현재날짜 */
export default function useGatheringNoFeeds({ limit }: { limit: number }) {
  const cursor = { createdAt: new Date().toISOString(), id: uuid };

  const { data, hasNextPage, fetchNextPage, isFetching } = useInfiniteQuery({
    queryKey: ["gatherings/no-feed"],
    queryFn: async ({
      pageParam: cursor,
    }): Promise<lighty.GatheringListResponse> =>
      await getGatheringNoFeed({
        cursor,
        limit: limit ? limit : 300,
      }),
    getNextPageParam: (lastPage) => lastPage?.nextCursor,
    initialPageParam: cursor,
    refetchOnWindowFocus: "always",
    staleTime: 3600 * 24000,
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
