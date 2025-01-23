import { deleteFriend } from "@/remote/friends";
import { useMutation } from "@tanstack/react-query";

export default function useDeleteFriend({
  friendId,
  onSuccess,
}: {
  friendId: string;
  onSuccess: () => void;
}) {
  return useMutation({
    mutationKey: ["delete/friend", friendId],
    mutationFn: () => {
      return deleteFriend({ friendId });
    },
    onSuccess: () => onSuccess(),
  });
}
