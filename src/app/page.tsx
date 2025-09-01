"use client";
import LogIn from "@/components/LogIn";
import Flex from "@/components/shared/Flex";
import { LargeLightyLogo } from "@/components/shared/Icon/LargeLightyLogo";
import LightyIcon from "@/components/shared/Icon/LightyIcon";
import { useAuth } from "@/components/shared/providers/AuthProvider";
import { useReactNativeWebView } from "@/components/shared/providers/ReactNativeWebViewProvider";
import { openPrivacyPolicyMobile, openTermsMobile } from "@/webview/actions";
import { Suspense } from "react";

export default function Page() {
  const { isAuthenticated } = useAuth();
  const { isReactNativeWebView } = useReactNativeWebView();

  const openTermsPage = () => {
    if (isReactNativeWebView) {
      openTermsMobile();
    }
  };

  const openPrivacyPolicyPage = () => {
    if (isReactNativeWebView) {
      openPrivacyPolicyMobile();
    }
  };

  if (isAuthenticated) return null;

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
          <Suspense>
            <LogIn />
          </Suspense>
          <div className={styles.textWrapper}>
            <span>가입 시</span>
            <span className={styles.text} onClick={openTermsPage}>
              이용약관
            </span>
            <span>및 </span>
            <span className={styles.text} onClick={openPrivacyPolicyPage}>
              개인정보처리방침
            </span>
            <span>에 동의하게 됩니다.</span>
          </div>
        </Flex>
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
