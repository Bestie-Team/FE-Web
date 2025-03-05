import React from "react";
import NoticeItem from "../shared/NoticeItem";
import { Notification } from "lighty-type";
import { format } from "date-fns";
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

export default function ReportNoticeItem({
  notification,
}: {
  notification: Notification;
}) {
  const { title, message, createdAt, type } = notification;
  const date = format(new Date(createdAt), "yy.MM.dd.");

  return (
    <NoticeItem
      icon={NotificationImage[type]}
      title={`${title}`}
      date={date}
      description={message}
    />
  );
}
