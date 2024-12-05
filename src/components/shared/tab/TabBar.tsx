import React, { useState } from "react";
import TabButton from "./TabButton";

export default function TabBar() {
  const [activeTab, setActiveTab] = useState("피드");
  console.log(activeTab);
  return (
    <div className={tabContainerStyle}>
      <div className={tabWrapperStyle}>
        <TabButton
          title="피드"
          className="cursor-pointer"
          onClick={() => setActiveTab("피드")}
          current={activeTab === "피드"}
          fresh={true}
        />
        <TabButton
          title="모아보기"
          className="cursor-pointer"
          onClick={() => setActiveTab("모아보기")}
          current={activeTab === "모아보기"}
          fresh={true}
        />
        <div
          className={`absolute bottom-0 w-[28px] h-[2px] bg-grayscale-900 transition-transform duration-300 ease-out ${
            activeTab === "피드"
              ? "translate-x-0"
              : "w-[53px] translate-x-[48px]"
          }`}
        ></div>
      </div>
    </div>
  );
}

const tabContainerStyle = "max-w-[430px] pl-[20px]";
const tabWrapperStyle = "relative flex gap-[16px]";
