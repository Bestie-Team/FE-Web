"use client";
import React from "react";
import LightyIcon from "./shared/Icon/LightyIcon";
import Tooltip from "./shared/Tooltip/Tooltip";
import Button from "./shared/Button/Button";
import clsx from "clsx";
import LargeLightyLogo from "./shared/Icon/LargeLightyLogo";
import oAuthButtons from "@/constants/oAuthButtons";
import { postLogin } from "@/remote/auth";
import { useGoogleLogin } from "@react-oauth/google";
import { toast } from "react-toastify";
import { useAuth } from "./shared/providers/AuthProvider";
import usePatchProfileImage from "./my/hooks/usePatchProfileImage";

export default function Splash() {
  const { login } = useAuth();
  const { mutate: patchProfileImage } = usePatchProfileImage({
    onError: (error) => console.log(error),
  });
  const googleLogin = useGoogleLogin({
    onSuccess: async (credentialResponse) => {
      const user_info = await postLogin({
        accessToken: credentialResponse.access_token,
      });
      if (user_info) {
        login(user_info?.accessToken, {
          profileImageUrl: user_info?.profileImageUrl,
          accountId: user_info?.accountId,
        });
        if (user_info?.profileImageUrl) {
          patchProfileImage({ profileImageUrl: user_info?.profileImageUrl });
        }
      }
    },
    onError: (error) => {
      console.log(error);
      toast.error("로그인에 실패했어요");
    },
  });

  return (
    <div className={styles.splashContainer}>
      <div className={styles.centerWrapper}>
        <div className="flex flex-col items-center gap-[4px]">
          <div className="text-B3 text-base-white mt-[200px]">
            소중한 당신의 추억을 빛내줄
          </div>
          <LargeLightyLogo />
        </div>
        <LightyIcon width="22.4" height="22.4" />
      </div>
      <div className={styles.buttonContainer}>
        <div className={styles.loginButtonWrapper}>
          <Tooltip
            direction="bottom"
            title="SNS로 간편하게 시작하기"
            color="#686868"
            closeButton={false}
            className="py-[8px] !px-[12px] rounded-[8px]"
          />
          {oAuthButtons.map(({ color, provider, label, icon }, idx) => (
            <Button
              key={idx}
              className={clsx(styles.oAuthButton)}
              onClick={() => {
                googleLogin();
                console.log(provider);
              }}
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
        </div>
        <div className={styles.textWrapper}>
          <span>가입 시</span>
          <span className={styles.text}>이용약관</span>
          <span>및 </span>
          <span className={styles.text}>개인정보처리방침</span>
          <span>에 동의하게 됩니다.</span>
        </div>
      </div>
    </div>
  );
}

const styles = {
  oAuthButton:
    "w-full h-[50px] flex items-center justify-center gap-3 px-6 py-4 rounded-full hover:animate-shrink-grow-less",
  loginButtonWrapper: "flex flex-col justify-center items-center gap-3",
  buttonContainer:
    "flex flex-col gap-[26.5px] px-5 mb-[55px] text-grayscale-900 text-T5",

  textWrapper: "text-C5 text-base-white flex justify-center gap-1 h-[14px]",
  centerWrapper: "flex flex-col gap-[26px] items-center text-base-white",

  splashContainer:
    "mx-auto w-full h-screen flex flex-col justify-between bg-cover bg-center bg-no-repeat h-screen bg-[url('https://cdn.lighty.today/bg.png')]",

  text: "border-b-[1px] border-b-grayscale-10",
};
