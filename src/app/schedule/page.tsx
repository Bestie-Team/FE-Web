"use client";
import UpcomingSchedule from "@/components/schedule/UpcomingSchedule";
import LightyCalendarWithBorder from "@/components/shared/Calender/CalendarWithBorder";
import LightySelect from "@/components/shared/Select";
import { SelectOptionType } from "@/components/shared/YearFilter";
import Flex from "@/components/shared/Flex";
import Spacing from "@/components/shared/Spacing";
import getHeader from "@/utils/getHeader";
import clsx from "clsx";
import { useState } from "react";
import { useRecoilValue } from "recoil";
import { scrollProgressAtom } from "@/atoms/scroll";

export default function SchedulePage() {
  const scrollProgress = useRecoilValue(scrollProgressAtom);
  const header = getHeader("/schedule");
  const [year, setYear] = useState<SelectOptionType | null>({
    value: "2025",
    label: "2025",
  });

  return (
    <div>
      {header}
      <div
        id="filter"
        className={clsx(
          styles.header,
          scrollProgress > 0.01 ? "shadow-bottom" : ""
        )}
      >
        <LightySelect
          borderColor="#E9E9E9"
          placeholder="년도"
          options={options}
          selected={year}
          setSelected={setYear}
        />
      </div>
      <Flex direction="column" className={styles.container}>
        <div className="!h-[408px]">
          <LightyCalendarWithBorder />
        </div>
        <Spacing size={28} />
        <UpcomingSchedule />
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
