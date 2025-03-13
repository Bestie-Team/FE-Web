import React from "react";
import Flex from "../shared/Flex";
import Spacing from "../shared/Spacing";
import { Gathering } from "@/models/gathering";
import dynamic from "next/dynamic";

const NoSchedule = dynamic(() => import("./NoSchedule"));
const TimelineItem = dynamic(() => import("./TimelineItem"));

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
  scheduleContainer: "w-[350px] pb-safe-bottom",
  timelineWrapper:
    "absolute top-[10px] left-[7.5px] w-[1px] h-full bg-grayscale-100",
};
