"use client";
import LightySelect from "@/components/shared/filter";
import { OptionType } from "@/components/shared/FilterBar";
import Flex from "@/components/shared/Flex";
import Spacing from "@/components/shared/Spacing";
import HeaderReturner from "@/utils/HeaderReturner";
import { useState } from "react";

export default function SchedulePage() {
  const [year, setYear] = useState<OptionType | null>({
    value: "2024",
    label: "2024",
  });
  return (
    <Flex direction="column">
      <div className="max-w-[430px] pt-[8px] z-10 w-full pl-[17px] bg-base-white">
        {HeaderReturner()}
        <LightySelect
          borderColor="#E9E9E9"
          placeholder="년도"
          options={options}
          selected={year}
          setSelected={setYear}
        />
      </div>
      <Spacing size={20} />
    </Flex>
  );
}

const options = [
  {
    value: "2024",
    label: "2024",
  },
  {
    value: "2023",
    label: "2023",
  },
  {
    value: "2022",
    label: "2022",
  },
  {
    value: "2021",
    label: "2021",
  },
];
