import { postGatheringInvitationImage } from "@/remote/gathering";
import { useMutation } from "@tanstack/react-query";

export default function useUploadInvitationImage({
  file,
  onSuccess,
}: {
  file: File;
  onSuccess: (data: { imageUrl: string; message: string }) => void;
}) {
  return useMutation({
    mutationKey: ["upload", "gathering/invitation", file],
    mutationFn: () => postGatheringInvitationImage({ file }),
    onSuccess: (data) => onSuccess(data),
  });
}
