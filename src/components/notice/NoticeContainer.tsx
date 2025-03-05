import { Notification } from "lighty-type";
import Flex from "../shared/Flex";
import useNotification from "./hooks/useNotification";
import ReportNoticeItem from "./ReportNoticeItem";
import DotSpinner from "../shared/Spinner/DotSpinner";

export default function NoticeContainer() {
  const { data: notifications = [], isFetching } = useNotification();
  const today: Notification[] = [];
  const passed: Notification[] = [];

  notifications.forEach((notification) => {
    const isToday =
      new Date(notification.createdAt).getDate() === new Date().getDate();
    if (isToday) {
      today.push(notification);
    } else {
      passed.push(notification);
    }
  });

  return (
    <Flex
      direction="column"
      className="h-dvh overflow-y-scroll no-scrollbar gap-10 pt-[60px]"
    >
      {isFetching ? (
        <DotSpinner />
      ) : (
        <>
          <Flex direction="column" className="px-5 gap-3">
            {today.map((notification) => (
              <>
                <span className="text-T4">오늘의 알림</span>
                <ReportNoticeItem
                  key={notification.id}
                  notification={notification}
                />
              </>
            ))}
          </Flex>
          <Flex direction="column" className="px-5 gap-3">
            {passed.map((notification) => (
              <>
                <span className="text-T4">이전 알림</span>
                <ReportNoticeItem
                  key={notification.id}
                  notification={notification}
                />
              </>
            ))}
          </Flex>
        </>
      )}
    </Flex>
  );
}
