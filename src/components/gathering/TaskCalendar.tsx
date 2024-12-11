"use client";

/* eslint-disable @next/next/no-img-element */
import React, { useCallback, useState } from "react";
import { useStore } from "../../store/date";

const monthNames = [
  "1월",
  "2월",
  "3월",
  "4월",
  "5월",
  "6월",
  "7월",
  "8월",
  "9월",
  "10월",
  "11월",
  "12월",
];

// 특정 날짜 배열을 prop으로 받도록 수정
export default function TaskCalendar({
  highlightedDates = [],
}: {
  highlightedDates?: Date[];
}) {
  const [currentDate, setCurrentDate] = useState(new Date());

  const selectedDate = useStore((state) => state.selectedDate);
  const setSelectedDate = useStore((state) => state.setSelectedDate);

  const handlePrevMonth = useCallback(() => {
    setCurrentDate((prevDate) => {
      const newDate = new Date(prevDate);
      newDate.setMonth(newDate.getMonth() - 1);
      return newDate;
    });
  }, []);

  const handleNextMonth = useCallback(() => {
    setCurrentDate((prevDate) => {
      const newDate = new Date(prevDate);
      newDate.setMonth(newDate.getMonth() + 1);
      return newDate;
    });
  }, []);

  const handleDateClick = useCallback(
    (day: number, month: number, year: number) => {
      const newSelectedDate = new Date(year, month, day);
      setSelectedDate(newSelectedDate);
    },
    [setSelectedDate]
  );

  // 날짜가 강조 표시되어야 하는지 확인하는 함수
  const isHighlightedDate = (date: number, month: number, year: number) => {
    return highlightedDates.some(
      (highlightedDate) =>
        highlightedDate.getDate() === date &&
        highlightedDate.getMonth() === month &&
        highlightedDate.getFullYear() === year
    );
  };

  const getMonthCalendarDates = (year: number, month: number) => {
    const dates = [];
    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);
    const lastDateOfMonth = lastDayOfMonth.getDate();

    const firstDayWeekday = firstDayOfMonth.getDay();
    for (let i = 0; i < firstDayWeekday; i++) {
      dates.push({ date: null, month: null, year: null });
    }

    for (let i = 1; i <= lastDateOfMonth; i++) {
      dates.push({ date: i, month: month, year: year });
    }

    const remainingDays = 7 - (dates.length % 7);
    if (remainingDays < 7) {
      for (let i = 0; i < remainingDays; i++) {
        dates.push({ date: null, month: null, year: null });
      }
    }

    return dates;
  };

  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();

  return (
    <div
      className="rounded-[20px] h-full border border-[#e8e8e8] w-[350px] text-center mt-[33px] z-[101] bg-base-white rounded-tl-2xl rounded-tr-2xl px-[24px] py-[32px]"
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <div className="flex items-center justify-center bg-gray-100 rounded-t-lg w-full mb-[24px]">
        <button
          onClick={handlePrevMonth}
          className="text-gray-600 hover:text-gray-900 mr-[24px]"
        >
          <div className="w-7 h-7 p-[7px] bg-white rounded-lg border border-[#e8e8e8] justify-center items-center inline-flex">
            <div className="w-3.5 h-3.5 relative flex-col justify-start items-start flex">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="15"
                height="14"
                viewBox="0 0 15 14"
                fill="none"
              >
                <path
                  d="M9.5 11.6667L5.10784 6.99923L9.5 2.33332"
                  stroke="#AEAEAE"
                  strokeWidth="1.16667"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
        </button>
        <div className="font-bold min-w-[82px]">
          {`${currentYear}년 ${monthNames[currentMonth]}`}
        </div>
        <button
          onClick={handleNextMonth}
          className="text-gray-600 hover:text-gray-900 ml-[24px]"
        >
          <div className="w-7 h-7 p-[7px] bg-white rounded-lg border border-[#e8e8e8] justify-center items-center inline-flex">
            <div className="w-3.5 h-3.5 relative flex-col justify-start items-start flex">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="15"
                height="14"
                viewBox="0 0 15 14"
                fill="none"
              >
                <path
                  d="M6 11.6667L10.3922 6.99923L6 2.33332"
                  stroke="#AEAEAE"
                  strokeWidth="1.16667"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
        </button>
      </div>
      <div className="grid grid-cols-7 gap-2 text-xs p-2 px-[13px]">
        {["일", "월", "화", "수", "목", "금", "토"].map((day) => (
          <div key={day} className="text-[#aeaeae]">
            {day}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-2 p-2 px-[13px] rounded-b-lg place-items-center">
        {getMonthCalendarDates(currentYear, currentMonth).map(
          ({ date, month, year }, index) => {
            if (date === null) {
              return <div key={index} className="w-[30px] h-[35px]"></div>;
            }

            const isSelected =
              selectedDate &&
              selectedDate.getFullYear() === year &&
              selectedDate.getMonth() === month &&
              selectedDate.getDate() === date;

            const isHighlighted = isHighlightedDate(date, month, year);

            return (
              <div
                key={index}
                className={`relative w-8 h-8 flex items-center justify-center cursor-pointer`}
                onClick={() => handleDateClick(date, month, year)}
              >
                <div
                  className={`flex items-center justify-center w-8 h-8 rounded-full ${
                    isSelected
                      ? "border-[3px] border-transparent-black-100 text-base-white border-solid"
                      : isHighlighted
                      ? "text-[#0A0A0A] text-center text-neutral-950 text-sm font-semibold font-['Pretendard'] leading-[18.20px]"
                      : "text-[#d8d8d8]"
                  }`}
                >
                  {isSelected ? (
                    <div className="flex justify-center items-center absolute w-6 h-6 bg-transparent-black-100 rounded-full bottom-[4px] left-[4px] text-[14px]">
                      {date}
                    </div>
                  ) : (
                    <div>{date}</div>
                  )}
                  {isHighlighted && (
                    <div className="absolute -bottom-[8px]">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="8"
                        height="8"
                        viewBox="0 0 8 8"
                        fill="none"
                      >
                        <path
                          d="M4 1L4.81027 3.18973L7 4L4.81027 4.81027L4 7L3.18973 4.81027L1 4L3.18973 3.18973L4 1Z"
                          fill="#0A0A0A"
                        />
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M4 0C4.23911 0 4.45294 0.148873 4.53591 0.373122L5.37076 2.62924L7.62688 3.46408C7.85113 3.54706 8 3.76089 8 4C8 4.23911 7.85113 4.45294 7.62688 4.53592L5.37076 5.37076L4.53591 7.62688C4.45294 7.85113 4.23911 8 4 8C3.76089 8 3.54706 7.85113 3.46408 7.62688L2.62924 5.37076L0.373122 4.53592C0.148873 4.45294 3.40598e-08 4.23911 0 4C0 3.76089 0.148873 3.54706 0.373122 3.46408L2.62924 2.62924L3.46408 0.373122C3.54706 0.148873 3.76089 0 4 0ZM4 2.21802L3.60989 3.27228C3.55201 3.42869 3.42869 3.55201 3.27228 3.60989L2.21802 4L3.27228 4.39011C3.42869 4.44799 3.55201 4.57131 3.60989 4.72772L4 5.78198L4.39011 4.72772C4.44799 4.57131 4.57131 4.44799 4.72772 4.39011L5.78198 4L4.72772 3.60989C4.57131 3.55201 4.44799 3.42869 4.39011 3.27228L4 2.21802Z"
                          fill="#0A0A0A"
                        />
                      </svg>
                    </div>
                  )}
                </div>
              </div>
            );
          }
        )}
      </div>
    </div>
  );
}
