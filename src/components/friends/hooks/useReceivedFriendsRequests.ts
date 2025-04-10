import { getReceivedFriendRequestsList } from "@/remote/friends";
import { useQuery } from "@tanstack/react-query";

export default function useReceivedFriendsRequests({
  name,
  accountId,
  limit,
}: {
  name: string;
  accountId: string;
  limit: number;
}) {
  return useQuery({
    queryKey: ["received", "friendsRequests", { accountId, limit }],
    queryFn: () => {
      return getReceivedFriendRequestsList({ name, accountId, limit });
    },
    staleTime: 5 * 60 * 1000,
  });
}
