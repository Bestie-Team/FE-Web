import { postGroupCoverImage } from "@/remote/group";
import { useMutation } from "@tanstack/react-query";

export default function useUploadGroupCoverImage({
  file,
  onSuccess,
}: {
  file: File;
  onSuccess: (data: { url: string; message: string }) => void;
}) {
  return useMutation({
    mutationKey: ["upload/group/image", file],
    mutationFn: () => postGroupCoverImage({ file }),
    onSuccess: (data) => onSuccess(data),
  });
}
