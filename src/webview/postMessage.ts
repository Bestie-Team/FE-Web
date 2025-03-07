import type { EventName } from "@/webview/types";

export const postMessage = (eventName: EventName) =>
  window.ReactNativeWebView?.postMessage(JSON.stringify({ type: eventName }));
