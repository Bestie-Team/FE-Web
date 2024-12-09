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
import { headerBgColorAtom, headerFontColorAtom } from "@/atom/header";
const headerWrapperStyle =
  "z-10 fixed min-w-[320px] w-full flex justify-between items-center h-[97px] pt-[49px] bg-base-white";

export function Header({
  pageName,
  square,
}: {
  pageName: string;
  square?: boolean;
}) {
  return (
    <div
      className={clsx(
        headerWrapperStyle,
        "pl-[20px] text-[20px] font-[700] leading-[26px] tracking-[-0.3px]"
      )}
    >
      <span>{pageName}</span>
      {square && (
        <div className="w-[44px] h-[44px] py-[10px] pr-[20px]">
          <EmptySquareIcon />
        </div>
      )}
    </div>
  );
}

export function HeaderTransparent({
  pageName,
  square = false,
  color,
}: {
  pageName: string;
  square?: boolean;
  color?: string;
}) {
  const arrowIconContainerStyle =
    "w-[40px] h-[40px] py-[10px] pl-[17px] pr-[3px] cursor-pointer";

  const squareIconContainerStyle = "w-[44px] h-[44px] py-[10px] pr-[20px]";

  return (
    <div
      className={clsx(
        headerWrapperStyle,
        "text-[20px] font-[700] leading-[26px] tracking-[-0.3px] gap-[6px] pl-[0px]"
      )}
      style={{ backgroundColor: color ?? "transparent" }}
    >
      <div
        className={arrowIconContainerStyle}
        onClick={() => {
          window.history.back();
        }}
      >
        <ArrowLeftIcon />
      </div>
      <div className="flex-1">{pageName}</div>
      {square && (
        <div className={squareIconContainerStyle}>
          <EmptySquareIcon />
        </div>
      )}
    </div>
  );
}

export function HeaderTransparentWithLogo() {
  const bgColor = useRecoilValue(headerBgColorAtom);
  const fontColor = useRecoilValue(headerFontColorAtom);
  const lightyIconContainer = "h-[40px] py-[10px]";

  return (
    <div
      style={{
        zIndex: 9999,
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
      <div className="flex-1">
        <LightyLetterLogo color={fontColor} />
      </div>
      <div className="relative w-[40px] h-[40px] p-[8px]">
        <MailIcon color={fontColor} />
        <DotIcon display={true} className="absolute top-0 right-[10px]" />
      </div>
    </div>
  );
}
