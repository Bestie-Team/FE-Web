"use client";
import UpcomingSchedule from "@/components/schedule/UpcomingSchedule";
import LightyCalendarWithBorder from "@/components/shared/Calender/CalendarWithBorder";
import Flex from "@/components/shared/Flex";
import Spacing from "@/components/shared/Spacing";
import DotSpinner from "@/components/shared/Spinner/DotSpinner";
import { Gathering } from "@/models/gathering";
import React from "react";

const MemoizedUpcomingSchedule = React.memo(
  ({ gathering }: { gathering: Gathering[] }) => (
    <UpcomingSchedule gatherings={gathering} />
  )
);
MemoizedUpcomingSchedule.displayName = "MemoizedUpcomingSchedule";

export default function Schedule({
  expectingGatherings,
  isFetching,
}: {
  expectingGatherings?: Gathering[];
  isFetching: boolean;
}) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const upcomingGatherings =
    expectingGatherings
      ?.filter((gathering) => new Date(gathering.gatheringDate) >= today)
      .reverse() || [];

  return (
    <div className="min-h-dvh">
      <Flex direction="column" className={styles.container}>
        {isFetching ? (
          <DotSpinner />
        ) : (
          <div className="min-h-[400px]">
            <LightyCalendarWithBorder gatherings={upcomingGatherings} />
          </div>
        )}
        <Spacing size={28} />
        <MemoizedUpcomingSchedule gathering={upcomingGatherings} />
      </Flex>
    </div>
  );
}

const styles = {
  header: "max-w-[430px] fixed pt-12 w-full pl-5 bg-base-white",
  container: "items-center",
};
