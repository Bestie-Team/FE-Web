import React, { useState } from "react";
import TabButton from "../shared/tab/TabButton";

export default function TabBar() {
  const [activeTab, setActiveTab] = useState("예정");

  return (
    <div className={tabContainerStyle}>
      <div className={tabWrapperStyle}>
        <TabButton
          title="예정"
          className="cursor-pointer"
          onClick={() => setActiveTab("예정")}
          current={activeTab === "예정"}
          fresh={true}
        />
        <TabButton
          title="완료"
          className="cursor-pointer"
          onClick={() => setActiveTab("완료")}
          current={activeTab === "완료"}
          fresh={true}
        />
        <div
          className={`absolute bottom-0 w-[28px] h-[2px] bg-grayscale-900 transition-transform duration-300 ease-out ${
            activeTab === "예정"
              ? "translate-x-0"
              : "w-[28px] translate-x-[48px]"
          }`}
        ></div>
      </div>
    </div>
  );
}

const tabContainerStyle = "max-w-[430px] pl-[20px]";
const tabWrapperStyle = "relative flex gap-[16px]";
