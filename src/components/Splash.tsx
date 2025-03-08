"use client";
import LightyIcon from "./shared/Icon/LightyIcon";
import Tooltip from "./shared/Tooltip/Tooltip";
import Button from "./shared/Button/Button";
import clsx from "clsx";
import LargeLightyLogo from "./shared/Icon/LargeLightyLogo";
import oAuthButtons, { Providers } from "@/constants/oAuthButtons";
import { postLogin } from "@/remote/auth";
import { useGoogleLogin } from "@react-oauth/google";
import { useAuth } from "./shared/providers/AuthProvider";
import { lightyToast } from "@/utils/toast";
import { useCallback, useEffect } from "react";
import Flex from "./shared/Flex";

const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY}&redirect_uri=${process.env.NEXT_PUBLIC_REDIRECT_URI}&prompt=select_account`;

export default function Splash() {
  const { login } = useAuth();

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

  const googleLoginMobile = () =>
    window.ReactNativeWebView?.postMessage(
      JSON.stringify({ type: "GOOGLE_LOGIN" })
    );

  const kakaoLoginMobile = () =>
    window.ReactNativeWebView?.postMessage(
      JSON.stringify({ type: "KAKAO_LOGIN" })
    );

  const loginHandler = (provider: Providers) => {
    if (provider === "google") {
      if (window.ReactNativeWebView) {
        googleLoginMobile();
      } else {
        googleLogin();
      }
    }
    if (provider === "kakao") {
      if (window.ReactNativeWebView) {
        kakaoLoginMobile();
      } else {
        window.location.href = KAKAO_AUTH_URL;
      }
    }
  };

  useEffect(() => {
    const handleMessage = async (event: MessageEvent<string>) => {
      let data = event.data;
      if (typeof event.data !== "string") {
        data = JSON.stringify(event.data);
      }
      const message: { type: string; token: string } = JSON.parse(data);

      if (message.type === "GOOGLE_LOGIN_SUCCESS") {
        handleLoginSuccess(message.token, "google");
      }
      if (message.type === "KAKAO_LOGIN_SUCCESS") {
        handleLoginSuccess(message.token, "kakao");
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [handleLoginSuccess]);

  return (
    <Flex
      direction="column"
      justify="space-between"
      className={styles.splashContainer}
    >
      <Flex direction="column" className={styles.centerWrapper}>
        <Flex direction="column" align="center" className="gap-1">
          <div className="text-B3 text-base-white mt-[200px]">
            소중한 당신의 추억을 빛내줄
          </div>
          <LargeLightyLogo />
        </Flex>
        <LightyIcon width="22.4" height="22.4" />
      </Flex>
      <Flex direction="column" className={styles.buttonContainer}>
        <Flex
          direction="column"
          justify="center"
          align="center"
          className={styles.loginButtonWrapper}
        >
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
              <object
                width={24}
                height={24}
                className="rounded-full"
                data={icon}
              />
              <span className="w-[120px] text-center">{label}</span>
            </Button>
          ))}
        </Flex>
        <div className={styles.textWrapper}>
          <span>가입 시</span>
          <span className={styles.text}>이용약관</span>
          <span>및 </span>
          <span className={styles.text}>개인정보처리방침</span>
          <span>에 동의하게 됩니다.</span>
        </div>
      </Flex>
    </Flex>
  );
}

const styles = {
  oAuthButton:
    "w-full h-[50px] flex items-center justify-center gap-3 px-6 py-4 rounded-full hover:animate-shrink-grow-less",
  loginButtonWrapper: "gap-3",
  buttonContainer: "gap-[26.5px] px-5 mb-[55px] text-grayscale-900 text-T5",

  textWrapper: "text-C5 text-base-white flex justify-center gap-1 h-[14px]",
  centerWrapper: "gap-[26px] items-center text-base-white",

  splashContainer:
    "mx-auto w-full min-h-dvh bg-cover bg-center bg-no-repeat h-screen bg-[url('https://cdn.lighty.today/bg.png')]",

  text: "border-b-[1px] border-b-grayscale-10",
};
