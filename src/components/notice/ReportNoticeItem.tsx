import React from "react";
import NoticeItem from "../shared/NoticeItem";
import { Notification } from "lighty-type";
export type NotificationTypes =
  | "GATHERING_INVITATION_RECEIVED"
  | "GATHERING_INVITATION_ACCEPTED"
  | "GROUP_INVITATION"
  | "FRIEND_REQUEST"
  | "FRIEND_REQUEST_ACCEPTED"
  | "FEED_COMMENT";

export default function ReportNoticeItem({
  notification,
}: {
  notification: Notification;
}) {
  const reportType = "";
  const description = "김혜지님의 신고가 완료되었어요.";
  return (
    <NoticeItem
      icon="⚠"
      title={`${reportType}`}
      date="24.12.25"
      description={description}
    />
  );
}

export function InvitationNoticeItem() {
  const reportType = "GATHERING_INVITATION_RECEIVED";
  const description = "김혜지님이 모임 초대장을 보냈어요!";
  const date = "24.12.25";
  return (
    <NoticeItem
      icon="💌"
      title={`${reportType}`}
      date={date}
      description={description}
    />
  );
}

export function RequestFriendNoticeItem() {
  const reportType = "FRIEND_REQUEST";
  const description = "김혜지님이 친구 요청을 보냈어요!";
  const date = "24.12.25";
  return (
    <NoticeItem
      icon="👀"
      title={`${reportType}`}
      date={date}
      description={description}
    />
  );
}

export function AcceptFriendNoticeItem() {
  const reportType = "FRIEND_REQUEST_ACCEPTED";
  const description = "김혜지님이 친구 요청을 수락했어요!";
  const date = "24.12.25";
  return (
    <NoticeItem
      icon="🙌🏻"
      title={`${reportType}`}
      date={date}
      description={description}
    />
  );
}

export function GroupNoticeItem() {
  const reportType = "GROUP_INVITATION";
  const description = "김혜지님이 oooo그룹에 초대했어요!";
  const date = "24.12.25";
  return (
    <NoticeItem
      icon="👀"
      title={`${reportType}`}
      date={date}
      description={description}
    />
  );
}
