"use client";
import TabBar from "@/components/gathering/TabBarGather";
import LightySelect from "@/components/shared/filter";
import StarsIconGray from "@/components/shared/icons/StarsIconGray";
import NavBar from "@/components/shared/NavBar";
import { useState } from "react";

export type OptionType = {
  value: string;
  label: string;
};

const yearOptions = [
  { value: "2024", label: "2024" },
  { value: "2023", label: "2023" },
  { value: "2021", label: "2021" },
  { value: "2020", label: "2020" },
];

export default function GatheringPage() {
  const [selectedYear, setSelectedYear] = useState<OptionType | null>(null);

  return (
    <div className="pt-[97px]  mx-auto h-screen pl-5">
      <div className="w-[390px] h-12  bg-white justify-start items-center gap-3 inline-flex">
        <div className="grow shrink basis-0 text-neutral-950 text-xl font-bold font-['Pretendard'] leading-relaxed">
          나의 모임
        </div>
        <div className="w-11 h-11 relative" />
      </div>
      <TabBar />
      <div className="w-[390px] pt-[16px] ">
        <LightySelect
          options={yearOptions}
          selected={selectedYear}
          setSelected={setSelectedYear}
          borderColor="#E9E9E9"
        />
      </div>
      <div className="w-full flex justify-center mb-[18px]">
        <StarsIconGray className="mt-[205px]" />
      </div>
      <div className="text-center text-[#aeaeae] text-base font-semibold font-['Pretendard'] leading-tight">
        아직 예정된 모임이 없어요.
      </div>
      <NavBar />
    </div>
  );
}
