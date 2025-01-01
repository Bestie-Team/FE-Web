import { newGatheringInfo } from "@/atoms/gathering";
import { GatheringInfo, GatheringType } from "@/models/gathering";
import clsx from "clsx";
import React from "react";
import { useRecoilState } from "recoil";

const AnimatedTabButton = () => {
  const [selectedGathering, setSelectedGathering] =
    useRecoilState<GatheringInfo>(newGatheringInfo);

  const tabs = [
    { id: "friend", label: "일반 모임" },
    { id: "group", label: "그룹 모임" },
  ];

  return (
    <div className={styles.tabWrapper}>
      <div
        className={clsx(
          styles.slider,
          selectedGathering.type === "group"
            ? "translate-x-full"
            : "translate-x-0"
        )}
      />

      <div className="relative flex">
        {tabs.map((tab) => (
          <div
            key={tab.id}
            onClick={() =>
              setSelectedGathering((prev) => ({
                ...prev,
                type: tab.id as GatheringType,
              }))
            }
            className={clsx(
              styles.button,
              selectedGathering.type === tab.id
                ? "text-grayscale-900"
                : "text-grayscale-500 hover:text-grayscale-700"
            )}
          >
            {tab.label}
          </div>
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
