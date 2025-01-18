import { postMakeComment } from "@/remote/feed-comment";
import { useMutation } from "@tanstack/react-query";

export default function useMakeComment({
  feedId,
  content,
  onSuccess,
  onError,
}: {
  feedId: string;
  content: string;
  onSuccess: (data: { message: string }) => void;
  onError: (error: Error) => void;
}) {
  return useMutation({
    mutationKey: ["make/comments", feedId, content],
    mutationFn: async () => {
      const result = await postMakeComment({ feedId, content });
      if (!result) {
        throw new Error("Failed making gathering feed");
      }
      return result;
    },
    onSuccess: (data: { message: string }) => onSuccess(data),
    onError: (error) => onError(error),
  });
}
