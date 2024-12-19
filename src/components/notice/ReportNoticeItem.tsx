import React from "react";
import NoticeItem from "../shared/NoticeItem";

export default function ReportNoticeItem() {
  const reportType = "유저";
  const description = "김혜지님의 신고가 완료되었어요.";
  return (
    <NoticeItem
      icon="⚠"
      title={`${reportType} 신고`}
      date="24.12.25"
      description={description}
    />
  );
}
