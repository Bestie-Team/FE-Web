import { getSearchFriends } from "@/remote/friends";
import { useQuery } from "@tanstack/react-query";
import * as lighty from "lighty-type";

export default function useSearchFriends({
  name,
  accountId,
  limit,
  search,
}: {
  name: string;
  accountId: string;
  limit: number;
  search: string;
}) {
  return useQuery({
    queryKey: ["friends", { name, accountId, limit, search }],
    queryFn: (): Promise<lighty.FriendListResponse | undefined> => {
      return getSearchFriends({ name, accountId, limit, search });
    },
    staleTime: 0,
  });
}
