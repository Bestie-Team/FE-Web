import {
  feedTabState,
  gatheringTabState,
  invitationTabState,
} from "@/atoms/tab";
import { usePathname } from "next/navigation";
import { useRef } from "react";
import { useRecoilState } from "recoil";
import { Swiper as SwiperType } from "swiper";

const getTabAtomForPath = (path: string) => {
  if (path.startsWith("/gathering")) {
    return gatheringTabState;
  } else if (path.startsWith("/feed")) {
    return feedTabState;
  } else if (path.startsWith("/invitation")) {
    return invitationTabState;
  }
  return feedTabState;
};

export const useTabs = () => {
  const pathname = usePathname();
  const tabAtom = getTabAtomForPath(pathname || "");
  const [selectedTab, setSelectedTab] = useRecoilState(tabAtom);

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

  return {
    selectedTab,
    handleTabClick,
    handleSlideChange,
    swiperRef,
    setSelectedTab,
  };
};
