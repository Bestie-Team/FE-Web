import { displayFeed } from "@/remote/feed";
import { lightyToast } from "@/utils/toast";
import { useMutation } from "@tanstack/react-query";

export default function useDisplayFeed({ feedId }: { feedId: string }) {
  return useMutation({
    mutationKey: ["display/feed", feedId],
    mutationFn: async () => await displayFeed({ feedId }),
    onSuccess: (data: { message: string }) => lightyToast.success(data.message),
    onError: (error) => console.log(error),
  });
}
