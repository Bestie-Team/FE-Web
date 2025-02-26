import { getGroups } from "@/remote/group";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useCallback } from "react";

export default function useGroup({ limit = 6 }: { limit?: number }) {
  const { data, hasNextPage, fetchNextPage, isFetching } = useInfiniteQuery({
    queryKey: ["groups"],
    queryFn: ({ pageParam: cursor }) =>
      getGroups({
        cursor: cursor === null ? new Date().toISOString() : cursor,
        limit: limit ?? 7,
      }),
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    initialPageParam: null as string | null,
    staleTime: 5 * 60 * 1000,
  });

  const loadMore = useCallback(() => {
    if (hasNextPage === false || isFetching) {
      return;
    }
    fetchNextPage();
  }, [fetchNextPage, hasNextPage, isFetching]);

  const groups = data?.pages.map(({ groups }) => groups).flat();
  return { data: groups, loadMore, isFetching, hasNextPage };
}
