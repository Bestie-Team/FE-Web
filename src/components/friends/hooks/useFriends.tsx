import { getFriends } from "@/remote/friends";
import { useQuery } from "@tanstack/react-query";
import * as lighty from "lighty-type";

export default function useFriends({
  name,
  accountId,
  limit,
}: {
  name: string;
  accountId: string;
  limit: number;
}) {
  return useQuery({
    queryKey: ["friends", { name, accountId, limit }],
    queryFn: (): Promise<lighty.FriendListResponse> => {
      return getFriends({ name, accountId, limit });
    },
  });
}
