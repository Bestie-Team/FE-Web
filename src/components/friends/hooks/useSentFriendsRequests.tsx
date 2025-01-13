import { getSentFriendRequestsList } from "@/remote/friends";
import { useQuery } from "@tanstack/react-query";

export default function useSentFriendsRequests({
  name,
  accountId,
  limit,
}: {
  name: string;
  accountId: string;
  limit: number;
}) {
  return useQuery({
    queryKey: ["received", "friendsRequests", { name, accountId, limit }],
    queryFn: () => {
      return getSentFriendRequestsList({ name, accountId, limit });
    },
  });
}
