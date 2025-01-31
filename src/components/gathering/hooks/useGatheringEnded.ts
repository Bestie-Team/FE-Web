import { maxDate, minDate } from "@/constants/time";
import * as lighty from "lighty-type";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useCallback } from "react";
import { v4 as uuidv4 } from "uuid";
import { getGatheringsEnded } from "@/remote/gathering";

const uuid = uuidv4();

/** createdAt = 현재날짜 */
export default function useGatheringEnded() {
  const cursor = { createdAt: minDate(), id: uuid };
  const { data, hasNextPage, fetchNextPage, isFetching } = useInfiniteQuery({
    queryKey: ["gatherings/no-feed"],
    queryFn: async ({
      pageParam: cursor,
    }): Promise<lighty.GatheringListResponse> => {
      return getGatheringsEnded({
        cursor,
        limit: 8,
        minDate: minDate(),
        maxDate: maxDate(),
      });
    },
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
