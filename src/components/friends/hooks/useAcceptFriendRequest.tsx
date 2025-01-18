import { postAcceptFriend } from "@/remote/friends";
import { useMutation } from "@tanstack/react-query";

export default function useAcceptFriendRequest({
  friendId,
  onSuccess,
}: {
  friendId: string;
  onSuccess: (data: { message: string }) => void;
}) {
  return useMutation({
    mutationKey: ["accept", "friend/request", friendId],
    mutationFn: () => {
      return postAcceptFriend({ friendId });
    },
    onSuccess: (data: { message: string }) => {
      onSuccess(data);
    },
  });
}
