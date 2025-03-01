import { getGatherings } from "@/remote/gathering";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useCallback } from "react";
import { v4 as uuidv4 } from "uuid";
const uuid = uuidv4();

/** 첫 커서는 minDate */
export default function useGatherings({
  cursor,
  limit,
  minDate,
  maxDate,
}: {
  cursor?: { createdAt: string };
  limit: number;
  minDate: string;
  maxDate: string;
}) {
  const defaultCursor = cursor;
  const { data, hasNextPage, fetchNextPage, isFetching } = useInfiniteQuery({
    queryKey: ["gatherings", minDate, maxDate],
    queryFn: ({ pageParam: cursor }) =>
      getGatherings({
        cursor: cursor
          ? { ...cursor, id: uuid }
          : { createdAt: maxDate, id: uuid },
        limit,
        minDate,
        maxDate,
      }),
    getNextPageParam: (lastPage) => lastPage?.nextCursor,
    initialPageParam: defaultCursor,
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
