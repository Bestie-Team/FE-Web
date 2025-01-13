import { handleProfileImageUpdate } from "@/remote/profile";
import { useMutation } from "@tanstack/react-query";

export default function useUpdateProfile() {
  return useMutation({
    mutationKey: ["update/profile"],
    mutationFn: async ({ file }: { file: File }) => {
      if (!file) throw new Error("업로드할 파일이 없습니다.");
      return await handleProfileImageUpdate({ file });
    },
  });
}
