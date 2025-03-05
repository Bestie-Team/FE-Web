import { patchNotification } from "@/remote/notification";
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
      console.log(data);
    },
    onError: (error) => console.log(error),
  });
}
