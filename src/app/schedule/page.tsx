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
import { useRecoilValue } from "recoil";
import { scrollProgressAtom } from "@/atoms/scroll";
import useGatherings from "@/components/gathering/hooks/useGatherings";
import { maxDate, minDate } from "@/constants/time";
import DotSpinner from "@/components/shared/Spinner/DotSpinner";
import { Gathering } from "@/models/gathering";
import FullPageLoader from "@/components/shared/FullPageLoader";

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
      cursor: { createdAt: minDate() },
      minDate: minDate(),
      maxDate: maxDate(),
      limit: 400,
    }),
    []
  );
  const [isClient, setIsClient] = useState(false);
  const { data: upcoming, isFetching } = useGatherings(queryParams);
  const scrollProgress = useRecoilValue(scrollProgressAtom);
  const MemoizedLightyCalendarWithBorder = React.memo(LightyCalendarWithBorder);
  const [year, setYear] = useState<SelectOptionType | null>({
    value: "2025",
    label: "2025",
  });
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const upcomingGatherings = upcoming?.gatherings.filter(
    (gathering) => new Date(gathering.gatheringDate) >= today
  );

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return <FullPageLoader />;
  }

  return (
    <div className="h-full">
      <Header year={year} setYear={setYear} shadow={scrollProgress > 0.1} />
      <Flex direction="column" className={styles.container}>
        <div className="!h-[408px]">
          {isFetching || !upcoming ? (
            <DotSpinner />
          ) : (
            <MemoizedLightyCalendarWithBorder
              gatherings={upcoming?.gatherings}
            />
          )}
        </div>
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
