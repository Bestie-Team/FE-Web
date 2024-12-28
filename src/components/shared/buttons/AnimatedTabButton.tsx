import { selectedGatheringTypeAtom } from "@/atoms/gathering";
import { GatheringType } from "@/models/gathering";
import clsx from "clsx";
import React from "react";
import { useRecoilState } from "recoil";

const AnimatedTabButton = () => {
  const [selectedTab, setSelectedTab] = useRecoilState<GatheringType>(
    selectedGatheringTypeAtom
  );

  const tabs = [
    { id: "normal", label: "일반 모임" as GatheringType },
    { id: "group", label: "그룹 모임" as GatheringType },
  ];

  return (
    <div className={styles.tabWrapper}>
      <div
        className={clsx(
          styles.slider,
          selectedTab === "그룹 모임" ? "translate-x-full" : "translate-x-0"
        )}
      />

      <div className="relative flex">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setSelectedTab(tab.label)}
            className={clsx(
              styles.button,
              selectedTab === tab.label
                ? "text-grayscale-900"
                : "text-grayscale-500 hover:text-grayscale-700"
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default AnimatedTabButton;

const styles = {
  tabWrapper: "relative p-1 bg-grayscale-10 rounded-full w-[158px]",

  slider:
    "absolute h-8 w-[75px] py-[10px] bg-white rounded-full shadow-md transition-transform duration-300 ease-in-out",

  button:
    "flex items-center h-8 px-4 py-[10px] rounded-full text-C1 transition-colors duration-300 z-10",
};
