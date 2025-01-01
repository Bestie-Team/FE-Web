"use client";
import UpcomingSchedule from "@/components/schedule/UpcomingSchedule";
import LightyCalendarWithBorder from "@/components/shared/calendar/CalendarWithBorder";
import LightySelect from "@/components/shared/filter";
import { OptionType } from "@/components/shared/FilterBar";
import Flex from "@/components/shared/Flex";
import NavBar from "@/components/shared/NavBar";
import Spacing from "@/components/shared/Spacing";
import useScrollShadow from "@/hooks/useScrollShadow";
import HeaderReturner from "@/utils/headerReturner";
import clsx from "clsx";
import { useState } from "react";

export default function SchedulePage() {
  const hasShadow = useScrollShadow();
  const [year, setYear] = useState<OptionType | null>({
    value: "2024",
    label: "2024",
  });

  return (
    <Flex direction="column" className="bg-base-white h-screen">
      <div className={clsx(styles.header, hasShadow ? "shadow-bottom" : "")}>
        {HeaderReturner()}
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
      <NavBar />
    </Flex>
  );
}

const styles = {
  header: "max-w-[430px] pt-[8px] fixed z-10 w-full pl-[17px] bg-base-white",

  container: "items-center mt-[120px] px-[20px] overflow-x-scroll no-scrollbar",
};

const options = [
  {
    value: "2025",
    label: "2025",
  },
  {
    value: "2024",
    label: "2024",
  },
];
