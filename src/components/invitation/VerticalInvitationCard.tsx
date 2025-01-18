import React from "react";
import * as lighty from "lighty-type";
import Flex from "../shared/Flex";
import Spacing from "../shared/Spacing";
import Image from "next/image";
import MapPinIcon from "../shared/icons/MapPinIcon";
import CalendarIcon from "../shared/icons/CalendarIcon";
import AddGatheringPhoto from "../gathering/AddGatheringPhoto";
import { SetterOrUpdater } from "recoil";
import { useAuth } from "../shared/providers/AuthProvider";
import { formatToKoreanTime } from "@/utils/makeUTC";

export default function VerticalInvitationCard({
  gathering,
  setGathering,
}: {
  gathering: lighty.CreateGatheringRequest;
  setGathering: SetterOrUpdater<lighty.CreateGatheringRequest>;
}) {
  const { userInfo } = useAuth();
  const time = formatToKoreanTime(gathering.gatheringDate);
  return (
    <Flex
      direction="column"
      justify="center"
      align="center"
      style={{
        width: "330px",
        borderRadius: "20px",
      }}
    >
      <div className="relative">
        <Image
          src="/vertical_invitation.png"
          alt="verticalBar"
          width={330}
          height={460}
        />
        <Flex direction="column" className={styles.mainContentWrapper}>
          <AddGatheringPhoto
            image={gathering.invitationImageUrl}
            setImage={setGathering}
          />

          <Spacing size={10} />
          <span className="text-T1 pl-[4px]">{gathering.name}</span>
          <span className="text-B4 pl-[4px] text-grayscale-600">
            {gathering.description}
          </span>
        </Flex>
        <Flex direction="column" className={styles.subContentWrapper}>
          <Flex align="center">
            <CalendarIcon width="14" height="14" color="#AEAEAE" />
            <Spacing direction="horizontal" size={8} />
            <span className="text-B4">{time}</span>
          </Flex>
          <Flex align="center">
            <MapPinIcon />
            <Spacing direction="horizontal" size={8} />
            <span className="text-B4">{gathering.address}</span>
          </Flex>
        </Flex>
        <div className={styles.groupMemberImagesWrapper}></div>
        <Flex align="center" className={styles.fromWrapper}>
          <span className="text-T5 text-grayscale-300">from</span>
          <Spacing direction="horizontal" size={4} />
          <span className="text-B3">{userInfo?.accountId}</span>
        </Flex>
      </div>
    </Flex>
  );
}
const styles = {
  mainContentWrapper: "absolute p-[15px] left-0 top-0",
  subContentWrapper: "absolute pl-[4px] left-[15px] top-[332px]",
  groupMemberImagesWrapper: "absolute bottom-[15px] left-[15px] pl-[4px]",
  fromWrapper: "absolute pr-[4px] right-[15px] bottom-[22px]",
  rejectBtn:
    "bg-grayscale-100 px-[24px] py-[14px] rounded-[36px] text-T6 hover:bg-grayscale-200",
  acceptBtn:
    "bg-grayscale-900 px-[24px] py-[14px] text-base-white rounded-[36px] text-T6",
};
