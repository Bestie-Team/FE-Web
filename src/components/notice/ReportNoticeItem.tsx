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

// const NotificationLabel: Record<NotificationTypes, string> = {
//   GATHERING_INVITATION_RECEIVED: "약속 초대장",
//   GATHERING_INVITATION_ACCEPTED: "약속 수락",
//   GROUP_INVITATION: "그룹 초대",
//   FRIEND_REQUEST: "친구 요청",
//   FRIEND_REQUEST_ACCEPTED: "친구 요청 수락",
//   FEED_COMMENT: "댓글 수락",
// };

export default function ReportNoticeItem({
  notification,
}: {
  notification: Notification;
}) {
  const { title, message, createdAt } = notification;
  const date = format(new Date(createdAt), "yy.MM.dd.");

  console.log(new Date(createdAt));
  return (
    <NoticeItem icon="⚠" title={`${title}`} date={date} description={message} />
  );
}
