"use client";
import Button from "./shared/Button/Button";
import clsx from "clsx";
import oAuthButtons, { Providers } from "@/constants/oAuthButtons";
import { postLogin } from "@/remote/auth";
import { useGoogleLogin } from "@react-oauth/google";
import { useAuth } from "./shared/providers/AuthProvider";
import { lightyToast } from "@/utils/toast";
import { useCallback, useEffect } from "react";
import { WEBVIEW_EVENT } from "@/webview/types";
import {
  appleLoginMobile,
  googleLoginMobile,
  kakaoLoginMobile,
} from "@/webview/actions";
import Tooltip from "./shared/Tooltip/Tooltip";
import { useReactNativeWebView } from "./shared/providers/ReactNativeWebViewProvider";

const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY}&redirect_uri=${process.env.NEXT_PUBLIC_REDIRECT_URI}&prompt=select_account`;

export default function LogIn() {
  const { login } = useAuth();
  const { isReactNativeWebView } = useReactNativeWebView();

  const handleLoginSuccess = useCallback(
    async (accessToken: string, provider: Providers) => {
      try {
        const userInfo = await postLogin({ accessToken, provider });
        if (userInfo) login(userInfo);
      } catch (error) {
        console.error(error);
        lightyToast.error("로그인에 실패했어요");
      }
    },
    [login]
  );

  const googleLogin = useGoogleLogin({
    onSuccess: (credentialResponse) =>
      handleLoginSuccess(credentialResponse.access_token, "google"),
    onError: () => lightyToast.error("로그인에 실패했어요"),
  });

  const loginHandler = (provider: Providers) => {
    if (provider === "google") {
      if (isReactNativeWebView && window.ReactNativeWebView) {
        googleLoginMobile();
      } else {
        googleLogin();
      }
    }
    if (provider === "kakao") {
      if (isReactNativeWebView && window.ReactNativeWebView) {
        kakaoLoginMobile();
      } else {
        window.location.href = KAKAO_AUTH_URL;
      }
    }
    if (provider === "apple" && isReactNativeWebView) {
      appleLoginMobile();
    }
  };

  useEffect(() => {
    const handleMessage = async (event: MessageEvent<string>) => {
      let data = event.data;
      if (typeof event.data !== "string") {
        data = JSON.stringify(event.data);
      }
      const message: { type: string; token: string } = JSON.parse(data);

      if (message.type === WEBVIEW_EVENT.GOOGLE_LOGIN_SUCCESS) {
        handleLoginSuccess(message.token, "google");
      }
      if (message.type === WEBVIEW_EVENT.KAKAO_LOGIN_SUCCESS) {
        handleLoginSuccess(message.token, "kakao");
      }
      if (message.type === WEBVIEW_EVENT.APPLE_LOGIN_SUCCESS) {
        handleLoginSuccess(message.token, "apple");
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [handleLoginSuccess]);

  return (
    <>
      <Tooltip
        direction="bottom"
        title="SNS로 간편하게 시작하기"
        color="#686868"
        closeButton={false}
        className="py-2 !px-3 rounded-lg"
      />
      {oAuthButtons.map(({ color, provider, label, icon }, idx) => (
        <Button
          key={idx}
          className={clsx(styles.oAuthButton)}
          onClick={() => loginHandler(provider)}
          color={color}
        >
          <object width={24} height={24} className="rounded-full" data={icon} />
          <span className="w-[120px] text-center">{label}</span>
        </Button>
      ))}
    </>
  );
}
const styles = {
  oAuthButton:
    "w-full h-[50px] flex items-center justify-center gap-3 px-6 py-4 rounded-full hover:animate-shrink-grow-less",
};
