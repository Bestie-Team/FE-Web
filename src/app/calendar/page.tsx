/* eslint-disable @next/next/no-img-element */
"use client";

import TaskCalendar from "@/components/gathering/TaskCalendar";
import LightySelect from "@/components/shared/filter";
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

const highlightedDates = [
  new Date(2024, 11, 21), // 2024년 12월 21일
  new Date(2024, 11, 25), // 2024년 12월 25일
];

export default function Calendar() {
  const [selectedYear, setSelectedYear] = useState<OptionType | null>(null);

  return (
    <div className="relative h-full pb-[186px]">
      <div className=" text-neutral-950 text-xl font-bold font-['Pretendard'] leading-relaxed pt-[97px] mb-[27px]">
        모임 캘린더
      </div>
      <LightySelect
        options={yearOptions}
        selected={selectedYear}
        setSelected={setSelectedYear}
        borderColor="#E9E9E9"
      />
      <TaskCalendar highlightedDates={highlightedDates} />;
      <div className="mt-[28px]"></div>
      <div className="text-neutral-950 text-lg font-semibold font-['Pretendard'] leading-normal mb-[32px]">
        다가오는 일정
      </div>
      <div className="h-14 w-[350px] justify-start items-start gap-2 inline-flex">
        <div className="w-4 h-5 relative">
          <div className="w-3 h-3 left-[2px] top-[1px] absolute z-[2]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="20"
              viewBox="0 0 16 20"
              fill="none"
            >
              <g id="Frame 1321316048">
                <g id="Group 427319934">
                  <circle
                    id="Ellipse 1861"
                    cx="8"
                    cy="10"
                    r="5.4"
                    fill="white"
                    stroke="#0A0A0A"
                    stroke-width="1.2"
                  />
                  <circle
                    id="Ellipse 1860"
                    cx="7.99998"
                    cy="10"
                    r="3.42857"
                    fill="#0A0A0A"
                  />
                </g>
              </g>
            </svg>
          </div>
        </div>
        <div className="grow shrink basis-0 h-14 justify-start items-start gap-6 flex">
          <div className="text-center text-neutral-950 text-base font-semibold font-['Pretendard'] leading-tight">
            D-3
          </div>
          <div className="grow shrink basis-0 h-14 justify-between items-center flex">
            <div className="self-stretch flex-col justify-between items-start inline-flex">
              <div className="text-neutral-950 text-base font-semibold font-['Pretendard'] leading-tight">
                christmas party
              </div>
              <div className="justify-start items-center gap-[9px] inline-flex">
                <div className="px-3 py-1.5 bg-[#f4f4f4] rounded-xl justify-center items-center gap-2 flex">
                  <div className="text-[#686868] text-xs font-medium font-['Pretendard'] leading-[14px]">
                    2024. 12. 14
                  </div>
                  <div className="text-[#686868] text-xs font-medium font-['Pretendard'] leading-[14px]">
                    오후 4:00
                  </div>
                </div>
              </div>
            </div>
            <img
              className="w-14 h-14 rounded-xl"
              src="https://via.placeholder.com/56x56"
              alt="이미지"
            />
          </div>
        </div>
      </div>
      <div className="h-14 w-[350px] justify-start items-start gap-2 inline-flex mt-[32px]">
        <div className="w-4 h-5 relative">
          <div className="w-3 h-3 left-[2px] top-[1px] absolute z-[2]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="20"
              viewBox="0 0 16 20"
              fill="none"
            >
              <g id="Frame 1321316048">
                <g id="Group 427319934">
                  <circle
                    id="Ellipse 1861"
                    cx="8"
                    cy="10"
                    r="5.4"
                    fill="white"
                    stroke="#0A0A0A"
                    stroke-width="1.2"
                  />
                  <circle
                    id="Ellipse 1860"
                    cx="7.99998"
                    cy="10"
                    r="3.42857"
                    fill="#0A0A0A"
                  />
                </g>
              </g>
            </svg>
          </div>
        </div>
        <div className="grow shrink basis-0 h-14 justify-start items-start gap-6 flex">
          <div className="text-center text-neutral-950 text-base font-semibold font-['Pretendard'] leading-tight">
            D-3
          </div>
          <div className="grow shrink basis-0 h-14 justify-between items-center flex">
            <div className="self-stretch flex-col justify-between items-start inline-flex">
              <div className="text-neutral-950 text-base font-semibold font-['Pretendard'] leading-tight">
                christmas party
              </div>
              <div className="justify-start items-center gap-[9px] inline-flex">
                <div className="px-3 py-1.5 bg-[#f4f4f4] rounded-xl justify-center items-center gap-2 flex">
                  <div className="text-[#686868] text-xs font-medium font-['Pretendard'] leading-[14px]">
                    2024. 12. 14
                  </div>
                  <div className="text-[#686868] text-xs font-medium font-['Pretendard'] leading-[14px]">
                    오후 4:00
                  </div>
                </div>
              </div>
            </div>
            <img
              className="w-14 h-14 rounded-xl"
              src="https://via.placeholder.com/56x56"
              alt="이미지"
            />
          </div>
        </div>
      </div>
      <div className="h-14 w-[350px] justify-start items-start gap-2 inline-flex mt-[32px]">
        <div className="w-4 h-5 relative">
          <div className="w-3 h-3 left-[2px] top-[1px] absolute z-[2]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="20"
              viewBox="0 0 16 20"
              fill="none"
            >
              <g id="Frame 1321316048">
                <g id="Group 427319934">
                  <circle
                    id="Ellipse 1861"
                    cx="8"
                    cy="10"
                    r="5.4"
                    fill="white"
                    stroke="#0A0A0A"
                    stroke-width="1.2"
                  />
                  <circle
                    id="Ellipse 1860"
                    cx="7.99998"
                    cy="10"
                    r="3.42857"
                    fill="#0A0A0A"
                  />
                </g>
              </g>
            </svg>
          </div>
        </div>
        <div className="grow shrink basis-0 h-14 justify-start items-start gap-6 flex">
          <div className="text-center text-neutral-950 text-base font-semibold font-['Pretendard'] leading-tight">
            D-3
          </div>
          <div className="grow shrink basis-0 h-14 justify-between items-center flex">
            <div className="self-stretch flex-col justify-between items-start inline-flex">
              <div className="text-neutral-950 text-base font-semibold font-['Pretendard'] leading-tight">
                christmas party
              </div>
              <div className="justify-start items-center gap-[9px] inline-flex">
                <div className="px-3 py-1.5 bg-[#f4f4f4] rounded-xl justify-center items-center gap-2 flex">
                  <div className="text-[#686868] text-xs font-medium font-['Pretendard'] leading-[14px]">
                    2024. 12. 14
                  </div>
                  <div className="text-[#686868] text-xs font-medium font-['Pretendard'] leading-[14px]">
                    오후 4:00
                  </div>
                </div>
              </div>
            </div>
            <img
              className="w-14 h-14 rounded-xl"
              src="https://via.placeholder.com/56x56"
              alt="이미지"
            />
          </div>
        </div>
      </div>
      <div className="h-14 w-[350px] justify-start items-start gap-2 inline-flex mt-[32px]">
        <div className="w-4 h-5 relative">
          <div className="w-3 h-3 left-[2px] top-[1px] absolute z-[2]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="20"
              viewBox="0 0 16 20"
              fill="none"
            >
              <g id="Frame 1321316048">
                <g id="Group 427319934">
                  <circle
                    id="Ellipse 1861"
                    cx="8"
                    cy="10"
                    r="5.4"
                    fill="white"
                    stroke="#0A0A0A"
                    stroke-width="1.2"
                  />
                  <circle
                    id="Ellipse 1860"
                    cx="7.99998"
                    cy="10"
                    r="3.42857"
                    fill="#0A0A0A"
                  />
                </g>
              </g>
            </svg>
          </div>
        </div>
        <div className="grow shrink basis-0 h-14 justify-start items-start gap-6 flex">
          <div className="text-center text-neutral-950 text-base font-semibold font-['Pretendard'] leading-tight">
            D-3
          </div>
          <div className="grow shrink basis-0 h-14 justify-between items-center flex">
            <div className="self-stretch flex-col justify-between items-start inline-flex">
              <div className="text-neutral-950 text-base font-semibold font-['Pretendard'] leading-tight">
                christmas party
              </div>
              <div className="justify-start items-center gap-[9px] inline-flex">
                <div className="px-3 py-1.5 bg-[#f4f4f4] rounded-xl justify-center items-center gap-2 flex">
                  <div className="text-[#686868] text-xs font-medium font-['Pretendard'] leading-[14px]">
                    2024. 12. 14
                  </div>
                  <div className="text-[#686868] text-xs font-medium font-['Pretendard'] leading-[14px]">
                    오후 4:00
                  </div>
                </div>
              </div>
            </div>
            <img
              className="w-14 h-14 rounded-xl"
              src="https://via.placeholder.com/56x56"
              alt="이미지"
            />
          </div>
        </div>
      </div>
      <div className="absolute border-l-[1px] border-[#E9E9E9] w-[350px] top-[680px] bottom-0 left-[10px]"></div>
      <NavBar />
    </div>
  );
}
