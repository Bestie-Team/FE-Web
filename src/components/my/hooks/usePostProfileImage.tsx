import { postProfileImage } from "@/remote/profile";
import { useMutation } from "@tanstack/react-query";

export default function usePostProfileImage({
  onSuccess,
  onError,
}: {
  onSuccess: (imageUrl: string) => void;
  onError: (error: Error) => void;
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
    onError: (error: Error) => onError(error),
  });
}
