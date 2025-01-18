import { uploadFeedImages } from "@/remote/feed";
import { useMutation } from "@tanstack/react-query";

export default function useUploadFeedImages({
  files,
  gatheringId,
  onSuccess,
}: {
  files: File[];
  gatheringId: string;
  onSuccess: (data: { imageUrls: string[]; message: string }) => void;
}) {
  return useMutation({
    mutationKey: ["upload", "feed/images", gatheringId],
    mutationFn: async () => {
      const result = await uploadFeedImages({ files });
      if (!result) {
        throw new Error("Upload failed");
      }
      return result;
    },
    onSuccess: (data: { imageUrls: string[]; message: string }) => {
      onSuccess(data);
    },
  });
}
