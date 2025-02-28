import { displayFeed } from "@/remote/feed";
import { useMutation } from "@tanstack/react-query";

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
    onError: (error) => console.log(error),
  });
}
