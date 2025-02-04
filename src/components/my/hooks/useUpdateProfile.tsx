import { patchProfileAccountId, patchProfileImage } from "@/remote/profile";
import { useMutation } from "@tanstack/react-query";

export default function useUpdateProfile({
  onSuccess,
  onError,
}: {
  onSuccess: (data: { message: string }) => void;
  onError: (error: Error) => void;
}) {
  return useMutation({
    mutationKey: ["update/profile"],
    mutationFn: async ({
      profileImageUrl,
      accountId,
    }: {
      profileImageUrl: string;
      accountId: string;
    }) => {
      if (profileImageUrl == null)
        throw new Error("업로드할 이미지 url이 없습니다.");
      try {
        await patchProfileImage(profileImageUrl);
        return await patchProfileAccountId({ accountId });
      } catch (error) {
        throw new Error(
          error instanceof Error
            ? error.message
            : "프로필 업데이트 중 오류가 발생했습니다."
        );
      }
    },

    onSuccess: (data: { message: string }) => onSuccess(data),
    onError: (error: Error) => onError(error),
  });
}
