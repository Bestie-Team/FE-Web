import { displayFeed } from "@/remote/feed";
import { useMutation } from "@tanstack/react-query";
import { logger } from "@/utils/logger";

export default function useDisplayFeed({
  feedId,
  onSuccess,
}: {
  feedId: string;
  onSuccess: (message: string) => void;
}) {
  return useMutation({
    mutationKey: ["display/feed", feedId],
    mutationFn: async () => await displayFeed({ feedId }),
    onSuccess: (data: { message: string }) => onSuccess(data.message),
    onError: (error) => logger.error("Failed to display feed", error),
  });
}
