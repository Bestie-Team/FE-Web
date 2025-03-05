import * as lighty from "lighty-type";
import { getSearchUsers } from "@/remote/users";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useCallback } from "react";

export default function useSearchUsers({
  search,
  enabled,
}: {
  search: string;
  enabled: boolean;
}) {
  const {
    data,
    hasNextPage = false,
    fetchNextPage,
    isFetching,
  } = useInfiniteQuery({
    queryKey: ["users", search],
    queryFn: ({ pageParam }): Promise<lighty.SearchUserResponse> =>
      getSearchUsers({ ...pageParam, limit: 9, search }),
    getNextPageParam: (lastPage) => {
      return lastPage.nextCursor;
    },
    initialPageParam: { name: "가", accountId: "a" },
    enabled: enabled,
  });

  const loadMore = useCallback(() => {
    if (hasNextPage === false || isFetching) {
      return;
    }
    fetchNextPage();
  }, [fetchNextPage, hasNextPage, isFetching]);

  const users = data?.pages.map(({ users }) => users).flat();

  return { data: users, loadMore, isFetching, hasNextPage };
}
