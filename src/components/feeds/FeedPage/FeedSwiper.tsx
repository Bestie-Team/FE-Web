import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import PullToRefresh from "react-simple-pull-to-refresh";
import FeedForDisplay from "@/components/feeds/FeedForDisplay";
import NoFeed from "@/components/feeds/NoFeed";
import DotSpinnerSmall from "@/components/shared/Spinner/DotSpinnerSmall";
import Spacing from "@/components/shared/Spacing";
import { FeedList } from "./FeedList";
import LoadMoreTrigger from "../../shared/LoadMoreTrigger";
import type { Feed } from "@/models/feed";

interface FeedSwiperProps {
  feedAll?: Feed[];
  feedMine?: Feed[];
  isFetching: boolean;
  isFetchingMine: boolean;
  handleAll: () => Promise<boolean>;
  handleMine: () => Promise<boolean>;
  loadMoreRef: (node?: Element | null) => void;
  loadMoreMineRef: (node?: Element | null) => void;
  handleFeedSelect: (id: string, feed: Feed) => void;
  userInfo: any;
  swiperRef: React.MutableRefObject<any>;
  selectedTab: "1" | "2";
  setSelectedTab: (tab: "1" | "2") => void;
  scrollContainerRef: React.RefObject<HTMLDivElement>;
  scrollContainerRefMine: React.RefObject<HTMLDivElement>;
}

const styles = {
  feedWrapper: "h-dvh overflow-y-scroll no-scrollbar pt-[90px] pb-14",
};

// 공통 Feed 슬라이드 컴포넌트
interface FeedSlideProps {
  feeds?: Feed[];
  isFetching: boolean;
  onRefresh: () => Promise<boolean>;
  loadMoreRef: (node?: Element | null) => void;
  scrollRef: React.RefObject<HTMLDivElement>;
  userInfo: any;
  handleFeedSelect: (id: string, feed: Feed) => void;
  isMine?: boolean;
  emptyComponent?: React.ReactNode;
}

function FeedSlide({
  feeds,
  isFetching,
  onRefresh,
  loadMoreRef,
  scrollRef,
  userInfo,
  handleFeedSelect,
  isMine,
  emptyComponent,
}: FeedSlideProps) {
  if (!feeds || feeds.length === 0) {
    return (
      <div className={styles.feedWrapper}>
        {emptyComponent || <FeedForDisplay />}
      </div>
    );
  }

  return (
    <PullToRefresh
      onRefresh={onRefresh}
      pullingContent={<></>}
      refreshingContent={<RefreshingUI />}
    >
      <div ref={scrollRef} className={styles.feedWrapper}>
        <div className="pt-safe-top pb-14">
          <FeedList
            feeds={feeds}
            userInfo={userInfo}
            onFeedSelect={handleFeedSelect}
            isFetching={isFetching}
            isMine={isMine}
          />
          <LoadMoreTrigger loadMoreRef={loadMoreRef} />
        </div>
      </div>
    </PullToRefresh>
  );
}

export function FeedSwiper({
  feedAll,
  feedMine,
  isFetching,
  isFetchingMine,
  handleAll,
  handleMine,
  loadMoreRef,
  loadMoreMineRef,
  handleFeedSelect,
  userInfo,
  swiperRef,
  selectedTab,
  setSelectedTab,
  scrollContainerRef,
  scrollContainerRefMine,
}: FeedSwiperProps) {
  return (
    <Swiper
      onSwiper={(swiper) => (swiperRef.current = swiper)}
      onSlideChange={(swiper) => {
        const index = swiper.activeIndex;
        const tab = (index + 1).toString() as "1" | "2";
        if (selectedTab !== tab) setSelectedTab(tab);
      }}
      slidesPerView={1}
      spaceBetween={2}
      direction="horizontal"
      className="custom-swiper !h-dvh w-full"
    >
      <SwiperSlide>
        <FeedSlide
          feeds={feedAll}
          isFetching={isFetching}
          onRefresh={handleAll}
          loadMoreRef={loadMoreRef}
          scrollRef={scrollContainerRef}
          userInfo={userInfo}
          handleFeedSelect={handleFeedSelect}
          emptyComponent={<FeedForDisplay />}
        />
      </SwiperSlide>

      <SwiperSlide>
        <FeedSlide
          feeds={feedMine}
          isFetching={isFetchingMine}
          onRefresh={handleMine}
          loadMoreRef={loadMoreMineRef}
          scrollRef={scrollContainerRefMine}
          userInfo={userInfo}
          handleFeedSelect={handleFeedSelect}
          isMine
          emptyComponent={<NoFeed />}
        />
      </SwiperSlide>
    </Swiper>
  );
}

function RefreshingUI() {
  return (
    <div className="flex justify-center pt-safe-top">
      <div className="p-2">
        <Spacing size={90} />
        <DotSpinnerSmall />
      </div>
    </div>
  );
}
