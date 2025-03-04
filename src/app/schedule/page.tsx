"use client";
import UpcomingSchedule from "@/components/schedule/UpcomingSchedule";
import LightyCalendarWithBorder from "@/components/shared/Calender/CalendarWithBorder";
import LightySelect from "@/components/shared/Select";
import { SelectOptionType } from "@/components/shared/YearFilter";
import Flex from "@/components/shared/Flex";
import Spacing from "@/components/shared/Spacing";
import getHeader from "@/utils/getHeader";
import clsx from "clsx";
import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useMemo,
  useState,
} from "react";
import useGatherings from "@/components/gathering/hooks/useGatherings";
import { maxDate, minDate } from "@/constants/time";
import DotSpinner from "@/components/shared/Spinner/DotSpinner";
import { Gathering } from "@/models/gathering";
import FullPageLoader from "@/components/shared/FullPageLoader";
import { useScrollThreshold } from "@/hooks/useScrollThreshold";
import useGatheringEnded from "@/components/gathering/hooks/useGatheringEnded";

const MemoizedUpcomingSchedule = React.memo(
  ({ gathering }: { gathering: Gathering[] }) => (
    <UpcomingSchedule gatherings={gathering} />
  )
);
const Header = React.memo(
  ({
    year,
    setYear,
    shadow,
  }: {
    year: SelectOptionType | null;
    setYear: Dispatch<SetStateAction<SelectOptionType | null>>;
    shadow: boolean;
  }) => {
    const header = getHeader("/schedule");
    return (
      <>
        {header}
        <div
          id="filter"
          className={clsx(styles.header, shadow ? "shadow-bottom" : "")}
        >
          <LightySelect
            criterion="left"
            borderColor="#E9E9E9"
            placeholder="년도"
            options={options}
            selected={year}
            setSelected={setYear}
          />
        </div>
      </>
    );
  }
);

Header.displayName = "Header";
MemoizedUpcomingSchedule.displayName = "MemoizedUpcomingSchedule";

export default function SchedulePage() {
  const queryParams = useMemo(
    () => ({
      cursor: { createdAt: maxDate() },
      minDate: minDate(),
      maxDate: maxDate(),
      limit: 400,
    }),
    []
  );
  const [isClient, setIsClient] = useState(false);
  const { data: past, isFetching: isFetchingPast } =
    useGatheringEnded(queryParams);
  const { data: upcoming, isFetching } = useGatherings(queryParams);
  const isPast = useScrollThreshold();
  const [year, setYear] = useState<SelectOptionType | null>({
    value: "2025",
    label: "2025",
  });
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const upcomingGatherings = upcoming
    ?.filter((gathering) => new Date(gathering.gatheringDate) >= today)
    .reverse();

  const allGatherings = upcomingGatherings?.concat(past || []);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return <FullPageLoader />;
  }

  return (
    <div className="min-h-dvh">
      <Header year={year} setYear={setYear} shadow={isPast} />
      <Flex direction="column" className={styles.container}>
        {isFetchingPast || !allGatherings ? (
          <DotSpinner />
        ) : (
          <div className="min-h-[400px]">
            <LightyCalendarWithBorder gatherings={allGatherings} />
          </div>
        )}
        <Spacing size={28} />
        {isFetching || !upcomingGatherings ? (
          <DotSpinner />
        ) : (
          <MemoizedUpcomingSchedule gathering={upcomingGatherings} />
        )}
      </Flex>
    </div>
  );
}

const styles = {
  header: "max-w-[430px] fixed pt-12 w-full pl-5 bg-base-white",
  container: "items-center mt-[108px] px-5",
};

const options = [
  {
    value: "2025",
    label: "2025",
  },
  {
    value: "2026",
    label: "2026",
  },
];
