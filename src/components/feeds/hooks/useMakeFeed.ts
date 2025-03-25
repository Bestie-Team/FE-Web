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
    mutationFn: async () =>
      await postGatheringFeed({ gatheringFeed: feedRequest }),
    onSuccess: (data: { message: string }) => {
      console.log(feedRequest);
      onSuccess(data);
    },
    onError: (error) => onError(error),
  });
}
