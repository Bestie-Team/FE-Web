import { postRejectFriend } from "@/remote/friends";
import { useMutation } from "@tanstack/react-query";

export default function useRejectFriendRequest({
  friendId,
  onSuccess,
}: {
  friendId: string;
  onSuccess: (data: { message: string }) => void;
}) {
  return useMutation({
    mutationKey: ["reject", "friend/request", friendId],
    mutationFn: () => {
      return postRejectFriend({ friendId });
    },
    onSuccess: (data: { message: string }) => {
      onSuccess(data);
    },
  });
}
