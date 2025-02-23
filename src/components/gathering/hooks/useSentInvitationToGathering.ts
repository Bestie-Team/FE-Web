import { getSentInvitationToGatheringList } from "@/remote/gathering";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useCallback } from "react";
import * as lighty from "lighty-type";
import { v4 as uuidv4 } from "uuid";
import { maxDate, minDate } from "@/constants/time";

const uuid = uuidv4();

export default function useSentInvitationToGathering() {
  // const cursor = { createdAt: new Date().toISOString(), id: uuid };

  const { data, hasNextPage, fetchNextPage, isFetching } = useInfiniteQuery({
    queryKey: ["sent", "gathering/invitation"],
    queryFn: async ({
      pageParam: cursor,
    }): Promise<lighty.SentGatheringInvitationListResponse> => {
      return getSentInvitationToGatheringList({
        cursor:
          cursor === null
            ? { createdAt: new Date().toISOString(), id: uuid }
            : cursor,
        limit: 10,
        minDate: minDate(),
        maxDate: maxDate(),
      });
    },
    getNextPageParam: (lastPage) => lastPage?.nextCursor,
    initialPageParam: null as { createdAt: string; id: string } | null,
    refetchInterval: 60 * 1000,
    staleTime: 3600 * 24000,
  });

  const loadMore = useCallback(() => {
    if (hasNextPage === false || isFetching) {
      return;
    }
    fetchNextPage();
  }, [fetchNextPage, hasNextPage, isFetching]);

  const friends = data?.pages.map(({ invitations }) => invitations).flat();
  console.log(data);
  return { data: friends, loadMore, isFetching, hasNextPage };
}
