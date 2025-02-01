"use client";
import GatheringBannerContainer from "@/components/gathering/GatheringBannerContainer";
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
import FullPageLoader from "@/components/shared/FullPageLoader";
import { useEffect, useState } from "react";
import LightyInfoContainer from "@/components/shared/LightyInfoContainer";
import { MAP } from "@/constants/images";

export default function GatheringDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const header = getHeader("/gathering/1234");

  const [isClient, setIsClient] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const gatheringId = params.id;
  const {
    data: selectedGathering,
    isPending,
    isError,
  } = useGatheringDetail({
    gatheringId,
    enabled: !!gatheringId,
  });

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!selectedGathering) {
    return <div>약속을 찾을 수 없습니다.</div>;
  }
  const { gatheringDate, members, hostUser, address } = selectedGathering;

  const convertedDate = formatToKoreanTime(gatheringDate);
  if (!isClient || isPending || isError) return <FullPageLoader />;

  return (
    <Flex direction="column" className="w-full h-screen bg-grayscale-50">
      {header}
      <GatheringBannerContainer
        gathering={selectedGathering}
        setImageLoaded={setImageLoaded}
      />
      <GroupLeaderContainer groupLeader={hostUser} />
      <Spacing size={10} color="#f4f4f4" />
      <LightyInfoContainer
        icon={<CalendarIcon width="20" height="20" />}
        title={<span className={styles.title}>약속 장소</span>}
        content={
          <Flex className={styles.contentWrapper} align="center">
            <span className="text-T5 flex-grow">{address}</span>
            <Spacing size={8} direction="horizontal" />
            <div className="w-9 h-9">
              <Image
                layout="intrinsic"
                className="rounded-[10.8px] width-[36px] height-[36px]"
                alt="mapIcon"
                width={36}
                height={36}
                src={MAP}
              />
            </div>
          </Flex>
        }
      />
      <Spacing size={10} color="#f4f4f4" />
      <LightyInfoContainer
        icon={<MapPinIcon width="20" height="20" color="#0A0A0A" />}
        title={<span className={styles.title}>약속 시간</span>}
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
      <LightyInfoContainer
        icon={<UserIcon width="20" height="20" color="#0A0A0A" />}
        title={
          <span className={styles.title}>{`약속 멤버 ${members.length}`}</span>
        }
        content={<GatheringMembersSlider members={members} />}
      />
      {imageLoaded === false ? <FullPageLoader /> : null}
    </Flex>
  );
}

const styles = {
  header: "max-w-[430px] z-10 fixed w-full",

  title: "font-[700] text-[16px] leading-[20.8px]",
  contentWrapper:
    "w-full px-5 py-4 border-[1px] border-grayscale-100 rounded-[12px] text-B3",
};
