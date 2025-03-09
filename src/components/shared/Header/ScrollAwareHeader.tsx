"use client";

import { DotWithNumberIcon } from "../Icon/DotIcon";
import MailIcon from "../Icon/MailIcon";
import NoticeIcon from "../Icon/NoticeIcon";
import { useRouter } from "next/navigation";
import React from "react";
import clsx from "clsx";
import Panel from "../Panel/Panel";
import type { Notification } from "lighty-type";

interface HeaderProps {
  shadow?: boolean;
  selectedTab: "1" | "2";
  handleTabClick: (tab: "1" | "2") => void;
  mailCount: Notification[];
  isNewNotification: Notification[];
}

const IconButton = ({
  onClick,
  children,
}: {
  onClick: (e: React.MouseEvent) => void;
  children: React.ReactNode;
}) => (
  <div
    onMouseDown={(e) => {
      e.stopPropagation();
      onClick(e);
    }}
    className="relative flex justify-center items-center w-10 h-10 p-2 cursor-pointer hover:animate-shrink-grow-less"
  >
    {children}
  </div>
);

const Header = React.memo(
  ({
    shadow = false,
    selectedTab,
    handleTabClick,
    isNewNotification,
    mailCount,
  }: HeaderProps) => {
    const router = useRouter();

    return (
      <div className="flex flex-col">
        <div className="w-full flex justify-between items-center h-12 pl-5 text-[20px] font-[700] leading-[26px] tracking-[-0.3px]">
          <span>{"추억 피드"}</span>

          <div className="flex items-center gap-1 pr-5">
            <IconButton onClick={() => router.push("/invitation")}>
              <MailIcon
                className="relative"
                width="24"
                height="24"
                color="#0A0A0A"
              />
              {mailCount.length >= 1 && (
                <DotWithNumberIcon count={mailCount.length} />
              )}
            </IconButton>

            <IconButton onClick={() => router.push("/notice")}>
              <NoticeIcon color="#0A0A0A" />
              {isNewNotification.length >= 1 && (
                <DotWithNumberIcon count={isNewNotification.length} />
              )}
            </IconButton>
          </div>
        </div>
        <div
          id="filter"
          className={clsx("px-5 w-full", shadow ? "shadow-bottom" : "")}
        >
          <Panel
            selectedTab={selectedTab}
            long="short"
            title1="전체"
            title2="마이"
            onClick={handleTabClick}
            year={false}
          />
        </div>
      </div>
    );
  }
);

Header.displayName = "Header";

interface ScrollAwareHeaderProps extends HeaderProps {
  visible: boolean;
}

export function ScrollAwareHeader({
  visible,
  selectedTab,
  handleTabClick,
  isNewNotification,
  mailCount,
}: ScrollAwareHeaderProps) {
  return (
    <header
      className={clsx(
        "fixed top-0 left-0 right-0 bg-base-white/80 backdrop-blur-md z-50 transition-transform duration-300 ease-in-out",
        visible ? "translate-y-0" : "-translate-y-full"
      )}
    >
      <Header
        selectedTab={selectedTab}
        handleTabClick={handleTabClick}
        isNewNotification={isNewNotification}
        mailCount={mailCount}
      />
    </header>
  );
}
