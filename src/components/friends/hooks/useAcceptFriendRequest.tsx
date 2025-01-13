import { postAcceptFriend } from "@/remote/friends";
import { useMutation } from "@tanstack/react-query";

export default function useAcceptFriendRequest({
  friendId,
}: {
  friendId: string;
}) {
  return useMutation({
    mutationKey: ["accept", "friend/request", friendId],
    mutationFn: () => {
      return postAcceptFriend({ friendId });
    },
  });
}
