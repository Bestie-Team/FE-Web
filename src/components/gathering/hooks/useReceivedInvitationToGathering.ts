import * as lighty from "lighty-type";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useCallback } from "react";
import { v4 as uuidv4 } from "uuid";
import { getReceivedInvitationToGatheringList } from "@/remote/gathering";
import { maxDate, minDate } from "@/constants/time";

const uuid = uuidv4();

export default function useReceivedInvitationToGathering() {
  const cursor = { createdAt: new Date().toISOString(), id: uuid };
  const { data, hasNextPage, fetchNextPage, isFetching } = useInfiniteQuery({
    queryKey: ["received", "gathering/invitation"],
    queryFn: async ({
      pageParam: cursor,
    }): Promise<lighty.ReceivedGatheringInvitationListResponse> => {
      return getReceivedInvitationToGatheringList({
        cursor,
        limit: 4,
        minDate: minDate(),
        maxDate: maxDate(),
      });
    },
    getNextPageParam: (lastPage) => lastPage?.nextCursor,
    initialPageParam: cursor,
    refetchInterval: 60 * 1000,
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
