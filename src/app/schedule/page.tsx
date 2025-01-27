"use client";
import UpcomingSchedule from "@/components/schedule/UpcomingSchedule";
import LightyCalendarWithBorder from "@/components/shared/Calender/CalendarWithBorder";
import LightySelect from "@/components/shared/Select";
import { SelectOptionType } from "@/components/shared/YearFilter";
import Flex from "@/components/shared/Flex";
import Spacing from "@/components/shared/Spacing";
import getHeader from "@/utils/getHeader";
import clsx from "clsx";
import React, { Dispatch, SetStateAction, useState } from "react";
import { useRecoilValue } from "recoil";
import { scrollProgressAtom } from "@/atoms/scroll";

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

export default function SchedulePage() {
  const scrollProgress = useRecoilValue(scrollProgressAtom);
  const MemoizedUpcomingSchedule = React.memo(UpcomingSchedule);
  const MemoizedLightyCalendarWithBorder = React.memo(LightyCalendarWithBorder);
  const [year, setYear] = useState<SelectOptionType | null>({
    value: "2025",
    label: "2025",
  });
  return (
    <div>
      <Header year={year} setYear={setYear} shadow={scrollProgress > 0.1} />

      <Flex direction="column" className={styles.container}>
        <div className="!h-[408px]">
          <MemoizedLightyCalendarWithBorder />
        </div>
        <Spacing size={28} />
        <MemoizedUpcomingSchedule />
      </Flex>
    </div>
  );
}

const styles = {
  header: "max-w-[430px] fixed pt-12 w-full pl-5 bg-base-white",
  container: "items-center h-screen mt-24 px-5 overflow-x-scroll no-scrollbar",
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
