import React, { useState } from "react";
import TabButton from "./TabButton";

export default function TabBar() {
  const [activeTab, setActiveTab] = useState("전체");
  console.log(activeTab);
  return (
    <div className={tabContainerStyle}>
      <div className={tabWrapperStyle}>
        <TabButton
          title="전체"
          className="cursor-pointer"
          onClick={() => setActiveTab("전체")}
          current={activeTab === "전체"}
          fresh={true}
        />
        <TabButton
          title="요청"
          className="cursor-pointer"
          onClick={() => setActiveTab("요청")}
          current={activeTab === "요청"}
          fresh={true}
        />
        <div
          className={`absolute bottom-0 w-[28px] h-[2px] bg-grayscale-900 transition-transform duration-300 ${
            activeTab === "전체" ? "translate-x-0" : "translate-x-[48px]"
          }`}
        ></div>
      </div>
    </div>
  );
}

const tabContainerStyle = "w-[390px] pl-[20px]";
const tabWrapperStyle = "relative flex gap-[16px]";
