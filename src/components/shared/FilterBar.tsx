"use client";
import { useState } from "react";
import LightySelect from "./filter";

const yearOptions = [
  { value: "2024", label: "2024" },
  { value: "2023", label: "2023" },
  { value: "2021", label: "2021" },
  { value: "2020", label: "2020" },
];
const orderOptions = [
  { value: "최신순", label: "최신순" },
  { value: "오래된순", label: "오래된순" },
];

export type OptionType = {
  value: string;
  label: string;
};

export default function FilterBar() {
  const [selectedYear, setSelectedYear] = useState<OptionType | null>(null);
  const [selectedOrder, setSelectedOrder] = useState<OptionType | null>(null);

  return (
    <div className={filterBarWrapperStyle}>
      <LightySelect
        options={yearOptions}
        selected={selectedYear}
        setSelected={setSelectedYear}
      />
      <LightySelect
        options={orderOptions}
        selected={selectedOrder}
        setSelected={setSelectedOrder}
        borderColor="white"
      />
    </div>
  );
}

const filterBarWrapperStyle =
  "flex justify-between pl-[20px] pt-[16px] pb-[12px]";
