import { getSentInvitationToGatheringList } from "@/remote/gathering";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useCallback } from "react";
import * as lighty from "lighty-type";
import { maxDate, minDate } from "@/constants/time";

export default function useSentInvitationToGathering() {
  const cursor = new Date().toISOString();

  const { data, hasNextPage, fetchNextPage, isFetching } = useInfiniteQuery({
    queryKey: ["sent", "gathering/invitation"],
    queryFn: async ({
      pageParam: cursor,
    }): Promise<lighty.GatheringInvitationListResponse> => {
      return getSentInvitationToGatheringList({
        cursor,
        limit: 20,
        minDate: minDate,
        maxDate: maxDate,
      });
    },
    getNextPageParam: (lastPage) => lastPage?.nextCursor,
    initialPageParam: cursor,
  });

  const loadMore = useCallback(() => {
    if (hasNextPage === false || isFetching) {
      return;
    }
    fetchNextPage();
  }, [fetchNextPage, hasNextPage, isFetching]);

  const friends = data?.pages.map(({ invitations }) => invitations).flat();

  return { data: friends, loadMore, isFetching, hasNextPage };
}
