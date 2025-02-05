"use client";

import React, { useEffect, useState } from "react";
import "swiper/css";
import { gatheringModalStateAtom, newGatheringInfo } from "@/atoms/gathering";
import { useRecoilState, useResetRecoilState } from "recoil";
import clsx from "clsx";
import getHeader from "@/utils/getHeader";
import { useTabs } from "@/hooks/useTabs";
import MemoriesBottomSheet from "@/components/shared/BottomDrawer/MemoriesBottomSheet";
import useGatherings from "@/components/gathering/hooks/useGatherings";
import Panel from "@/components/shared/Panel/Panel";
import DotSpinner from "@/components/shared/Spinner/DotSpinner";
import Flex from "@/components/shared/Flex";
import FullPageLoader from "@/components/shared/FullPageLoader";
import dynamic from "next/dynamic";
import { maxDate, minDate } from "@/constants/time";
import useGatheringEnded from "@/components/gathering/hooks/useGatheringEnded";
import { useScrollThreshold } from "@/hooks/useScrollThreshold";

const Header = React.memo(
  ({
    shadow,
    selectedTab,
    handleTabClick,
  }: {
    shadow: boolean;
    selectedTab: "1" | "2";
    handleTabClick: (tab: "1" | "2") => void;
  }) => {
    return (
      <>
        {getHeader("/gathering")}
        <Flex
          id="filter"
          justify="space-between"
          className={clsx(styles.panelWrapper, shadow && "shadow-bottom")}
        >
          <Panel
            selectedTab={selectedTab}
            long="short"
            title1="예정"
            title2="완료"
            onClick={handleTabClick}
          />
        </Flex>
      </>
    );
  }
);

const GatheringPageSwiper = dynamic(
  () => import("../../components/gathering/GatheringPageSwiper"),
  {
    ssr: false,
  }
);

Header.displayName = "Header";

export default function MyGatheringPage() {
  const isPast = useScrollThreshold();
  const [isClient, setIsClient] = useState(false);
  const reset = useResetRecoilState(newGatheringInfo);
  const [modalOpen, setModalOpen] = useRecoilState(gatheringModalStateAtom);
  const { selectedTab, handleTabClick, handleSlideChange, swiperRef } =
    useTabs();

  const { data, isFetching, isError } = useGatherings({
    limit: 50,
    minDate: minDate(),
    maxDate: maxDate(),
  });
  const { data: ended } = useGatheringEnded({ limit: 30 });
  const myGatherings = data?.gatherings;

  useEffect(() => {
    reset();
  }, [reset]);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient || !ended) {
    return <FullPageLoader />;
  }

  return (
    <div className="h-full no-scrollbar">
      <Header
        shadow={isPast}
        selectedTab={selectedTab}
        handleTabClick={handleTabClick}
      />
      {isFetching || isError || !myGatherings || !ended ? (
        <DotSpinner />
      ) : (
        <GatheringPageSwiper
          expectingGatherings={myGatherings}
          endedGatherings={ended}
          selectedTab={selectedTab}
          swiperRef={swiperRef}
          onSlideChange={(index) => handleSlideChange(index)}
        />
      )}
      {modalOpen && <MemoriesBottomSheet onClose={() => setModalOpen(false)} />}
    </div>
  );
}

const styles = {
  panelWrapper:
    "pt-12 fixed max-w-[430px] px-5 flex w-full bg-base-white transition-shadow duration-300",
};
