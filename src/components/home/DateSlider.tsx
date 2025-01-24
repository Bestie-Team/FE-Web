import React from "react";
import Flex from "../shared/Flex";
import Spacing from "../shared/Spacing";
import CalendarColoredIcon from "../shared/Icon/CalendarColoredIcon";
import ArrowRightIcon from "../shared/Icon/ArrowRightIcon";
import DateItem from "./DateItem";
import { getWeekDates } from "@/utils/getThisWeekDates";
import { addHours, getDate, getDay } from "date-fns";
import Link from "next/link";
import useGatherings from "../gathering/hooks/useGatherings";
import DotSpinner from "../shared/Spinner/DotSpinner";

export default function DateSlider() {
  const sevenDays = getWeekDates();

  const min = new Date(sevenDays[0]);
  min.setUTCHours(0, 0, 0, 0);
  const minDate = min.toISOString();

  const max = new Date(sevenDays[6]);
  max.setUTCHours(0, 0, 0, 0);
  const maxDate = max.toISOString();

  const {
    data: this_week,
    isFetching,
    isError,
  } = useGatherings({
    cursor: minDate,
    limit: 10,
    minDate,
    maxDate,
  });

  const gatherings_this_week = this_week?.gatherings;

  const gathering_days = gatherings_this_week?.map((gatherings) =>
    getDate(addHours(new Date(gatherings.gatheringDate), 9))
  );

  const DAYS_IN_KOREAN = ["일", "월", "화", "수", "목", "금", "토"];

  return (
    <Flex direction="column">
      <Flex align="center" className={styles.titleWrapper}>
        <CalendarColoredIcon />
        <Spacing size={4} direction="horizontal" />
        <div className={styles.title}> 이번 주 약속</div>
        <Link className="cursor-pointer" href={"/schedule"}>
          <ArrowRightIcon />
        </Link>
      </Flex>
      <Spacing size={12} />
      {isFetching || isError ? (
        <DotSpinner />
      ) : (
        <Flex className={styles.dateWrapper} justify="space-between">
          {sevenDays.map((date, i) => {
            return (
              <DateItem
                date={getDate(date)}
                day={DAYS_IN_KOREAN[getDay(date)]}
                key={i}
                icon={gathering_days?.includes(getDate(date))}
              />
            );
          })}
        </Flex>
      )}
    </Flex>
  );
}

const styles = {
  titleWrapper: "px-[20px] w-full",
  title: "text-T3 flex-grow",

  dateWrapper: "w-[330px] mx-auto my-0 px-0 py-[10px]",
};
