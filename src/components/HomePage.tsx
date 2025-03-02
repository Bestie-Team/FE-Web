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
import {
  Gathering as GatheringType,
  GatheringInWhich,
} from "@/models/gathering";
import { NoGatheringHome } from "./gathering/NoGathering";
import useGatheringNoFeeds from "./gathering/hooks/useGatheringNoFeed";
import useInfiniteScroll from "@/hooks/useInfiniteScroll";
import { useNewUserCheck } from "@/hooks/useNewUserCheck";
import useNotification from "./notice/hooks/useNotification";
import { useRouter } from "next/navigation";

const Header = React.memo(() => {
  const header = getHeader("/");
  return <>{header}</>;
});

const MemoizedGatheringSwiper = React.memo(
  ({
    gatherings,
    isFetching,
  }: {
    gatherings?: GatheringType[];
    isFetching: boolean;
  }) => (
    <GatheringSwiper
      percent={2.2}
      gatherings={gatherings}
      isFetching={isFetching}
    />
  )
);

const MemoizedGathering = React.memo(
  ({
    gatherings,
    isFetching,
  }: {
    gatherings?: GatheringType[];
    isFetching: boolean;
  }) => {
    if (!gatherings)
      return (
        <Flex className="w-full px-5" direction="column" align="center">
          <NoGatheringHome />
          <Spacing size={187} />
        </Flex>
      );
    else
      return (
        <Gathering
          isFetching={isFetching}
          ended={true}
          where={GatheringInWhich.HOME}
          className="pt-4"
          gatherings={gatherings}
        />
      );
  }
);
Header.displayName = "Header";
MemoizedGatheringSwiper.displayName = "MemoizedGatheringSwiper";
MemoizedGathering.displayName = "MemoizedGathering";

export default function HomePage() {
  const [isModalOpen, setIsModalOpen] = useRecoilState(homeModalStateAtom);
  const router = useRouter();
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
    router.push("/");
  }, [setIsNew]);

  const { data: this_week, isFetching } = useGatherings({
    cursor: { createdAt: maxDate },
    limit: 50,
    minDate,
    maxDate,
  });

  const {
    data: ended,
    loadMore,
    isFetching: isFetching_f,
  } = useGatheringNoFeeds({ limit: 4 });

  const { data: noti } = useNotification();
  console.log(noti, "noti");

  useInfiniteScroll({ loadMore, isFetching: isFetching_f });

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const refParam = urlParams.get("ref");
    if (refParam === "signup") {
      setIsNew(true);
      console.log("from signup");
    }
  }, []);

  return (
    <div className="min-h-dvh">
      <Header />
      <HomeBannerContainer />
      <FriendsSlider />
      <Spacing size={40} />
      {this_week ? (
        <DateSlider this_week={this_week} sevenDays={sevenDays} />
      ) : null}
      <Spacing size={8} />
      <MemoizedGatheringSwiper gatherings={this_week} isFetching={isFetching} />
      <Banner />
      <Flex direction="column" align="center">
        <Flex className="w-full px-5" align="center">
          <span className="text-T3 flex-grow">📝 추억을 기록해볼까요?</span>
          <ArrowRightIcon width="16" height="16" color="#808080" />
        </Flex>
        <MemoizedGathering gatherings={ended} isFetching={isFetching_f} />
      </Flex>
      {isModalOpen && (
        <MemoriesBottomSheet onClose={handleCloseMemoriesModal} />
      )}
      {isNew && <WelcomeBottomSheet onClose={handleCloseWelcomeModal} />}
    </div>
  );
}
