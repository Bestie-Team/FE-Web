import { getGroups } from "@/remote/group";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useCallback } from "react";

export default function useNotification() {
  const { data, hasNextPage, fetchNextPage, isFetching } = useInfiniteQuery({
    queryKey: ["notification"],
    queryFn: ({ pageParam: cursor }) => getGroups({ cursor, limit: 5 }),
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    initialPageParam: new Date().toISOString(),
  });

  const loadMore = useCallback(() => {
    if (hasNextPage === false || isFetching) {
      return;
    }
    fetchNextPage();
  }, [fetchNextPage, hasNextPage, isFetching]);

  const groups = data?.pages.map(({ groups }) => groups).flat();
  console.log(data);
  return { data: groups, loadMore, isFetching, hasNextPage };
}
