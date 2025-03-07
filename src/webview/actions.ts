import { WEBVIEW_EVENT } from "@/webview/types";

export const googleLoginMobile = () =>
  window.ReactNativeWebView?.postMessage(
    JSON.stringify({ type: WEBVIEW_EVENT.GOOGLE_LOGIN })
  );

export const kakaoLoginMobile = () =>
  window.ReactNativeWebView?.postMessage(
    JSON.stringify({ type: WEBVIEW_EVENT.KAKAO_LOGIN })
  );

export const requestNotificationPermission = () =>
  window.ReactNativeWebView?.postMessage(
    JSON.stringify({ type: WEBVIEW_EVENT.NOTIFICATION_PERMISSION_REQUEST })
  );

export const requestCameraPermission = () =>
  window.ReactNativeWebView?.postMessage(
    JSON.stringify({ type: WEBVIEW_EVENT.CAMERA_PERMISSION_REQUEST })
  );
