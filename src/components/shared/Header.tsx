import React from "react";
import EmptySquareIcon from "./icons/EmptySquareIcon";
import ArrowLeftIcon from "./icons/ArrowLeftIcon";
import clsx from "clsx";
import LightyIcon from "./icons/LightyIcon";
import MailIcon from "./icons/MailIcon";
import { DotIcon } from "./tab/TabButton";
import LightyLetterLogo from "./icons/LightyLetterLogo";
import Spacing from "./Spacing";
import { useRecoilValue } from "recoil";
import { headerBgColorAtom, headerFontColorAtom } from "@/atoms/header";
import { useRouter } from "next/navigation";
import NoticeIcon from "./icons/NoticeIcon";
import Flex from "./Flex";

const headerWrapperStyle =
  "z-10 min-w-[320px] max-w-[430px] w-full flex justify-between items-center h-[48px] bg-base-white";
const squareIconContainerStyle = "w-[44px] h-[44px] py-[10px] pr-[20px]";

export function Header({
  pageName,
  square,
  icon,
}: {
  pageName: string;
  square?: boolean;
  icon?: React.ReactNode;
}) {
  return (
    <div
      className={clsx(
        headerWrapperStyle,
        "text-[20px] font-[700] leading-[26px] tracking-[-0.3px]"
      )}
    >
      <span>{pageName}</span>
      {square && (
        <div className="w-[44px] h-[44px] py-[10px]">
          <EmptySquareIcon />
        </div>
      )}
      {icon && (
        <>
          <Spacing size={8} />
          <div>{icon}</div>
        </>
      )}
    </div>
  );
}

export function HeaderWithBackIcon({
  pageName,
  square = false,
  fontColor,
  color,
  icon,
}: {
  pageName: string;
  square?: boolean;
  fontColor?: string;
  color?: string;
  icon?: React.ReactNode;
}) {
  const arrowIconContainerStyle =
    "w-[40px] h-[40px] py-[10px] pl-[17px] pr-[3px] cursor-pointer";

  return (
    <div
      className={clsx(
        headerWrapperStyle,
        "text-[18px] font-[700] leading-[23.4px] tracking-[-0.54px] gap-[6px] pl-[0px] pr-[20px]"
      )}
      style={{ backgroundColor: color ? color : "transparent" }}
    >
      <div
        className={arrowIconContainerStyle}
        onClick={() => {
          window.history.back();
        }}
      >
        <ArrowLeftIcon color={fontColor} />
      </div>
      <div
        style={{
          color: fontColor ? fontColor : "",
        }}
        className="flex-1"
      >
        {pageName}
      </div>
      <Spacing size={6} />
      {square && (
        <div className={squareIconContainerStyle}>
          <EmptySquareIcon />
        </div>
      )}
      {icon && (
        <>
          <Spacing size={6} />
          {icon}
        </>
      )}
    </div>
  );
}

export function HeaderTransparentWithLogo() {
  const router = useRouter();
  const bgColor = useRecoilValue(headerBgColorAtom);
  const fontColor = useRecoilValue(headerFontColorAtom);
  const lightyIconContainer = "h-[40px] py-[10px]";
  const iconWrapperStyle =
    "flex justify-center items-center w-[40px] h-[40px] p-[8px] cursor-pointer";

  return (
    <div
      style={{
        position: "fixed",
        background: bgColor,
        transition: "background-color 0.5s ease",
        paddingLeft: "20px",
      }}
      className={clsx(headerWrapperStyle, "text-T4 px-[20px]")}
    >
      <div className={lightyIconContainer}>
        <LightyIcon color={fontColor} />
      </div>
      <Spacing size={4} direction="horizontal" />
      <LightyLetterLogo
        color={fontColor}
        pointer
        onClick={() => {
          router.push("/home");
        }}
      />
      <div className="flex-1" />
      <Flex align="center">
        <div
          onClick={() => {
            router.push("/invitation");
          }}
          className={clsx("relative", iconWrapperStyle)}
        >
          <MailIcon width="24" height="24" color={fontColor} />
          <DotIcon display={true} className="absolute top-0 right-[6px]" />
        </div>
        <Spacing size={4} direction="horizontal" />
        <div
          onClick={() => {
            router.push("/notice");
          }}
          className={iconWrapperStyle}
        >
          <NoticeIcon color={fontColor} />
        </div>
      </Flex>
    </div>
  );
}
