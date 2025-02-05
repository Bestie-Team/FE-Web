import { Gathering } from "@/models/gathering";
import { differenceInCalendarDays } from "date-fns";

export const sortGatherings = (gatherings: Gathering[]) => {
  const now = new Date();
  return gatherings.reduce(
    (acc, gathering) => {
      const isPassed =
        differenceInCalendarDays(now, gathering.gatheringDate) >= 0;
      if (isPassed) acc.passed.push(gathering);
      else acc.expecting.push(gathering);
      return acc;
    },
    { expecting: [], passed: [] } as {
      expecting: typeof gatherings;
      passed: typeof gatherings;
    }
  );
};
