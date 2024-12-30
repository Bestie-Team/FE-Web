import Flex from "../shared/Flex";
import Spacing from "../shared/Spacing";
import TimelineItem from "./TimelineItem";

export default function UpcomingSchedule() {
  return (
    <Flex direction="column" className="w-[350px] px-[5px] pb-[80px]">
      <span className="text-T3">다가오는 일정</span>
      <Spacing size={32} />
      <div className="relative">
        <div className={timelineWrapper} />
        {schedules.map((schedule, i) => (
          <>
            <TimelineItem imageUrl={schedule} key={i} />
            <Spacing size={48} />
          </>
        ))}
      </div>
    </Flex>
  );
}

const timelineWrapper =
  "absolute top-[10px] left-[7.5px] w-[1px] h-full bg-grayscale-100";

const schedules = [
  "https://d1al3w8x2wydb3.cloudfront.net/images/b_cake.jpeg",
  "https://d1al3w8x2wydb3.cloudfront.net/images/santa.jpeg",
];
