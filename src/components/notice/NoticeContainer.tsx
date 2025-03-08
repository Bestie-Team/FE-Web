import { Notification } from "lighty-type";
import Flex from "../shared/Flex";
import useNotification from "./hooks/useNotification";
import ReportNoticeItem from "./ReportNoticeItem";
import { useInfiniteScrollByRef } from "@/hooks/useInfiniteScroll";
import { useRef } from "react";
import NoticeSkeleton from "../shared/Skeleton/NoticeSkeleton";

export default function NoticeContainer() {
  const { data: notifications = [], isFetching, loadMore } = useNotification();
  const containerRef = useRef<HTMLDivElement>(null);
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

  useInfiniteScrollByRef({ isFetching, loadMore, targetRef: containerRef });

  return (
    <div
      ref={containerRef}
      className="h-[calc(dvh-20px)] overflow-y-scroll no-scrollbar gap-10 pt-[60px] px-5"
    >
      <div className="flex flex-col gap-10 h-full">
        {today.length > 1 && (
          <Flex direction="column" className="gap-3">
            <span className="text-T4 mb-1">오늘의 알림</span>
            {today.map((notification) => (
              <ReportNoticeItem
                key={notification.id}
                notification={notification}
              />
            ))}
          </Flex>
        )}
        {passed.length > 1 && (
          <Flex direction="column" className="gap-3">
            <span className="text-T4 mb-1">이전 알림</span>
            {passed.map((notification) => (
              <ReportNoticeItem
                key={notification.id}
                notification={notification}
              />
            ))}
          </Flex>
        )}
        {isFetching && (
          <Flex direction="column" className="gap-3">
            <span className="bg-base-white text-T4 mb-1 w-16 h-5 rounded animate-pulse" />
            {Array(9)
              .fill(0)
              .map((_, index) => (
                <NoticeSkeleton key={index} />
              ))}
          </Flex>
        )}
      </div>
    </div>
  );
}
