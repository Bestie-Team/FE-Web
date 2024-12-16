"use client";
import GatheringBannerContainer from "@/components/gatheringDetail/GatheringBannerContainer";
import GatheringInfoContainer from "@/components/gatheringDetail/GatheringInfoContainer";
import GatheringMembersSlider from "@/components/gatheringDetail/GatheringMembersContainer";
import GroupLeaderContainer from "@/components/gatheringDetail/GroupLeaderContainer";
import Flex from "@/components/shared/Flex";
import CalendarIcon from "@/components/shared/icons/CalendarIcon";
import MapPinIcon from "@/components/shared/icons/MapPinIcon";
import UserIcon from "@/components/shared/icons/UserIcon";
import Spacing from "@/components/shared/Spacing";
import MEMBERS from "@/constants/members";
import HeaderReturner from "@/utils/headerReturner";
import Image from "next/image";

export default function GatheringDetailPage() {
  const member = 4;
  return (
    <Flex
      direction="column"
      className="w-full h-screen bg-grayscale-50 animate-slide-from-left"
    >
      <div className={"max-w-[430px] z-10 fixed w-full"}>
        {HeaderReturner()}
      </div>
      <GatheringBannerContainer />
      <GroupLeaderContainer />
      <Spacing size={10} />
      <GatheringInfoContainer
        icon={<CalendarIcon width="20" height="20" />}
        title={<span className={titleStyle}>모임 장소</span>}
        content={
          <Flex className={contentWrapperStyle}>
            <Flex direction="column" className="flex-grow">
              <span className="text-T5">빙봉 성수점</span>
              <Spacing size={4.16} />
              <span className="text-C2 text-grayscale-400">
                서울 성동구 서울숲2길 18-14 1층
              </span>
            </Flex>
            <Spacing size={8} direction="horizontal" />
            <Image
              className="rounded-[10.8px]"
              alt="mapImg"
              width={36}
              height={36}
              src={"https://d20j4cey9ep9gv.cloudfront.net/map.png"}
            />
          </Flex>
        }
      />
      <Spacing size={10} />
      <GatheringInfoContainer
        icon={<MapPinIcon width="20" height="20" color="#0A0A0A" />}
        title={<span className={titleStyle}>모임 시간</span>}
        content={
          <Flex className={contentWrapperStyle}>
            <span>2024.12.24(월)</span>
            <Spacing size={12} direction="horizontal" />
            <span className="text-grayscale-400">오후 6:00</span>
          </Flex>
        }
      />
      <Spacing size={10} />
      <GatheringInfoContainer
        icon={<UserIcon width="20" height="20" color="#0A0A0A" />}
        title={<span className={titleStyle}>{`모임 멤버 ${member}`}</span>}
        content={<GatheringMembersSlider members={MEMBERS} />}
      />
    </Flex>
  );
}

const titleStyle = "font-[700] text-[16px] leading-[20.8px]";

const contentWrapperStyle =
  "w-full px-[20px] py-[16px] border-[1px] border-grayscale-100 rounded-[12px] text-B3";
