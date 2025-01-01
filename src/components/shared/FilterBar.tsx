"use client";
import { useState } from "react";
import LightySelect from "./filter";

const yearOptions = [
  { value: "2025", label: "2025" },
  { value: "2024", label: "2024" },
];

const orderOptions = [
  { value: "최신순", label: "최신순" },
  { value: "오래된순", label: "오래된순" },
];

export type OptionType = {
  value: string;
  label: string | React.ReactNode;
};

export default function FilterBar() {
  const [selectedYear, setSelectedYear] = useState<OptionType | null>({
    value: "2025",
    label: "2025",
  });
  const [selectedOrder, setSelectedOrder] = useState<OptionType | null>({
    value: "최신순",
    label: "최신순",
  });

  return (
    <div
      style={{
        height: "68px",
      }}
      className={filterBarWrapperStyle}
    >
      <LightySelect
        options={yearOptions}
        selected={selectedYear}
        setSelected={setSelectedYear}
        placeholder="년도"
        borderColor="#E9E9E9"
      />
      <LightySelect
        options={orderOptions}
        selected={selectedOrder}
        setSelected={setSelectedOrder}
        placeholder={selectedOrder?.label as string}
        borderColor="white"
        width="fit-content"
      />
    </div>
  );
}

const filterBarWrapperStyle =
  "max-w-[430px] flex justify-between pt-[16px] pb-[12px]";
