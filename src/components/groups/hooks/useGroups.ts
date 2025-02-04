import { getGroups } from "@/remote/group";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useCallback } from "react";

export default function useGroup() {
  const { data, hasNextPage, fetchNextPage, isFetching } = useInfiniteQuery({
    queryKey: ["groups"],
    queryFn: () => getGroups({ cursor: new Date().toISOString(), limit: 20 }),
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    initialPageParam: new Date().toISOString(),
    refetchOnWindowFocus: "always",
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
