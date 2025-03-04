import { patchNotification } from "@/remote/notification";
import { lightyToast } from "@/utils/toast";
import { useMutation } from "@tanstack/react-query";

export default function useReadNotification({
  onSuccess,
}: {
  onSuccess: () => void;
}) {
  return useMutation({
    mutationKey: ["read/notification"],
    mutationFn: async () => {
      const result = await patchNotification();
      if (!result) {
        throw new Error("Failed reading notification");
      }
      return result;
    },
    onSuccess: (data: { message: string }) => {
      onSuccess();
      lightyToast.success(data.message);
    },
    onError: (error) => console.log(error),
  });
}
