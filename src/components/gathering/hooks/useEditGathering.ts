import { GatheringDetailResponse } from "@/models/gathering";
import { patchGathering } from "@/remote/gathering";
import { useMutation } from "@tanstack/react-query";

export default function useEditGathering({
  gathering,
  gatheringId,
  onSuccess,
  onError,
}: {
  gathering: GatheringDetailResponse;
  gatheringId: string;
  onSuccess: (data: { message: string }) => void;
  onError: (error: Error) => void;
}) {
  return useMutation({
    mutationKey: ["edit/gathering", gatheringId],
    mutationFn: async () => {
      const result = await patchGathering({ gathering, gatheringId });
      if (!result) {
        throw new Error("Failed making gathering feed");
      }
      return result;
    },
    onSuccess: (data: { message: string }) => onSuccess(data),
    onError: (error) => onError(error),
  });
}
