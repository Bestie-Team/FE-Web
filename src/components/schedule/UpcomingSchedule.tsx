import React from "react";
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
          <React.Fragment key={i}>
            <TimelineItem imageUrl={schedule} />
            <Spacing size={48} />
          </React.Fragment>
        ))}
      </div>
    </Flex>
  );
}

const styles = {
  scheduleContainer: "w-[350px] px-[5px] pb-20",
  timelineWrapper:
    "absolute top-[10px] left-[7.5px] w-[1px] h-full bg-grayscale-100",
};

const schedules = [
  "https://cdn.lighty.today/b_cake.jpeg",
  "https://cdn.lighty.today/santa.jpeg",
];
