import { postFriendsFeed } from "@/remote/feed";
import { useMutation } from "@tanstack/react-query";
import * as lighty from "lighty-type";

export default function useMakeFriendsFeed({
  feedRequest,
  onSuccess,
  onError,
}: {
  feedRequest: lighty.CreateFriendFeedRequest;
  onSuccess: (data: { message: string }) => void;
  onError: (error: Error) => void;
}) {
  return useMutation({
    mutationKey: ["make/feed/friends", feedRequest.content],
    mutationFn: async () => {
      const result = await postFriendsFeed({ friendsFeed: feedRequest });
      if (!result) {
        throw new Error("Failed making friends feed");
      }
      return result;
    },
    onSuccess: (data: { message: string }) => onSuccess(data),
    onError: (error) => onError(error),
  });
}
