import { hideFeed } from "@/remote/feed";
import { useMutation } from "@tanstack/react-query";

export default function useHideFeed({
  feedId,
  onSuccess,
  onError,
}: {
  feedId: string;
  onSuccess: (data: { message: string }) => void;
  onError: (error: Error) => void;
}) {
  return useMutation({
    mutationKey: ["hide/feed/", feedId],
    mutationFn: async () => {
      const result = await hideFeed({ feedId });
      if (!result) {
        throw new Error("Failed hiding feed");
      }
      return result;
    },
    onSuccess: (data: { message: string }) => onSuccess(data),
    onError: (error) => onError(error),
  });
}
