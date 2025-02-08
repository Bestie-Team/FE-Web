import Flex from "../shared/Flex";
import ReportNoticeItem from "./ReportNoticeItem";

export default function TodayNotice() {
  return (
    <Flex direction="column" className="px-5 gap-3">
      <span className="text-T4">오늘의 알림</span>
      <ReportNoticeItem />
    </Flex>
  );
}
