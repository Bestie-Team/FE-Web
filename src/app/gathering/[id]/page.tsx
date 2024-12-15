"use client";
import GatheringBannerContainer from "@/components/gatheringDetail/GatheringBannerContainer";
import GroupLeaderContainer from "@/components/gatheringDetail/GroupLeaderContainer";
import Flex from "@/components/shared/Flex";
import HeaderReturner from "@/utils/headerReturner";

export default function GatheringDetailPage() {
  return (
    <div className="w-full animate-slide-from-left">
      <div className={"max-w-[430px] z-10 fixed w-full"}>
        {HeaderReturner()}
      </div>
      <GatheringBannerContainer />
      <Flex style={{ width: "full" }}>
        <GroupLeaderContainer />
      </Flex>
    </div>
  );
}
