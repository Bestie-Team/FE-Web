import { postProfileImage } from "@/remote/profile";
import { useMutation } from "@tanstack/react-query";

export default function usePostProfileImage({
  file,
  onSuccess,
  onError,
}: {
  file: File | null;
  onSuccess: (imageUrl: string) => void;
  onError: (error: Error) => void;
}) {
  return useMutation({
    mutationKey: ["post/profile", file?.name],
    mutationFn: async () => {
      if (file == null) throw new Error("업로드할 파일이 없습니다.");
      else {
        console.log(file);
        return await postProfileImage({ file });
      }
    },
    onSuccess: (imageUrl) => onSuccess(imageUrl),
    onError: (error: Error) => onError(error),
  });
}
