"use client";
import React from "react";
import TabButton from "./TabButton";
import { RecoilState, useRecoilValue } from "recoil";
import clsx from "clsx";

export default function TabBar({
  title1,
  title2,
  long,
  onClick,
  bgColor,
  atom,
}: {
  title1?: string;
  title2?: string;
  long: "short" | "medium" | "long";
  bgColor?: string;
  onClick: (tabName: "1" | "2") => void;
  atom: RecoilState<any>;
}) {
  const selectedTab = useRecoilValue(atom);

  return (
    <div
      style={{
        backgroundColor: bgColor ? "#fff" : "",
      }}
      className={clsx(tabContainerStyle)}
    >
      <div className={tabWrapperStyle}>
        <TabButton
          title={title1 ?? "left"}
          onClick={() => onClick("1")}
          current={selectedTab === "1"}
          fresh={true}
        />
        <TabButton
          title={title2 ?? "mine"}
          onClick={() => onClick("2")}
          current={selectedTab === "2"}
          fresh={true}
        />
        {long === "long" && <LongBottomLine activeTab={selectedTab} />}
        {long === "medium" && <BottomLine activeTab={selectedTab} />}
        {long === "short" && <ShortBottomLine activeTab={selectedTab} />}
      </div>
    </div>
  );
}

const tabContainerStyle = "max-w-[430px] w-full";
const tabWrapperStyle = "relative flex gap-[16px]";

function BottomLine({ activeTab }: { activeTab: string }) {
  return (
    <div
      className={`absolute bottom-0 w-[28px] h-[2px] bg-grayscale-900 transition-transform duration-300 ease-out ${
        activeTab === "1" ? "translate-x-0" : "w-[53px] translate-x-[48px]"
      }`}
    />
  );
}

function LongBottomLine({ activeTab }: { activeTab: string }) {
  return (
    <div
      className={`absolute bottom-0 w-[58px] h-[2px] bg-grayscale-900 transition-transform duration-300 ease-out ${
        activeTab === "1" ? "translate-x-0" : "translate-x-[76px]"
      }`}
    />
  );
}

function ShortBottomLine({ activeTab }: { activeTab: string }) {
  return (
    <div
      className={`absolute bottom-0 w-[28px] h-[2px] bg-grayscale-900 transition-transform duration-300 ease-out ${
        activeTab === "1" ? "translate-x-0" : "translate-x-[46px]"
      }`}
    />
  );
}
