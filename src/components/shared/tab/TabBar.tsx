"use client";
import React, { useState } from "react";
import TabButton from "./TabButton";

export default function TabBar({
  title1,
  title2,
  long = false,
}: {
  title1?: string;
  title2?: string;
  long?: boolean;
}) {
  const [activeTab, setActiveTab] = useState("left");

  return (
    <div className={tabContainerStyle}>
      <div className={tabWrapperStyle}>
        <TabButton
          title={title1 ?? "left"}
          className="cursor-pointer"
          onClick={() => setActiveTab("left")}
          current={activeTab === "left"}
          fresh={true}
        />
        <TabButton
          title={title2 ?? "right"}
          className="cursor-pointer"
          onClick={() => setActiveTab("right")}
          current={activeTab === "right"}
          fresh={true}
        />
        {long === true ? (
          <LongBottomLine activeTab={activeTab} />
        ) : (
          <BottomLine activeTab={activeTab} />
        )}
      </div>
    </div>
  );
}

const tabContainerStyle = "bg-base-white max-w-[430px] w-full";
const tabWrapperStyle = "relative flex gap-[16px]";

function BottomLine({ activeTab }: { activeTab: string }) {
  return (
    <div
      className={`absolute bottom-0 w-[28px] h-[2px] bg-grayscale-900 transition-transform duration-300 ease-out ${
        activeTab === "left" ? "translate-x-0" : "w-[53px] translate-x-[48px]"
      }`}
    />
  );
}

function LongBottomLine({ activeTab }: { activeTab: string }) {
  return (
    <div
      className={`absolute bottom-0 w-[58px] h-[2px] bg-grayscale-900 transition-transform duration-300 ease-out ${
        activeTab === "left" ? "translate-x-0" : "translate-x-[76px]"
      }`}
    />
  );
}
