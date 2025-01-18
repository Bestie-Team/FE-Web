import { handleProfileImageUpdate } from "@/remote/profile";
import { useMutation } from "@tanstack/react-query";

export default function useUpdateProfile({
  file,
  onError,
}: {
  file: File | null;
  onError: (error: Error) => void;
}) {
  return useMutation({
    mutationKey: ["update/profile", file?.name],
    mutationFn: async () => {
      if (file == null) throw new Error("업로드할 파일이 없습니다.");
      else {
        console.log(file);
        return await handleProfileImageUpdate({ file });
      }
    },
    onError: (error: Error) => onError(error),
  });
}
