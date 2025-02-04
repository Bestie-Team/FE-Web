import { deleteGathering } from "@/remote/gathering";
import { useMutation } from "@tanstack/react-query";

export default function useDeleteGathering({
  gatheringId,
  onSuccess,
  onError,
}: {
  gatheringId: string;
  onSuccess: (data: { message: string }) => void;
  onError: (error: Error) => void;
}) {
  return useMutation({
    mutationKey: ["delete/gathering", gatheringId],
    mutationFn: () => deleteGathering({ gatheringId }),
    onSuccess: (data: { message: string }) => onSuccess(data),
    onError: (error: Error) => onError(error),
  });
}
