import { postGroupMember } from "@/remote/group";
import { useMutation } from "@tanstack/react-query";

export default function useReport({
  groupId,
  friendIds,
  onSuccess,
}: {
  groupId: string;
  friendIds: string[] | null;
  onSuccess: (data: { message: string }) => void;
}) {
  return useMutation({
    mutationKey: ["report"],
    mutationFn: () => postGroupMember({ groupId, userIds: friendIds }),
    onSuccess: (data: { message: string }) => onSuccess(data),
  });
}
