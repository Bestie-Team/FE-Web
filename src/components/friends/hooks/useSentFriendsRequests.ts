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
    queryKey: ["sent", "friendsRequests"],
    queryFn: () => {
      return getSentFriendRequestsList({ name, accountId, limit });
    },
    staleTime: 5 * 60 * 1000,
  });
}
