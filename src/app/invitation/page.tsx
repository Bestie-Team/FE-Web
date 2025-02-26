"use client";
import InvitationCard from "@/components/invitation/InvitationCard";
import Spacing from "@/components/shared/Spacing";
import React, { useEffect, useMemo, useRef, useState } from "react";
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
import FullPageLoader from "@/components/shared/FullPageLoader";
import NoInvitation from "@/components/invitation/NoInvitation";
import { useScrollThreshold } from "@/hooks/useScrollThreshold";
import { useInfiniteScrollByRef } from "@/hooks/useInfiniteScroll";

export default function InvitationPage() {
  const [isClient, setIsClient] = useState(false);
  const isPast = useScrollThreshold();
  const header = useMemo(() => getHeader("/invitation"), []);
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const containerRef = useRef<any>(null);
  const containerRef_r = useRef<any>(null);

  const { selectedTab, swiperRef, handleSlideChange, handleTabClick } =
    useTabs();

  const {
    data: received,
    isFetching,
    loadMore,
  } = useReceivedInvitationToGathering();

  const {
    data: sent,
    isFetching: isFetching_s,
    loadMore: loadMore_s,
  } = useSentInvitationToGathering();

  useInfiniteScrollByRef({
    isFetching: isFetching_s,
    loadMore: loadMore_s,
    targetRef: containerRef,
  });

  useInfiniteScrollByRef({
    isFetching,
    loadMore,
    targetRef: containerRef_r,
  });

  const renderSwiper = useMemo(() => {
    return (
      <Swiper
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        onSlideChange={(swiper) => {
          handleSlideChange(swiper.activeIndex);
        }}
        slidesPerView={1}
        spaceBetween={2}
        className="custom-swiper w-full !h-dvh"
      >
        <SwiperSlide>
          <div
            ref={containerRef_r}
            className="h-dvh overflow-y-auto no-scrollbar"
          >
            {received && received.length > 0 ? (
              <>
                <Spacing size={110} />
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
                {isFetching && <DotSpinner />}
              </>
            ) : (
              <NoInvitation type="RECEIVED" />
            )}
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div
            ref={containerRef}
            className="h-dvh overflow-y-auto no-scrollbar"
          >
            {sent && sent.length > 0 ? (
              <>
                <Spacing size={110} />
                {sent?.map((invitation) => {
                  return (
                    <React.Fragment key={invitation.gatheringId}>
                      <InvitationCard
                        onClickOpen={setModalOpen}
                        invitation={invitation}
                      />
                      <Spacing size={24} />
                    </React.Fragment>
                  );
                })}
                {isFetching_s && <DotSpinner />}
              </>
            ) : (
              <NoInvitation type="SENT" />
            )}
          </div>
        </SwiperSlide>
      </Swiper>
    );
  }, [received, sent, selectedTab, swiperRef, handleSlideChange]);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return <FullPageLoader />;
  }
  return (
    <div className="h-dvh">
      <div
        id="filter"
        className={clsx(filterStyle, isPast ? "shadow-bottom" : "")}
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
      {renderSwiper}
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
