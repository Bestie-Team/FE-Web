import React from "react";
import NoticeItem from "../shared/NoticeItem";
import { Notification } from "lighty-type";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
export type NotificationTypes =
  | "GATHERING_INVITATION_RECEIVED"
  | "GATHERING_INVITATION_ACCEPTED"
  | "GROUP_INVITATION"
  | "FRIEND_REQUEST"
  | "FRIEND_REQUEST_ACCEPTED"
  | "FEED_COMMENT";

const NotificationImage: Record<NotificationTypes, string> = {
  GATHERING_INVITATION_RECEIVED: "💌",
  GATHERING_INVITATION_ACCEPTED: "💌",
  GROUP_INVITATION: "👀",
  FRIEND_REQUEST: "👀",
  FRIEND_REQUEST_ACCEPTED: "🙌🏻",
  FEED_COMMENT: "💬",
};

const LOCATION = {
  FRIEND_REQUEST: "/friends",
  GATHERING_INVITATION_RECEIVED: "/invitation",
  GROUP_INVITATION: "/social?tab=group",
};

export default function ReportNoticeItem({
  notification,
}: {
  notification: Notification;
}) {
  const { title, message, createdAt, type } = notification;
  const date = format(new Date(createdAt), "yy.MM.dd.");
  const router = useRouter();

  const handleClick = () => {
    const address = LOCATION[type];
    if (!!address) {
      router.push(address);
    }
  };
  return (
    <NoticeItem
      onClick={handleClick}
      icon={NotificationImage[type]}
      title={`${title}`}
      date={date}
      type={type}
      description={message}
    />
  );
}
