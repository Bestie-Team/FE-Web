import { postAcceptFriend } from "@/remote/friends";
import { useMutation } from "@tanstack/react-query";

export default function useRejectFriendRequest({
  friendId,
}: {
  friendId: string;
}) {
  return useMutation({
    mutationKey: ["reject", "friend/request", friendId],
    mutationFn: () => {
      return postAcceptFriend({ friendId });
    },
  });
}
