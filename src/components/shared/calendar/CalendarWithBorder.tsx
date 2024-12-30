"use client";
import dynamic from "next/dynamic";
import "./CalendarWithBorder.css";
import { format } from "date-fns";
import ArrowRightIcon from "../icons/ArrowRightIcon";
import ArrowLeftIcon from "../icons/ArrowLeftIcon";
import { useRecoilState } from "recoil";
import { gatheringSelectedDateAtom } from "@/atoms/gathering";

const Calendar = dynamic(() => import("react-calendar"), {
  ssr: false,
});

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

export default function LightyCalendarWithBorder() {
  const [selectedDate, setSelectedDate] = useRecoilState<Value>(
    gatheringSelectedDateAtom
  );

  return (
    <Calendar
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
