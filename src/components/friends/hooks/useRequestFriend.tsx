import { postFriends } from "@/remote/friends";
import { useMutation } from "@tanstack/react-query";

export default function useRequestFriend({ userId }: { userId: string }) {
  return useMutation({
    mutationKey: ["request/friend", userId],
    mutationFn: async () => {
      return await postFriends({ userId });
    },
  });
}
