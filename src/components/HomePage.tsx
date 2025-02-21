"use client";
import React, { useCallback, useEffect, useMemo } from "react";
import HomeBannerContainer from "./home/HomeBannerContainer";
import FriendsSlider from "./home/FriendsSlider";
import Spacing from "./shared/Spacing";
import DateSlider from "./home/DateSlider";
import GatheringSwiper from "./gathering/GatheringSwiper";
import Banner from "./shared/Banner";
import Flex from "./shared/Flex";
import ArrowRightIcon from "./shared/Icon/ArrowRightIcon";
import Gathering from "./gathering/Gathering";
import MemoriesBottomSheet from "./shared/BottomDrawer/MemoriesBottomSheet";
import WelcomeBottomSheet from "./shared/BottomDrawer/WelcomeBottomSheet";
import getHeader from "@/utils/getHeader";
import { useRecoilState } from "recoil";
import { homeModalStateAtom } from "@/atoms/home";
import { getWeekDates } from "@/utils/getThisWeekDates";
import useGatherings from "./gathering/hooks/useGatherings";
import FullPageLoader from "./shared/FullPageLoader";
import {
  Gathering as GatheringType,
  GatheringInWhich,
} from "@/models/gathering";
import { NoGatheringHome } from "./gathering/NoGathering";
import useGatheringNoFeeds from "./gathering/hooks/useGatheringNoFeed";
import useInfiniteScroll from "@/hooks/useInfiniteScroll";
import { useNewUserCheck } from "@/hooks/useNewUserCheck";

const Header = React.memo(() => {
  const header = getHeader("/");
  return <>{header}</>;
});

const MemoizedGatheringSwiper = React.memo(
  ({ gatherings }: { gatherings: GatheringType[] }) => (
    <GatheringSwiper percent={2.2} gatherings={gatherings} />
  )
);

const MemoizedGathering = React.memo(
  ({ gatherings }: { gatherings: GatheringType[] }) => (
    <Gathering
      ended={true}
      where={GatheringInWhich.HOME}
      className="pt-4"
      gatherings={gatherings}
    />
  )
);
Header.displayName = "Header";
MemoizedGatheringSwiper.displayName = "MemoizedGatheringSwiper";
MemoizedGathering.displayName = "MemoizedGathering";

export default function HomePage() {
  const [isModalOpen, setIsModalOpen] = useRecoilState(homeModalStateAtom);
  const { isNew, setIsNew } = useNewUserCheck();
  const sevenDays = useMemo(() => getWeekDates(), []);
  const minDate = useMemo(
    () => new Date(sevenDays[0]).toISOString(),
    [sevenDays]
  );
  const maxDate = useMemo(
    () => new Date(sevenDays[6]).toISOString(),
    [sevenDays]
  );
  const handleCloseMemoriesModal = useCallback(() => {
    setIsModalOpen(false);
  }, [setIsModalOpen]);

  const handleCloseWelcomeModal = useCallback(() => {
    setIsNew(false);
  }, [setIsNew]);

  const { data: this_week, isFetching } = useGatherings({
    cursor: { createdAt: minDate },
    limit: 10,
    minDate,
    maxDate,
  });

  const {
    data: ended,
    loadMore,
    isFetching: isFetching_f,
  } = useGatheringNoFeeds({ limit: 4 });

  useInfiniteScroll({ loadMore, isFetching: isFetching_f });

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const refParam = urlParams.get("ref");
    if (refParam === "signup") {
      setIsNew(true);
      console.log("from signup");
    }
  }, []);

  if (isFetching) return <FullPageLoader />;

  return (
    <div className="min-h-[calc(100dvh+57px)]">
      <Header />
      <HomeBannerContainer />
      <FriendsSlider />
      <Spacing size={40} />
      <DateSlider />
      <Spacing size={8} />
      {this_week ? <MemoizedGatheringSwiper gatherings={this_week} /> : null}
      <Banner />
      <Flex direction="column" align="center">
        <Flex className="w-full px-5" align="center">
          <span className="text-T3 flex-grow">📝 추억을 기록해볼까요?</span>
          <ArrowRightIcon width="16" height="16" color="#808080" />
        </Flex>
        {ended && ended.length > 0 ? (
          <MemoizedGathering gatherings={ended} />
        ) : (
          <Flex className="w-full px-5" direction="column" align="center">
            <NoGatheringHome />
            <Spacing size={187} />
          </Flex>
        )}
      </Flex>
      {isModalOpen && (
        <MemoriesBottomSheet onClose={handleCloseMemoriesModal} />
      )}
      {isNew && <WelcomeBottomSheet onClose={handleCloseWelcomeModal} />}
    </div>
  );
}
