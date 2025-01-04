"use client";
import {
  animationStatusAtom,
  invitationSelectedTabAtom,
} from "@/atoms/invitation";
import InvitationCard from "@/components/invitation/InvitationCard";
import LightySelect from "@/components/shared/filter";
import { OptionType } from "@/components/shared/FilterBar";
import Flex from "@/components/shared/Flex";
import Spacing from "@/components/shared/Spacing";
import TabBar from "@/components/shared/tab/TabBar";
import { useRef, useState } from "react";
import { useSetRecoilState } from "recoil";
import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperType } from "swiper";
import "swiper/css";
import InvitationModal from "@/components/invitation/InvitationModal";
import HeaderReturner from "@/utils/headerReturner";

export default function InvitationPage() {
  const swiperRef = useRef<SwiperType | null>(null);
  const [isModalOpen, setModalOpen] = useState<boolean>();
  const setSelectedTab = useSetRecoilState(invitationSelectedTabAtom);
  const setAnimateTab = useSetRecoilState(animationStatusAtom);
  const [year, setYear] = useState<OptionType | null>({
    value: "2025",
    label: "2025",
  });

  const handleSlideChange = (index: number) => {
    if (swiperRef.current) {
      swiperRef.current.slideTo(index);
    }
  };

  const handleTabClick = (tabName: "1" | "2") => {
    if (tabName === "1") {
      handleSlideChange(0);
    }
    if (tabName === "2") {
      handleSlideChange(1);
    }
    setAnimateTab(true);
    setTimeout(() => {
      setSelectedTab(tabName);
      setAnimateTab(false);
    }, 300);
  };

  return (
    <div className="bg-base-white h-screen overflow-y-scroll no-scrollbar">
      <div className={filterStyle}>
        {HeaderReturner()}
        <div className="w-full px-[20px]">
          <TabBar
            bgColor="transparent"
            atom={invitationSelectedTabAtom}
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
      <Swiper
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        onSlideChange={(swiper) => {
          setSelectedTab(String(swiper.activeIndex + 1) as "1" | "2");
        }}
        slidesPerView={1}
        spaceBetween={2}
        className="custom-swiper w-full"
      >
        <SwiperSlide>
          <Flex direction="column" className="pt-[162px]">
            <InvitationCard onClickOpen={setModalOpen} />
            <Spacing size={24} />
          </Flex>
        </SwiperSlide>
        <SwiperSlide>
          <Flex direction="column" className="pt-[162px]">
            <InvitationCard onClickOpen={setModalOpen} />
            <Spacing size={24} />
            <InvitationCard onClickOpen={setModalOpen} />
            <Spacing size={24} />
          </Flex>
        </SwiperSlide>
      </Swiper>
      {isModalOpen ? <InvitationModal onClickClose={setModalOpen} /> : null}
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
    value: "2024",
    label: "2024",
  },
];
