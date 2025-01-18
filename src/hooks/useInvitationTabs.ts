import { animationStatusAtom } from "@/atoms/invitation";
import { useRef, useState } from "react";
import { useSetRecoilState } from "recoil";
import { Swiper as SwiperType } from "swiper";

export const useInvitationTabs = () => {
  const [selectedTab, setSelectedTab] = useState<"1" | "2">("1");
  const setAnimateTab = useSetRecoilState(animationStatusAtom);
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
