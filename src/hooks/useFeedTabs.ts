import { feedAnimationStatusAtom, feedSelectedTabAtom } from "@/atoms/feed";
import { useRef } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { Swiper as SwiperType } from "swiper";

export const useFeedTabs = () => {
  const [selectedTab, setSelectedTab] = useRecoilState(feedSelectedTabAtom);
  const setAnimateTab = useSetRecoilState(feedAnimationStatusAtom);
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
