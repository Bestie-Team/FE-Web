import { postRejectFriend } from "@/remote/friends";
import { useMutation } from "@tanstack/react-query";

export default function useRejectFriendRequest({
  friendId,
  onSuccess,
}: {
  friendId: string;
  onSuccess: () => void;
}) {
  return useMutation({
    mutationKey: ["reject", "friend/request", friendId],
    mutationFn: () => {
      return postRejectFriend({ friendId });
    },
    onSuccess: () => {
      onSuccess();
    },
  });
}
