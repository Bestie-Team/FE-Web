"use client";
import InvitationCard from "@/components/invitation/InvitationCard";
import LightySelect from "@/components/shared/Select";
import { SelectOptionType } from "@/components/shared/FilterBar";
import Flex from "@/components/shared/Flex";
import Spacing from "@/components/shared/Spacing";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import getHeader from "@/utils/getHeader";
import clsx from "clsx";
import useScrollShadow from "@/hooks/useScrollShadow";
import { useTabs } from "@/hooks/useTabs";
import useReceivedInvitationToGathering from "@/components/gathering/hooks/useReceivedInvitationToGathering";
import useSentInvitationToGathering from "@/components/gathering/hooks/useSentInvitationToGathering";
import InvitationModal from "@/components/invitation/InvitationModal";
import { GatheringInvitation } from "@/models/gathering";
import Panel from "@/components/shared/Panel/Panel";
import DotSpinner from "@/components/shared/Spinner/DotSpinner";

export default function InvitationPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const hasShadow = useScrollShadow(containerRef);
  const header = getHeader("/invitation");
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const [year, setYear] = useState<SelectOptionType | null>({
    value: "2025",
    label: "2025",
  });

  const queryParams = useMemo(
    () => ({
      cursor: new Date().toISOString(),
      minDate: new Date("2025-01-01").toISOString(),
      maxDate: new Date("2025-12-31").toISOString(),
      limit: 10,
    }),
    []
  );
  const [invitations, setInvitations] = useState<{
    received: GatheringInvitation[];
    sent: GatheringInvitation[];
  }>({ received: [], sent: [] });

  const { selectedTab, swiperRef, handleSlideChange, handleTabClick } =
    useTabs();

  const {
    data: received,
    isSuccess,
    isFetching,
    isError,
  } = useReceivedInvitationToGathering(queryParams);

  const {
    data: sent,
    isSuccess: sent_isSuccess,
    isFetching: isFetching_s,
    isError: isError_s,
  } = useSentInvitationToGathering(queryParams);

  useEffect(() => {
    if (isSuccess && received?.invitations) {
      setInvitations((prev) => ({ ...prev, received: received.invitations }));
    }
  }, [isSuccess, received]);

  useEffect(() => {
    if (sent_isSuccess && sent?.invitations) {
      setInvitations((prev) => ({ ...prev, sent: sent.invitations }));
    }
  }, [sent_isSuccess, sent]);

  return (
    <div className="bg-base-white h-screen overflow-y-scroll no-scrollbar pt-[48px]">
      <div className={clsx(filterStyle, hasShadow ? "shadow-bottom" : "")}>
        {header}
        <div className="w-full px-[20px]">
          <Panel
            bgColor="transparent"
            selectedTab={selectedTab}
            title1="받은 초대"
            title2="보낸 초대"
            long="long"
            onClick={handleTabClick}
          />
        </div>
        <div className="py-[16px] px-[20px]">
          <LightySelect
            borderColor="#E9E9E9"
            placeholder="년도"
            options={options}
            selected={year}
            setSelected={setYear}
          />
        </div>
      </div>
      {isFetching || isError ? (
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
            <Flex direction="column" className="pt-[120px]">
              {invitations.received?.map((invitation) => {
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
          </SwiperSlide>
          <SwiperSlide>
            <Flex direction="column" className="pt-[120px]">
              {invitations.sent?.map((invitation) => {
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
  "max-w-[430px] z-10 fixed flex flex-col w-full bg-base-white";

const options = [
  {
    value: "2025",
    label: "2025",
  },
  {
    value: "2026",
    label: "2026",
  },
];
