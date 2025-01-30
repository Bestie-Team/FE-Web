"use client";
import InvitationCard from "@/components/invitation/InvitationCard";
import Flex from "@/components/shared/Flex";
import Spacing from "@/components/shared/Spacing";
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import getHeader from "@/utils/getHeader";
import clsx from "clsx";
import { useTabs } from "@/hooks/useTabs";
import useReceivedInvitationToGathering from "@/components/gathering/hooks/useReceivedInvitationToGathering";
import useSentInvitationToGathering from "@/components/gathering/hooks/useSentInvitationToGathering";
import InvitationModal from "@/components/invitation/InvitationModal";
import Panel from "@/components/shared/Panel/Panel";
import DotSpinner from "@/components/shared/Spinner/DotSpinner";
import { useRecoilValue } from "recoil";
import { scrollProgressAtom } from "@/atoms/scroll";
import InfiniteScroll from "react-infinite-scroll-component";
import DotSpinnerSmall from "@/components/shared/Spinner/DotSpinnerSmall";
import FullPageLoader from "@/components/shared/FullPageLoader";

export default function InvitationPage() {
  const [isClient, setIsClient] = useState(false);
  const scrollProgress = useRecoilValue(scrollProgressAtom);
  const header = getHeader("/invitation");
  const [isModalOpen, setModalOpen] = useState<boolean>(false);

  const { selectedTab, swiperRef, handleSlideChange, handleTabClick } =
    useTabs();

  const {
    data: received,
    isFetching,
    loadMore,
    hasNextPage,
  } = useReceivedInvitationToGathering();

  const {
    data: sent,
    isFetching: isFetching_s,
    loadMore: loadMore_s,
    hasNextPage: hasNextPage_s,
  } = useSentInvitationToGathering();

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return <FullPageLoader />;
  }

  return (
    <div id="scrollableDiv">
      <div
        id="filter"
        className={clsx(
          filterStyle,
          scrollProgress > 0.01 ? "shadow-bottom" : ""
        )}
      >
        {header}
        <div className="w-full px-5">
          <Panel
            bgColor="transparent"
            selectedTab={selectedTab}
            title1="받은 초대"
            title2="보낸 초대"
            long="long"
            onClick={handleTabClick}
          />
        </div>
      </div>
      {isFetching || isFetching_s ? (
        <DotSpinner />
      ) : (
        <Swiper
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
          onSlideChange={(swiper) => {
            handleSlideChange(swiper.activeIndex);
          }}
          slidesPerView={1}
          spaceBetween={2}
          className="custom-swiper w-full"
        >
          <SwiperSlide>
            {received && received.length > 0 && (
              <InfiniteScroll
                className="!overflow-visible"
                dataLength={received?.length ?? 0}
                hasMore={hasNextPage}
                loader={<DotSpinnerSmall />}
                next={loadMore}
                scrollThreshold="10px"
                scrollableTarget="scrollableDiv"
              >
                <Flex direction="column" className="pt-[110px]">
                  {received?.map((invitation) => {
                    return (
                      <React.Fragment key={invitation.id}>
                        <InvitationCard
                          onClickOpen={setModalOpen}
                          invitation={invitation}
                        />
                        <Spacing size={24} />
                      </React.Fragment>
                    );
                  })}
                </Flex>
              </InfiniteScroll>
            )}
          </SwiperSlide>
          <SwiperSlide>
            {sent && sent.length > 0 && (
              <InfiniteScroll
                className="!overflow-visible"
                dataLength={sent?.length ?? 0}
                hasMore={hasNextPage_s}
                loader={<DotSpinnerSmall />}
                next={loadMore_s}
                scrollThreshold="10px"
                scrollableTarget="scrollableDiv"
              >
                <Flex direction="column" className="pt-[110px]">
                  {sent?.map((invitation) => {
                    return (
                      <React.Fragment key={invitation.id}>
                        <InvitationCard
                          onClickOpen={setModalOpen}
                          invitation={invitation}
                        />
                        <Spacing size={24} />
                      </React.Fragment>
                    );
                  })}
                </Flex>
              </InfiniteScroll>
            )}
          </SwiperSlide>
        </Swiper>
      )}
      {isModalOpen ? (
        <InvitationModal
          onClickClose={setModalOpen}
          selectedTab={selectedTab}
        />
      ) : null}
    </div>
  );
}

const filterStyle =
  "max-w-[430px] pt-12 fixed flex flex-col w-full bg-base-white";
