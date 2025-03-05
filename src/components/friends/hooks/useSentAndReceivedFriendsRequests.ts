import { useQuery } from "@tanstack/react-query";
import {
  getSentFriendRequestsList,
  getReceivedFriendRequestsList,
} from "@/remote/friends";

export default function useSentAndReceivedFriendsRequests({
  name,
  accountId,
  limit,
}: {
  name: string;
  accountId: string;
  limit: number;
}) {
  return useQuery({
    queryKey: ["sentAndReceived", "friendsRequests", { accountId, limit }],
    queryFn: async () => {
      const [sentResponse, receivedResponse] = await Promise.all([
        getSentFriendRequestsList({ name, accountId, limit }),
        getReceivedFriendRequestsList({ name, accountId, limit }),
      ]);

      return {
        sent: sentResponse,
        received: receivedResponse,
      };
    },
  });
}
