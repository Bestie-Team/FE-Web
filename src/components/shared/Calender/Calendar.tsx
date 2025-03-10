import dynamic from "next/dynamic";
import "./CalendarWithBorder.css";
import { addDays, format } from "date-fns";
import ArrowRightIcon from "../Icon/ArrowRightIcon";
import ArrowLeftIcon from "../Icon/ArrowLeftIcon";
import { useRecoilState } from "recoil";
import { gatheringSelectedDateAtom } from "@/atoms/gathering";
import CalendarSkeleton from "./CalendarSkeleton";
import Flex from "../Flex";

const Calendar = dynamic(() => import("react-calendar"), {
  ssr: false,
  loading: () => <CalendarSkeleton />,
});

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

export default function LightyCalendar({
  originalDate,
}: {
  originalDate?: string;
}) {
  const [selectedDate, setSelectedDate] = useRecoilState<Value>(
    gatheringSelectedDateAtom
  );

  return (
    <Flex className="py-3" justify="center">
      <Calendar
        showNeighboringMonth
        minDate={addDays(new Date(), 1)}
        onChange={setSelectedDate}
        value={selectedDate}
        activeStartDate={!!originalDate ? new Date(originalDate) : undefined}
        formatDay={(locale, date) => format(date, "d")}
        prev2Label={null}
        next2Label={null}
        nextLabel={
          <div className="border border-grayscale-100 p-[7px] rounded-lg">
            <ArrowRightIcon width="14" height="14" color="#AEAEAE" />
          </div>
        }
        prevLabel={
          <div className="border border-grayscale-100 p-[7px] rounded-lg">
            <ArrowLeftIcon width="14" height="14" color="#AEAEAE" />
          </div>
        }
      />
    </Flex>
  );
}
