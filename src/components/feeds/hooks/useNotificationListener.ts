import { useEffect } from "react";
import { patchNotificationToken } from "@/remote/users";
import { requestNotificationPermission } from "@/webview/actions";
import { WEBVIEW_EVENT } from "@/webview/types";

export function useNotificationListener() {
  useEffect(() => {
    requestNotificationPermission();

    const handleMessage = (event: MessageEvent<string>) => {
      const data =
        typeof event.data === "string"
          ? event.data
          : JSON.stringify(event.data);
      const message: { type: string; notificationToken: string | null } =
        JSON.parse(data);

      if (
        message.type === WEBVIEW_EVENT.AGREE_NOTIFICATION_PERMISSION &&
        message.notificationToken
      ) {
        patchNotificationToken({ token: message.notificationToken });
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);
}
