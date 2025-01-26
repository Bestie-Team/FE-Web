import React from "react";
import EmptySquareIcon from "./Icon/EmptySquareIcon";
import ArrowLeftIcon from "./Icon/ArrowLeftIcon";
import clsx from "clsx";
import LightyIcon from "./Icon/LightyIcon";
import MailIcon from "./Icon/MailIcon";
import { DotIcon } from "./Icon/DotIcon";
import LightyLetterLogo from "./Icon/LightyLetterLogo";
import Spacing from "./Spacing";
import { useRecoilValue } from "recoil";
import { useRouter } from "next/navigation";
import NoticeIcon from "./Icon/NoticeIcon";
import Flex from "./Flex";
import { bgColorAtom, fontColorAtom } from "@/atoms/scroll";

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
      style={{
        top: 0,
        position: "fixed",
        zIndex: 12,
      }}
      className={clsx(
        styles.universalHeaderWrapper,
        "pl-5 text-[20px] font-[700] leading-[26px] tracking-[-0.3px]"
      )}
    >
      <span>{pageName}</span>
      {square && (
        <div className="w-11 h-11 py-[10px]">
          <EmptySquareIcon />
        </div>
      )}
      {icon && (
        <>
          <Spacing size={8} />
          <div className="pr-5">{icon}</div>
        </>
      )}
    </div>
  );
}

export function HeaderWithBackBtn({
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
  return (
    <div
      className={clsx(
        styles.universalHeaderWrapper,
        "text-[18px] font-[700] leading-[23.4px] tracking-[-0.54px] gap-[6px] pl-[0px] pr-5"
      )}
      style={{
        zIndex: 12,
        position: "fixed",
        top: 0,
        backgroundColor: color ? color : "transparent",
      }}
    >
      <div
        className={styles.arrowIconContainer}
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
        <div className={styles.squareIconContainer}>
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

export function BackgroundReversibleHeader() {
  const router = useRouter();
  const fontColor = useRecoilValue(fontColorAtom);
  const bgColor = useRecoilValue(bgColorAtom);
  return (
    <div
      style={{
        top: 0,
        zIndex: 12,
        position: "fixed",
        background: bgColor,
        transition: "background-color 0.5s ease",
      }}
      className={clsx(styles.universalHeaderWrapper, "fixed text-T4 px-5")}
    >
      <div className={styles.lightyIconContainer}>
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
          onMouseDown={() => {
            router.push("/invitation");
          }}
          className={clsx("relative", styles.iconWrapperStyle)}
        >
          <MailIcon width="24" height="24" color={fontColor} />
          <DotIcon display={true} className="absolute top-0 right-[6px]" />
        </div>
        <Spacing size={4} direction="horizontal" />
        <div
          onMouseDown={() => {
            router.push("/notice");
          }}
          className={styles.iconWrapperStyle}
        >
          <NoticeIcon color={fontColor} />
        </div>
      </Flex>
    </div>
  );
}

const styles = {
  universalHeaderWrapper:
    "min-w-[320px] max-w-[430px] w-full flex justify-between items-center h-12 bg-base-white",
  arrowIconContainer:
    "w-10 h-10 py-[10px] pl-[17px] pr-[3px] cursor-pointer hover:animate-shrink-grow",
  iconWrapperStyle:
    "flex justify-center items-center w-10 h-10 p-2 cursor-pointer  hover:animate-shrink-grow-less",
  lightyIconContainer: "h-10 py-[10px]",
  squareIconContainer: "w-11 h-11 py-[10px] pr-5",
};
