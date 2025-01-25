"use client";
import UpcomingSchedule from "@/components/schedule/UpcomingSchedule";
import LightyCalendarWithBorder from "@/components/shared/Calender/CalendarWithBorder";
import LightySelect from "@/components/shared/Select";
import { SelectOptionType } from "@/components/shared/FilterBar";
import Flex from "@/components/shared/Flex";
import Spacing from "@/components/shared/Spacing";
import useScrollShadow from "@/hooks/useScrollShadow";
import getHeader from "@/utils/getHeader";
import clsx from "clsx";
import { useRef, useState } from "react";
import useScroll from "@/hooks/useScroll";

export default function SchedulePage() {
  useScroll("scrollable-container");
  const containerRef = useRef<HTMLDivElement>(null);
  const header = getHeader("/schedule");
  const hasShadow = useScrollShadow(containerRef);
  const [year, setYear] = useState<SelectOptionType | null>({
    value: "2025",
    label: "2025",
  });

  return (
    <div
      id="scrollable-container"
      ref={containerRef}
      className="bg-base-white h-screen overflow-y-scroll no-scrollbar pt-[48px]"
    >
      {header}
      <div className={clsx(styles.header, hasShadow ? "shadow-bottom" : "")}>
        <LightySelect
          borderColor="#E9E9E9"
          placeholder="년도"
          options={options}
          selected={year}
          setSelected={setYear}
        />
        <Spacing size={20} />
      </div>
      <Flex direction="column" className={styles.container}>
        <LightyCalendarWithBorder />
        <Spacing size={28} />
        <UpcomingSchedule />
      </Flex>
    </div>
  );
}

const styles = {
  header: "max-w-[430px] fixed z-10 w-full pl-[20px] bg-base-white",
  container: "items-center mt-[64px] px-[20px] overflow-x-scroll no-scrollbar",
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
