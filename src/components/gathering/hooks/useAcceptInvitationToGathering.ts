import { SuccessResponse } from "@/models/response";
import { postAcceptGatheringInvitation } from "@/remote/gathering";
import { useMutation } from "@tanstack/react-query";

export default function useAcceptInvitationToGathering({
  invitationId,
  onSuccess,
}: {
  invitationId: string;
  onSuccess: (data: SuccessResponse) => void;
}) {
  return useMutation({
    mutationKey: ["accept", "invitation", invitationId],
    mutationFn: () => postAcceptGatheringInvitation({ invitationId }),
    onSuccess: (data: SuccessResponse) => onSuccess(data),
  });
}
