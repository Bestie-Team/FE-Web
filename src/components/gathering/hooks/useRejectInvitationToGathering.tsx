import { postRejectGatheringInvitation } from "@/remote/gathering";
import { useMutation } from "@tanstack/react-query";

export default function useRejectInvitationToGathering({
  invitationId,
}: {
  invitationId: string;
}) {
  return useMutation({
    mutationKey: ["reject", "gathering/invitation", invitationId],
    mutationFn: () => postRejectGatheringInvitation({ invitationId }),
  });
}
