import { postAcceptGatheringInvitation } from "@/remote/gathering";
import { useMutation } from "@tanstack/react-query";

export default function useAcceptInvitationToGathering({
  invitationId,
}: {
  invitationId: string;
}) {
  return useMutation({
    mutationKey: ["accept", "gathering/invitation", invitationId],
    mutationFn: () => postAcceptGatheringInvitation({ invitationId }),
  });
}
