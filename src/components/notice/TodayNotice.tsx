import Flex from "../shared/Flex";
import useNotification from "./hooks/useNotification";
import ReportNoticeItem from "./ReportNoticeItem";

export default function TodayNotice() {
  const { data: notifications = [] } = useNotification();
  return (
    <Flex direction="column" className="px-5 gap-3">
      <span className="text-T4">오늘의 알림</span>
      {notifications.map((notification) => (
        <ReportNoticeItem key={notification.id} notification={notification} />
      ))}
    </Flex>
  );
}
