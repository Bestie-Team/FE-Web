import type { EventName } from "@/webview/types";

export const postMessage = (eventName: EventName, data?: string | object) =>
  window.ReactNativeWebView?.postMessage(
    JSON.stringify({ type: eventName, data })
  );
