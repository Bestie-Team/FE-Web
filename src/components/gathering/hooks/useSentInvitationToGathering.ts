import { getSentInvitationToGatheringList } from "@/remote/gathering";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useCallback } from "react";
import * as lighty from "lighty-type";
import { v4 as uuidv4 } from "uuid";
import { maxDate, minDate } from "@/constants/time";

const uuid = uuidv4();

export default function useSentInvitationToGathering() {
  const cursor = { createdAt: new Date().toISOString(), id: uuid };

  const { data, hasNextPage, fetchNextPage, isFetching } = useInfiniteQuery({
    queryKey: ["sent", "gathering/invitation"],
    queryFn: async ({
      pageParam: cursor,
    }): Promise<lighty.GatheringInvitationListResponse> => {
      return getSentInvitationToGatheringList({
        cursor,
        limit: 20,
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

  const friends = data?.pages.map(({ invitations }) => invitations).flat();

  return { data: friends, loadMore, isFetching, hasNextPage };
}
