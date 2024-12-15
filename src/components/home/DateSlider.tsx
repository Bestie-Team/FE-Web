import React from "react";
import Flex from "../shared/Flex";
import Spacing from "../shared/Spacing";
import CalendarColoredIcon from "../shared/icons/CalendarColoredIcon";
import ArrowRightIcon from "../shared/icons/ArrowRightIcon";
import DateItem from "./DateItem";

export default function DateSlider() {
  return (
    <Flex direction="column">
      <Flex
        align="center"
        style={{ paddingLeft: "20px", paddingRight: "20px", width: "full" }}
      >
        <CalendarColoredIcon />
        <Spacing size={4} direction="horizontal" />
        <div className="text-T3 flex-grow"> 이번 주 모임</div>
        <ArrowRightIcon />
      </Flex>
      <Spacing size={12} />
      <Flex
        justify="space-between"
        style={{
          width: "330px",
          overflowX: "scroll",
          scrollbarWidth: "none",
          margin: "0 auto",
          padding: "10px 0",
        }}
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
