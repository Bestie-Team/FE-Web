"use client";

import { homeModalStateAtom } from "@/atoms/home";
import Gathering from "@/components/gathering/Gathering";
import GatheringSwiper from "@/components/gathering/GatheringSwiper";
import DateSlider from "@/components/home/DateSlider";
import FriendsSlider from "@/components/home/FriendsSlider";
import HomeBannerContainer from "@/components/home/HomeBannerContainer";
import Banner from "@/components/shared/Banner";
import Flex from "@/components/shared/Flex";
import ArrowRightIcon from "@/components/shared/Icon/ArrowRightIcon";
import Spacing from "@/components/shared/Spacing";
import useChangeHeaderStyle from "@/hooks/useChangeHeaderStyle";
import getHeader from "@/utils/getHeader";
import { useRecoilState } from "recoil";
import { useEffect, useMemo, useState } from "react";
import { getWeekDates } from "@/utils/getThisWeekDates";
import useGatherings from "@/components/gathering/hooks/useGatherings";
import { GatheringInWhich } from "@/models/gathering";
import MemoriesBottomSheet from "@/components/shared/BottomDrawer/MemoriesBottomSheet";
import WelcomeBottomSheet from "@/components/shared/BottomDrawer/WelcomeBottomSheet";
import FullPageLoader from "@/components/shared/FullPageLoader";

export default function HomePage() {
  useChangeHeaderStyle();
  const header = getHeader("/home");
  const [isModalOpen, setIsModalOpen] = useRecoilState(homeModalStateAtom);
  const [isNew, setIsNew] = useState(false);
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const refParam = urlParams.get("ref");

    if (refParam === "signup") {
      setIsNew(true);
      console.log("from signup");
    }
  }, []);

  const sevenDays = getWeekDates();
  const minDate = useMemo(() => new Date(sevenDays[0]).toISOString(), []);
  const maxDate = useMemo(() => new Date(sevenDays[6]).toISOString(), []);

  const {
    data: this_week,
    isFetching,
    isError,
  } = useGatherings({
    cursor: minDate,
    limit: 10,
    minDate,
    maxDate,
  });
  if (!this_week || isFetching || isError) return <FullPageLoader />;

  return (
    <div
      id="scrollable-container"
      className="bg-base-white overflow-y-scroll no-scrollbar"
    >
      {header}
      <HomeBannerContainer />
      <FriendsSlider />
      <Spacing size={40} />
      <DateSlider />
      <Spacing size={8} />
      {this_week ? (
        <GatheringSwiper percent={2.2} gatherings={this_week?.gatherings} />
      ) : null}
      <Banner />
      <Flex direction="column" align="center">
        <Flex className="w-full px-[20px]" align="center">
          <span className="text-T3 flex-grow">📝 추억을 기록해볼까요?</span>
          <ArrowRightIcon width="16" height="16" color="#808080" />
        </Flex>
        <Gathering where={GatheringInWhich.HOME} className="pt-[16px]" />
      </Flex>
      {isModalOpen && (
        <MemoriesBottomSheet
          onClose={() => {
            setIsModalOpen(false);
          }}
        />
      )}
      {isNew && <WelcomeBottomSheet onClose={() => setIsNew(false)} />}
      <Spacing size={87} />
    </div>
  );
}
