"use client";
import dynamic from "next/dynamic";
import "./CalendarWithBorder.css";
import { format } from "date-fns";
import ArrowRightIcon from "../icons/ArrowRightIcon";
import ArrowLeftIcon from "../icons/ArrowLeftIcon";
import { useRecoilState } from "recoil";
import { gatheringSelectedDateAtom } from "@/atoms/gathering";
import LightyIcon from "../icons/LightyIcon";
import Flex from "../Flex";
import React from "react";

const Calendar = dynamic(() => import("react-calendar"), {
  ssr: false,
});

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

export default function LightyCalendarWithBorder() {
  const [selectedDate, setSelectedDate] = useRecoilState<Value>(
    gatheringSelectedDateAtom
  );
  const datesWithIcons = [
    new Date(2025, 0, 2),
    new Date(2025, 0, 15),
    new Date(2025, 0, 30),
  ];

  const renderIcon = (date: Date) => {
    const isSpecialDate = datesWithIcons.some(
      (specialDate) =>
        specialDate.getFullYear() === date.getFullYear() &&
        specialDate.getMonth() === date.getMonth() &&
        specialDate.getDate() === date.getDate()
    );

    return isSpecialDate ? (
      <Flex justify="center" className="!z-999 w-full absolute bottom-[-10px]">
        <LightyIcon width="8" height="8" color="#0A0A0A" />
      </Flex>
    ) : null;
  };

  const returnClassName = (date: Date) => {
    const isSpecialDate = datesWithIcons.some(
      (specialDate) =>
        specialDate.getFullYear() === date.getFullYear() &&
        specialDate.getMonth() === date.getMonth() &&
        specialDate.getDate() === date.getDate()
    );

    return isSpecialDate ? "special-date !overflow-visible" : null;
  };

  return (
    <Calendar
      tileClassName={({ date, view }) => {
        if (view === "month") {
          return returnClassName(date);
        }
        return null;
      }}
      tileContent={({ date, view }) => {
        if (view === "month") {
          return renderIcon(date);
        }
        return null;
      }}
      onChange={setSelectedDate}
      value={selectedDate}
      formatDay={(locale, date) => format(date, "d")}
      showNeighboringMonth={false}
      prev2Label={null}
      next2Label={null}
      nextLabel={
        <div className={iconWrapper}>
          <ArrowRightIcon width="14" height="14" color="#AEAEAE" />
        </div>
      }
      prevLabel={
        <div className={iconWrapper}>
          <ArrowLeftIcon width="14" height="14" color="#AEAEAE" />
        </div>
      }
    />
  );
}

const iconWrapper = "border border-[#E9E9E9] p-[7px] rounded-[8px]";
