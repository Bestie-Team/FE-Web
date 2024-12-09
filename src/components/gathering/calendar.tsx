"use client";

interface TodoItem {
  colorTag: string;
  status: number;
  targetDate: number;
  targetTime: string;
  todoId: number;
  todoText: string;
  userId: number;
  weeklyScheduleId: number;
}

/* eslint-disable @next/next/no-img-element */
import React, { useCallback, useState } from "react";
import { useStore } from "../../store/date";
import FixedBottomButton from "../shared/buttons/FixedBottomButton";

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

const MonthCalendar = ({
  setMonth,
  month,
}: {
  setMonth: (value: boolean) => void;
  month: boolean;
}) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [todoItems, setTodoItems] = useState<TodoItem[]>([]);

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

  // Updated getMonthCalendarDates function to show only current month dates
  const getMonthCalendarDates = (year: number, month: number) => {
    const dates = [];
    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);
    const lastDateOfMonth = lastDayOfMonth.getDate();

    // Create array of empty slots for days before the first day of the month
    const firstDayWeekday = firstDayOfMonth.getDay();
    for (let i = 0; i < firstDayWeekday; i++) {
      dates.push({ date: null, month: null, year: null });
    }

    // Add days from the current month
    for (let i = 1; i <= lastDateOfMonth; i++) {
      dates.push({ date: i, month: month, year: year });
    }

    // Add empty slots for remaining days in the last week
    const remainingDays = 7 - (dates.length % 7);
    if (remainingDays < 7) {
      for (let i = 0; i < remainingDays; i++) {
        dates.push({ date: null, month: null, year: null });
      }
    }

    return dates;
  };

  const getTodoStatusColor = useCallback(
    (date: Date | null) => {
      if (!date) return "";

      const dateString = `${date.getFullYear()}${String(
        date.getMonth() + 1
      ).padStart(2, "0")}${String(date.getDate()).padStart(2, "0")}`;

      const today = new Date();
      const todayString = `${today.getFullYear()}${String(
        today.getMonth() + 1
      ).padStart(2, "0")}${String(today.getDate()).padStart(2, "0")}`;

      const todosForDate = todoItems.filter(
        (item) => item.targetDate.toString() === dateString
      );

      if (todosForDate.length === 0) return "";

      if (dateString > todayString) {
        return "bg-gray-500";
      }

      const hasCompletedTodo = todosForDate.some((item) => item.status === 1);
      const hasInProgressTodo = todosForDate.some((item) => item.status === 0);

      if (hasCompletedTodo && !hasInProgressTodo) {
        return "bg-green-500";
      } else if (hasInProgressTodo) {
        return "bg-pink-500";
      }

      return "";
    },
    [todoItems]
  );

  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();

  return (
    <div className="bottom-0 fixed w-[430px] text-center h-[697px] mt-[33px] z-[101] bg-base-white rounded-tl-2xl rounded-tr-2xl pt-[25px]">
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
                <g id="icon">
                  <path
                    id="Vector"
                    d="M9.5 11.6667L5.10784 6.99923L9.5 2.33332"
                    stroke="#AEAEAE"
                    strokeWidth="1.16667"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </g>
              </svg>
            </div>
          </div>
        </button>
        <div className="font-bold min-w-[82px]">
          {` ${currentYear}년 ${monthNames[currentMonth]}`}
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
                <g id="icon">
                  <path
                    id="Vector"
                    d="M6 11.6667L10.3922 6.99923L6 2.33332"
                    stroke="#AEAEAE"
                    strokeWidth="1.16667"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </g>
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

            return (
              <div
                key={index}
                className={`relative w-8 h-8 flex items-center justify-center cursor-pointer`}
                onClick={() => handleDateClick(date, month, year)}
              >
                <div
                  className={`flex items-center justify-center w-8 h-8 rounded-full ${
                    isSelected
                      ? " border-[3px] border-transparent-black-100  text-base-white border-solid"
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
                </div>
              </div>
            );
          }
        )}
      </div>
    </div>
  );
};

export default MonthCalendar;
