import Flex from "../shared/Flex";
import Spacing from "../shared/Spacing";
import TimelineItem from "./TimelineItem";

export default function UpcomingSchedule() {
  return (
    <Flex direction="column" className={styles.scheduleContainer}>
      <span className="text-T3">다가오는 일정</span>
      <Spacing size={32} />
      <div className="relative">
        <div className={styles.timelineWrapper} />
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

const styles = {
  scheduleContainer: "w-[350px] px-[5px] pb-[80px]",
  timelineWrapper:
    "absolute top-[10px] left-[7.5px] w-[1px] h-full bg-grayscale-100",
};

const schedules = [
  "https://cdn.lighty.today/b_cake.jpeg",
  "https://cdn.lighty.today/santa.jpeg",
];
