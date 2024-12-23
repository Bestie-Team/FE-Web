"use client";

import React, { useEffect } from "react";
import LightyIcon from "./shared/icons/LightyIcon";
import Tooltip from "./shared/tootlips/Tooltip";
import Button from "./shared/buttons";
import clsx from "clsx";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import LargeLightyLogo from "./shared/icons/LargeLightyLogo";

export default function Splash() {
  const router = useRouter();
  const { status } = useSession();

  useEffect(() => {
    if (status === "authenticated") {
      router.replace("/home");
    }
  }, [router, status]);

  return (
    <div className="mx-auto w-full flex flex-col justify-between bg-cover bg-center bg-no-repeat h-screen bg-[url('https://d1al3w8x2wydb3.cloudfront.net/images/bg.png')]">
      <div className={centerWrapperStyle}>
        <div className="flex flex-col items-center gap-[4px]">
          <div className="text-B3 text-base-white mt-[200px]">
            소중한 당신의 추억을 빛내줄
          </div>
          <LargeLightyLogo />
        </div>
        <LightyIcon width="22.4" height="22.4" />
      </div>

      <div className={buttonContainerStyle}>
        <div className={loginButtonWrapperStyle}>
          <Tooltip
            direction="bottom"
            title="SNS로 간편하게 시작하기"
            color="#686868"
            closeButton={false}
            className="py-[8px] !px-[12px] rounded-[8px]"
          />
          <Button
            className={clsx(oAuthButtonStyle, "bg-[#FAE300]")}
            onClick={() => {
              signIn("kakao", { callbackUrl: "/home" });
            }}
          >
            <object
              width={24}
              height={24}
              className="rounded-full"
              data="https://d1al3w8x2wydb3.cloudfront.net/images/kakao.svg"
            />
            <span className="w-[120px] text-center">카카오로 계속하기</span>
          </Button>
          <Button
            className={clsx(oAuthButtonStyle, "bg-base-white")}
            onClick={() => {
              signIn("google", { callbackUrl: "/home" });
            }}
          >
            <object
              width={24}
              height={24}
              className="rounded-full"
              data="https://d1al3w8x2wydb3.cloudfront.net/images/google.svg"
            />
            <span className="w-[120px] text-center">Google로 계속하기</span>
          </Button>
        </div>
        <div className={textWrapperStyle}>
          <span>가입 시</span>
          <span className="border-b-[1px] border-b-grayscale-10">이용약관</span>
          <span>및 </span>
          <span className="border-b-[1px] border-b-grayscale-10">
            개인정보처리방침
          </span>
          <span>에 동의하게 됩니다.</span>
        </div>
      </div>
    </div>
  );
}

const oAuthButtonStyle =
  "w-full h-[50px] flex items-center justify-center gap-[12px] px-6 py-4 rounded-full";

const loginButtonWrapperStyle =
  "flex flex-col justify-center items-center gap-3";

const buttonContainerStyle =
  "flex flex-col gap-[26.5px] px-[20px] mb-[55px] text-grayscale-900 text-T5";

const textWrapperStyle =
  "text-C5 text-base-white flex justify-center gap-[4px] h-[14px]";

const centerWrapperStyle =
  "flex flex-col gap-[26px] items-center text-base-white";
