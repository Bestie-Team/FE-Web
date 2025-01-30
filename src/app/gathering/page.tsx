"use client";

import React, { useEffect, useState } from "react";
import "swiper/css";
import { gatheringModalStateAtom, newGatheringInfo } from "@/atoms/gathering";
import { useRecoilState, useRecoilValue, useResetRecoilState } from "recoil";
import clsx from "clsx";
import getHeader from "@/utils/getHeader";
import { useTabs } from "@/hooks/useTabs";
import MemoriesBottomSheet from "@/components/shared/BottomDrawer/MemoriesBottomSheet";
import useGatherings from "@/components/gathering/hooks/useGatherings";
import Panel from "@/components/shared/Panel/Panel";
import NoGathering from "@/components/gathering/NoGathering";
import DotSpinner from "@/components/shared/Spinner/DotSpinner";
import Flex from "@/components/shared/Flex";
import { scrollProgressAtom } from "@/atoms/scroll";
import FullPageLoader from "@/components/shared/FullPageLoader";
import dynamic from "next/dynamic";
import { maxDate, minDate } from "@/constants/time";

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
  const [isClient, setIsClient] = useState(false);
  const reset = useResetRecoilState(newGatheringInfo);
  const [modalOpen, setModalOpen] = useRecoilState(gatheringModalStateAtom);
  const { selectedTab, handleTabClick, handleSlideChange, swiperRef } =
    useTabs();
  const scrollProgress = useRecoilValue(scrollProgressAtom);

  const { data, isFetching, isError } = useGatherings({
    cursor: minDate(),
    limit: 50,
    minDate: minDate(),
    maxDate: maxDate(),
  });

  const myGatherings = data?.gatherings;

  useEffect(() => {
    reset();
  }, [reset]);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return <FullPageLoader />;
  }

  return (
    <div>
      <Header
        shadow={scrollProgress > 0.01}
        selectedTab={selectedTab}
        handleTabClick={handleTabClick}
      />
      {isFetching || isError ? (
        <DotSpinner />
      ) : myGatherings && myGatherings.length > 0 ? (
        <GatheringPageSwiper
          myGatherings={myGatherings}
          selectedTab={selectedTab}
          swiperRef={swiperRef}
          onSlideChange={(index) => handleSlideChange(index)}
        />
      ) : (
        <NoGathering />
      )}
      {modalOpen && <MemoriesBottomSheet onClose={() => setModalOpen(false)} />}
    </div>
  );
}

const styles = {
  panelWrapper:
    "pt-12 fixed max-w-[430px] px-5 flex w-full bg-base-white transition-shadow duration-300",
};
