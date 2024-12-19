import Flex from "../shared/Flex";
import Spacing from "../shared/Spacing";
import ReportNoticeItem from "./ReportNoticeItem";

export default function TodayNotice() {
  return (
    <Flex direction="column" className="px-[20px]">
      <span className="text-T4">오늘의 알림</span>
      <Spacing size={12} />
      <ReportNoticeItem />
    </Flex>
  );
}
