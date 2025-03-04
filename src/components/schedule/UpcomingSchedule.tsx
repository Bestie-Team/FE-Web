import React from "react";
import Flex from "../shared/Flex";
import Spacing from "../shared/Spacing";
import TimelineItem from "./TimelineItem";
import { Gathering } from "@/models/gathering";

export default function UpcomingSchedule({
  gatherings,
}: {
  gatherings: Gathering[];
}) {
  return (
    <Flex direction="column" className={styles.scheduleContainer}>
      <span className="text-T3">다가오는 일정</span>
      <Spacing size={32} />
      <Flex
        direction="column"
        className="relative min-h-[calc(100dvh-655px)] gap-12"
      >
        {gatherings.length > 0 && <div className={styles.timelineWrapper} />}
        {gatherings.length === 0 ? (
          <NoSchedule />
        ) : (
          gatherings?.map((gathering, i) => (
            <TimelineItem key={i} upcomingGathering={gathering} />
          ))
        )}
        <Spacing size={48} />
      </Flex>
    </Flex>
  );
}

const styles = {
  scheduleContainer: "w-[350px] px-[5px]",
  timelineWrapper:
    "absolute top-[10px] left-[7.5px] w-[1px] h-full bg-grayscale-100",
};

const NoSchedule = () => {
  return (
    <Flex
      className="w-full h-[140px] bg-grayscale-10 border-[1px] border-dashed border-grayscale-200 rounded-[16px]"
      justify="center"
      align="center"
    >
      <span className="text-C1 text-grayscale-300">예정된 모임이 없어요</span>
    </Flex>
  );
};
