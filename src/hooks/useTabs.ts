import { useEffect, useRef, useState } from "react";
import { Swiper as SwiperType } from "swiper";

export const useTabs = () => {
  const [selectedTab, setSelectedTab] = useState<"1" | "2">("1");
  const swiperRef = useRef<SwiperType | null>(null);

  const handleSlideChange = (index: number) => {
    setSelectedTab(String(index + 1) as "1" | "2");
  };

  const handleTabClick = (tabName: "1" | "2") => {
    if (swiperRef.current) {
      swiperRef.current.slideTo(Number(tabName) - 1);
    }

    setTimeout(() => {
      setSelectedTab(tabName);
    }, 300);
  };

  useEffect(() => {
    return () => {
      setSelectedTab("1");
    };
  }, [setSelectedTab]);

  return {
    selectedTab,
    handleTabClick,
    handleSlideChange,
    swiperRef,
  };
};
