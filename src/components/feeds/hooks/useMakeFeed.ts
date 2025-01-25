import { postGatheringFeed } from "@/remote/feed";
import { useMutation } from "@tanstack/react-query";
import * as lighty from "lighty-type";

export default function useMakeGatheringFeed({
  feedRequest,
  onSuccess,
  onError,
}: {
  feedRequest: lighty.CreateGatheringFeedRequest;
  onSuccess: (data: { message: string }) => void;
  onError: (error: Error) => void;
}) {
  return useMutation({
    mutationKey: [
      "make/feed/gathering",
      feedRequest.gatheringId,
      feedRequest.content,
    ],
    mutationFn: async () => {
      const result = await postGatheringFeed({ gatheringFeed: feedRequest });
      if (!result) {
        throw new Error("Failed making gathering feed");
      }
      return result;
    },
    onSuccess: (data: { message: string }) => onSuccess(data),
    onError: (error) => onError(error),
  });
}
