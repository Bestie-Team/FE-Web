import React from "react";
import Flex from "../shared/Flex";
import Spacing from "../shared/Spacing";
import CalendarColoredIcon from "../shared/icons/CalendarColoredIcon";
import ArrowRightIcon from "../shared/icons/ArrowRightIcon";
import DateItem from "./DateItem";
import { useRouter } from "next/navigation";
import getNext7Days from "@/utils/get7days";

export default function DateSlider() {
  const router = useRouter();
  const sevenDays = getNext7Days();

  return (
    <Flex direction="column">
      <Flex align="center" className={styles.titleWrapper}>
        <CalendarColoredIcon />
        <Spacing size={4} direction="horizontal" />
        <div className={styles.title}> 이번 주 모임</div>
        <div className="cursor-pointer" onClick={() => router.push("/home")}>
          <ArrowRightIcon />
        </div>
      </Flex>
      <Spacing size={12} />
      <Flex className={styles.dateWrapper} justify="space-between">
        {sevenDays.map(({ D, E }, i) => {
          return <DateItem date={D} day={E} key={i} />;
        })}
      </Flex>
    </Flex>
  );
}

const styles = {
  titleWrapper: "px-[20px] w-full",
  title: "text-T3 flex-grow",

  dateWrapper: "w-[330px] mx-auto my-0 px-0 py-[10px]",
};
