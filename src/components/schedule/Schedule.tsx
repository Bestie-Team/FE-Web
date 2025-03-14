import UpcomingSchedule from "@/components/schedule/UpcomingSchedule";
import LightyCalendarWithBorder from "@/components/shared/Calender/CalendarWithBorder";
import Spacing from "@/components/shared/Spacing";
import { Gathering } from "@/models/gathering";
import React from "react";

export default function Schedule({
  expectingGatherings,
}: {
  expectingGatherings?: Gathering[];
}) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const upcomingGatherings =
    expectingGatherings
      ?.filter((gathering) => new Date(gathering.gatheringDate) >= today)
      .reverse() || [];

  return (
    <div className="w-full flex flex-col items-center pt-5">
      <LightyCalendarWithBorder gatherings={upcomingGatherings} />
      <Spacing size={28} />
      <MemoizedUpcomingSchedule gathering={upcomingGatherings} />
    </div>
  );
}

const MemoizedUpcomingSchedule = React.memo(
  ({ gathering }: { gathering: Gathering[] }) => (
    <UpcomingSchedule gatherings={gathering} />
  )
);

MemoizedUpcomingSchedule.displayName = "MemoizedUpcomingSchedule";
