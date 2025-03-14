import { DotWithNumberIcon } from "../Icon/DotIcon";
import MailIcon from "../Icon/MailIcon";
import NoticeIcon from "../Icon/NoticeIcon";
import { useRouter } from "next/navigation";
import React from "react";
import clsx from "clsx";
import Panel from "../Panel/Panel";
import type { Notification } from "lighty-type";
import Header from "./Header";

interface ScrollAwareHeaderProps extends FeedHeaderProps {
  visible: boolean;
}

interface GatheringHeaderProps {
  className?: string;
  selectedTab: "1" | "2";
  setSelectedTab: (tabName: "1" | "2") => void;
}

interface FeedHeaderProps {
  className?: string;
  mailCount: Notification[];
  selectedTab: "1" | "2";
  handleTabClick: (tab: "1" | "2") => void;
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
    className="relative flex justify-center items-center w-10 h-10 p-2 cursor-pointer"
  >
    {children}
  </div>
);

const FeedHeader = React.memo(
  ({
    className,
    mailCount,
    selectedTab,
    handleTabClick,
    isNewNotification,
  }: FeedHeaderProps) => {
    const router = useRouter();
    return (
      <Header
        className={className}
        headerLabel="추억 피드"
        icon={
          <div className="flex items-center gap-1">
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
        }
      >
        <div id="filter">
          <Panel
            selectedTab={selectedTab}
            long="short"
            title1="전체"
            title2="마이"
            onClick={handleTabClick}
            year={false}
          />
        </div>
      </Header>
    );
  }
);

FeedHeader.displayName = "FeedHeader";

export const GatheringHeader = React.memo(
  ({ className, selectedTab, setSelectedTab }: GatheringHeaderProps) => {
    return (
      <Header className={className} headerLabel="약속">
        <Panel
          selectedTab={selectedTab}
          long="short"
          title1="예정"
          title2="완료"
          onClick={setSelectedTab}
        />
      </Header>
    );
  }
);

GatheringHeader.displayName = "GatheringHeader";

export function ScrollAwareHeader({
  visible,
  selectedTab,
  handleTabClick,
  isNewNotification,
  mailCount,
}: ScrollAwareHeaderProps) {
  return (
    <FeedHeader
      className={clsx(
        "pt-safe-top bg-base-white/80 backdrop-blur-md transition-transform duration-300 ease-in-out z-20",
        visible ? "translate-y-0" : "-translate-y-full"
      )}
      selectedTab={selectedTab}
      handleTabClick={handleTabClick}
      isNewNotification={isNewNotification}
      mailCount={mailCount}
    />
  );
}
