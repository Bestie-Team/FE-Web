import { postProfileImage } from "@/remote/profile";
import { lightyToast } from "@/utils/toast";
import { useMutation } from "@tanstack/react-query";

export default function usePostProfileImage({
  onSuccess,
}: {
  onSuccess: (imageUrl: string) => void;
}) {
  return useMutation({
    mutationKey: ["post/profile"],
    mutationFn: async ({ file }: { file: File | null }) => {
      if (file == null) throw new Error("업로드할 파일이 없습니다.");
      else {
        console.log(file);
        return await postProfileImage({ file });
      }
    },
    onSuccess: (data: { imageUrl: string }) => onSuccess(data.imageUrl),
    onError: (error: Error) => lightyToast.error(error.message),
  });
}
