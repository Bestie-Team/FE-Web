"use client";
import dynamic from "next/dynamic";
import "./Calendar.css";
import { format } from "date-fns";
import ArrowRightIcon from "../Icon/ArrowRightIcon";
import ArrowLeftIcon from "../Icon/ArrowLeftIcon";
import { useRecoilState } from "recoil";
import { gatheringSelectedDateAtom } from "@/atoms/gathering";

const Calendar = dynamic(() => import("react-calendar"), {
  ssr: false,
});

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

export default function LightyCalendar() {
  const [selectedDate, setSelectedDate] = useRecoilState<Value>(
    gatheringSelectedDateAtom
  );
  console.log(selectedDate);
  return (
    <Calendar
      showNeighboringMonth
      onChange={setSelectedDate}
      value={selectedDate}
      formatDay={(locale, date) => format(date, "d")}
      prev2Label={null}
      next2Label={null}
      nextLabel={
        <div className="border border-[#E9E9E9] p-[7px] rounded-[8px]">
          <ArrowRightIcon width="14" height="14" color="#AEAEAE" />
        </div>
      }
      prevLabel={
        <div className="border border-[#E9E9E9] p-[7px] rounded-[8px]">
          <ArrowLeftIcon width="14" height="14" color="#AEAEAE" />
        </div>
      }
    />
  );
}
