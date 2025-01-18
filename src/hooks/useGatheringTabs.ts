import { useRef } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { Swiper as SwiperType } from "swiper";
import {
  gatheringSelectedTabAtom,
  gatheringAnimationStatusAtom,
} from "@/atoms/gathering";

export const useGatheringTabs = () => {
  const [selectedTab, setSelectedTab] = useRecoilState(
    gatheringSelectedTabAtom
  );
  const setAnimateTab = useSetRecoilState(gatheringAnimationStatusAtom);
  const swiperRef = useRef<SwiperType | null>(null);

  const handleSlideChange = (index: number) => {
    setSelectedTab(String(index + 1) as "1" | "2");
  };

  const handleTabClick = (tabName: "1" | "2") => {
    if (swiperRef.current) {
      swiperRef.current.slideTo(Number(tabName) - 1);
    }

    setAnimateTab(true);
    setTimeout(() => {
      setSelectedTab(tabName);
      setAnimateTab(false);
    }, 300);
  };

  return {
    selectedTab,
    handleTabClick,
    handleSlideChange,
    swiperRef,
  };
};
