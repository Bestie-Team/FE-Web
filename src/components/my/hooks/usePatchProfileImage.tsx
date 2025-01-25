import { patchProfileImage, postProfileImage } from "@/remote/profile";
import { useMutation } from "@tanstack/react-query";

export default function usePatchProfileImage({
  onError,
}: {
  onError: (error: Error) => void;
}) {
  return useMutation({
    mutationKey: ["patch/profile"],
    mutationFn: async ({ profileImageUrl }: { profileImageUrl: string }) => {
      if (profileImageUrl == null) throw new Error("업로드할 파일이 없습니다.");
      else {
        console.log(profileImageUrl);
        return await patchProfileImage({ profileImageUrl });
      }
    },
    onError: (error: Error) => onError(error),
  });
}
