import React from "react";
import LightyIcon from "./shared/icons/LightyIcon";
import Tooltip from "./shared/tootlips/Tooltip";
import Button from "./shared/buttons/Button";
import Image from "next/image";
import clsx from "clsx";

export default function Splash() {
  return (
    <div className="mx-auto w-full flex flex-col justify-between bg-cover bg-center bg-no-repeat h-screen bg-[url('/images/bg.png')]">
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
          <Button className={clsx(oAuthButtonStyle, "bg-[#FAE300]")}>
            <Image
              width={24}
              height={24}
              className="rounded-full"
              src="/images/kakao.svg"
              alt="kakao"
            />
            <span>카카오로 계속하기</span>
          </Button>
          <Button className={clsx(oAuthButtonStyle, "bg-base-white")}>
            <Image
              width={24}
              height={24}
              className="rounded-full"
              src="/images/apple.svg"
              alt="apple"
            />
            <span>Apple로 계속하기</span>
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

function LargeLightyLogo() {
  return (
    <svg
      width="140"
      height="54"
      viewBox="0 0 140 54"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="Frame 1321315634">
        <g id="Group 1">
          <g id="Lighty">
            <path
              id="Vector"
              d="M110.796 21.5008H115.458L106.966 42.4168H102.556L105.227 35.8648L99.4055 21.5008H104.37L107.57 30.6232L110.796 21.5008Z"
              fill="white"
            />
            <path
              id="Vector_2"
              d="M98.4712 21.5008V25.3564H95.548V36.268H91.0624V25.3564H88.1392V21.5008H91.0624V17.116H95.548V21.5008H98.4712Z"
              fill="white"
            />
            <path
              id="Vector_3"
              d="M72.2224 36.268V15.1H76.708V23.0128C77.59 21.8284 78.9508 21.148 80.8408 21.148C84.268 21.148 86.6116 23.6428 86.6116 27.7252V36.268H82.126V28.4812C82.126 26.2384 81.2188 25.0036 79.5304 25.0036C77.7664 25.0036 76.708 26.3896 76.708 28.6828V36.268H72.2224Z"
              fill="white"
            />
            <path
              id="Vector_4"
              d="M61.2263 42.7696C56.8415 42.7696 54.4223 40.2748 53.9435 37.4272H58.4795C58.7063 38.3848 59.5631 38.9896 61.2263 38.9896C63.0911 38.9896 64.3512 37.78 64.3512 35.9404V34.378C63.4692 35.5624 62.058 36.2428 60.1175 36.2428C55.8839 36.2428 52.9355 33.0928 52.9355 28.7584C52.9355 24.3484 55.8839 21.148 60.1175 21.148C62.058 21.148 63.4692 21.8284 64.3512 23.0128V21.5008H68.8368V35.9908C68.8368 39.9976 65.6363 42.7696 61.2263 42.7696ZM60.8231 32.5384C63.0155 32.5384 64.4268 30.9508 64.4268 28.7584C64.4268 26.566 63.0155 24.9784 60.8231 24.9784C58.6811 24.9784 57.3203 26.566 57.3203 28.7584C57.3203 30.9508 58.6811 32.5384 60.8231 32.5384Z"
              fill="white"
            />
            <path
              id="Vector_5"
              d="M48.084 14.3692C49.6716 14.3692 50.8308 15.5284 50.8308 17.116C50.8308 18.7036 49.6716 19.8628 48.084 19.8628C46.4964 19.8628 45.3372 18.7036 45.3372 17.116C45.3372 15.5284 46.4964 14.3692 48.084 14.3692ZM50.3268 21.5008V36.3184H45.8412V21.5008H50.3268Z"
              fill="white"
            />
            <path
              id="Vector_6"
              d="M28.8145 15.73H33.4009V32.2108H43.6573V36.268H28.8145V15.73Z"
              fill="white"
            />
          </g>
        </g>
      </g>
    </svg>
  );
}

const oAuthButtonStyle =
  "w-full h-[50px] flex items-center justify-center gap-3 px-6 py-4 rounded-full";

const loginButtonWrapperStyle =
  "flex flex-col justify-center items-center gap-3";

const buttonContainerStyle =
  "flex flex-col gap-[26.5px] px-[20px] mb-[55px] text-grayscale-900 text-T5";

const textWrapperStyle =
  "text-C5 text-base-white flex justify-center gap-[4px] h-[14px]";

const centerWrapperStyle =
  "flex flex-col gap-[26px] items-center text-base-white";
