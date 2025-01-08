"use client";
import GatheringBannerContainer from "@/components/gathering/GatheringBannerContainer";
import GatheringInfoContainer from "@/components/shared/LightyInfoContainer";
import GatheringMembersSlider from "@/components/gathering/GatheringMembersContainer";
import GroupLeaderContainer from "@/components/shared/GroupLeaderContainer";
import Flex from "@/components/shared/Flex";
import CalendarIcon from "@/components/shared/icons/CalendarIcon";
import MapPinIcon from "@/components/shared/icons/MapPinIcon";
import UserIcon from "@/components/shared/icons/UserIcon";
import Spacing from "@/components/shared/Spacing";
import HeaderReturner from "@/utils/headerReturner";
import Image from "next/image";
import { GATHERINGS } from "@/constants/gathering";
import { GatheringResponse } from "@/models/gathering";
import { format } from "date-fns";
import { ko } from "date-fns/locale";

export default function GatheringDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const gatheringId = params.id;
  const gathering = GATHERINGS.find(
    (g) => g.id === gatheringId
  ) as GatheringResponse;

  if (!gathering) {
    return <div>모임을 찾을 수 없습니다.</div>;
  }

  const { date, group, address, ampm, time } = gathering;

  const dateInfo = format(date, "yyyy.MM.dd (E)", { locale: ko });

  return (
    <Flex direction="column" className="w-full h-screen bg-grayscale-50">
      <div className={styles.header}>{HeaderReturner()}</div>
      <GatheringBannerContainer gathering={gathering} />
      <GroupLeaderContainer groupLeader={group.groupLeader} />
      <Spacing size={10} color="#f4f4f4" />
      <GatheringInfoContainer
        icon={<CalendarIcon width="20" height="20" />}
        title={<span className={styles.title}>모임 장소</span>}
        content={
          <Flex className={styles.contentWrapper}>
            <Flex direction="column" className="flex-grow">
              <span className="text-T5">{address}</span>
              <Spacing size={4.16} />
              {/* <span className="text-C2 text-grayscale-400">
                서울 성동구 서울숲2길 18-14 1층
              </span> */}
            </Flex>
            <Spacing size={8} direction="horizontal" />
            <Image
              className="rounded-[10.8px] width-[36px] height-[36px]"
              alt="mapIcon"
              width={36}
              height={36}
              src={"https://cdn.lighty.today/map.png"}
            />
          </Flex>
        }
      />
      <Spacing size={10} color="#f4f4f4" />
      <GatheringInfoContainer
        icon={<MapPinIcon width="20" height="20" color="#0A0A0A" />}
        title={<span className={styles.title}>모임 시간</span>}
        content={
          <Flex className={styles.contentWrapper}>
            <span>{dateInfo}</span>
            <Spacing size={12} direction="horizontal" />
            <span className="text-grayscale-400">{`${ampm} ${time}`}</span>
          </Flex>
        }
      />
      <Spacing size={10} color="#f4f4f4" />
      <GatheringInfoContainer
        icon={<UserIcon width="20" height="20" color="#0A0A0A" />}
        title={
          <span
            className={styles.title}
          >{`모임 멤버 ${group.members.length}`}</span>
        }
        content={<GatheringMembersSlider members={group.members} />}
      />
    </Flex>
  );
}

const styles = {
  header: "max-w-[430px] z-10 fixed w-full",

  title: "font-[700] text-[16px] leading-[20.8px]",
  contentWrapper:
    "w-full px-[20px] py-[16px] border-[1px] border-grayscale-100 rounded-[12px] text-B3",
};
