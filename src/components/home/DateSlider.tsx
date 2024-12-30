import React from "react";
import Flex from "../shared/Flex";
import Spacing from "../shared/Spacing";
import CalendarColoredIcon from "../shared/icons/CalendarColoredIcon";
import ArrowRightIcon from "../shared/icons/ArrowRightIcon";
import DateItem from "./DateItem";
import { useRouter } from "next/navigation";

export default function DateSlider() {
  const router = useRouter();
  return (
    <Flex direction="column">
      <Flex align="center" className="px-[20px] w-full">
        <CalendarColoredIcon />
        <Spacing size={4} direction="horizontal" />
        <div className="text-T3 flex-grow"> 이번 주 모임</div>
        <div className="cursor-pointer" onClick={() => router.push("/home")}>
          <ArrowRightIcon />
        </div>
      </Flex>
      <Spacing size={12} />
      <Flex
        className="w-[330px] mx-auto my-0 px-0 py-[10px]"
        justify="space-between"
      >
        <DateItem />
        <DateItem />
        <DateItem />
        <DateItem />
        <DateItem />
        <DateItem />
        <DateItem />
      </Flex>
    </Flex>
  );
}
