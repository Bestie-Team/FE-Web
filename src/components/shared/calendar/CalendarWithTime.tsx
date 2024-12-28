"use client";
import clsx from "clsx";
import Button from "../buttons";
import Flex from "../Flex";
import Spacing from "../Spacing";
import LightyCalendar from "./Calendar";
import { TIMES } from "@/constants/time";
import { useRecoilState } from "recoil";
import {
  gatheringSelectedAmpm,
  gatheringSelectedTime,
} from "@/atoms/gathering";

export default function CalendarWithTime() {
  const [ampm, setAmpm] = useRecoilState<"오전" | "오후">(
    gatheringSelectedAmpm
  );
  const [selectedTime, setSelectedTime] = useRecoilState<string>(
    gatheringSelectedTime
  );
  return (
    <Flex direction="column" className="w-[340px]">
      <LightyCalendar />
      <Spacing size={16} />
      <Flex className="px-[12px]">
        <Button
          onClick={() => setAmpm("오전")}
          className={clsx(
            styles.button,
            ampm === "오전"
              ? "bg-grayscale-900 text-base-white border-grayscale-900"
              : "text-grayscale-600 border-grayscale-100"
          )}
        >
          오전
        </Button>
        <Spacing direction="horizontal" size={8} />
        <Button
          onClick={() => setAmpm("오후")}
          className={clsx(
            styles.button,
            ampm === "오후"
              ? "bg-grayscale-900 text-base-white border-grayscale-900"
              : "text-grayscale-600 border-grayscale-100"
          )}
        >
          오후
        </Button>
      </Flex>
      <div className="w-[326px] h-[1px] bg-grayscale-50 my-[16px] mx-[12px]" />
      <Flex className="gap-[8px] overflow-x-scroll no-scrollbar px-[12px]">
        {TIMES.map((time, idx) => (
          <Button
            key={idx}
            onClick={() => setSelectedTime(time)}
            className={clsx(
              styles.button,
              time === selectedTime
                ? "bg-grayscale-900 text-base-white border-grayscale-900"
                : "text-grayscale-600 border-grayscale-100"
            )}
          >
            {time}
          </Button>
        ))}
      </Flex>
    </Flex>
  );
}

const styles = {
  button: "py-[10px] px-[18px] rounded-[40px] text-B4 border",
};