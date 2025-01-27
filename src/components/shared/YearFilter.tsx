"use client";
import { useState } from "react";
import LightySelect from "./Select";

const yearOptions = [
  { value: "2025", label: "2025" },
  { value: "2024", label: "2024" },
];

export type SelectOptionType = {
  value: string;
  label: string;
};

export default function YearFilter() {
  const [selectedYear, setSelectedYear] = useState<SelectOptionType | null>({
    value: "2025",
    label: "2025",
  });

  return (
    <LightySelect
      options={yearOptions}
      selected={selectedYear}
      setSelected={setSelectedYear}
      placeholder="년도"
      borderColor="#E9E9E9"
    />
  );
}
