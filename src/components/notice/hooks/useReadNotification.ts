import { patchNotification } from "@/remote/notification";
import { useMutation } from "@tanstack/react-query";
import { logger } from "@/utils/logger";

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
      logger.debug("Notification marked as read", data);
    },
    onError: (error) => logger.error("Failed to mark notification read", error),
  });
}
