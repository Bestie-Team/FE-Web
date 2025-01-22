"use client";
import GatheringBannerContainer from "@/components/gathering/GatheringBannerContainer";
import GatheringInfoContainer from "@/components/shared/LightyInfoContainer";
import GatheringMembersSlider from "@/components/gathering/GatheringMembersContainer";
import GroupLeaderContainer from "@/components/shared/GroupLeaderContainer";
import Flex from "@/components/shared/Flex";
import CalendarIcon from "@/components/shared/Icon/CalendarIcon";
import MapPinIcon from "@/components/shared/Icon/MapPinIcon";
import UserIcon from "@/components/shared/Icon/UserIcon";
import Spacing from "@/components/shared/Spacing";
import Image from "next/image";
import getHeader from "@/utils/getHeader";
import { formatToKoreanTime } from "@/utils/makeUTC";
import useGatheringDetail from "@/components/gathering/hooks/useGatheringDetail";
import * as lighty from "lighty-type";

export default function GatheringDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const header = getHeader("/gathering/1234");
  const gatheringId = params.id;
  const { data: selectedGathering, isPending } = useGatheringDetail({
    gatheringId,
  });
  if (isPending) {
    return <div>기다려~</div>;
  }
  if (!selectedGathering) {
    return <div>모임을 찾을 수 없습니다.</div>;
  }

  const { gatheringDate, members, hostUser, address } = selectedGathering;

  const convertedDate = formatToKoreanTime(gatheringDate);

  return (
    <Flex direction="column" className="w-full h-screen bg-grayscale-50">
      {header}
      <GatheringBannerContainer gathering={selectedGathering} />
      <GroupLeaderContainer groupLeader={hostUser} />
      <Spacing size={10} color="#f4f4f4" />
      <GatheringInfoContainer
        icon={<CalendarIcon width="20" height="20" />}
        title={<span className={styles.title}>모임 장소</span>}
        content={
          <Flex className={styles.contentWrapper} align="center">
            <span className="text-T5 flex-grow">{address}</span>
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
            <span>{convertedDate.slice(0, 10)}</span>
            <Spacing size={12} direction="horizontal" />
            <span className="text-grayscale-400">
              {convertedDate.slice(10)}
            </span>
          </Flex>
        }
      />
      <Spacing size={10} color="#f4f4f4" />
      <GatheringInfoContainer
        icon={<UserIcon width="20" height="20" color="#0A0A0A" />}
        title={
          <span className={styles.title}>{`모임 멤버 ${members.length}`}</span>
        }
        content={<GatheringMembersSlider members={members} />}
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
