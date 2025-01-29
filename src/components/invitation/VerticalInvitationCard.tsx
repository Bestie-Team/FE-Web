import React, { useState } from "react";
import * as lighty from "lighty-type";
import Flex from "../shared/Flex";
import Spacing from "../shared/Spacing";
import Image from "next/image";
import MapPinIcon from "../shared/Icon/MapPinIcon";
import CalendarIcon from "../shared/Icon/CalendarIcon";
import AddGatheringPhoto from "../gathering/AddGatheringPhoto";
import { SetterOrUpdater } from "recoil";
import { formatToKoreanTime } from "@/utils/makeUTC";
import { GatheringInvitation } from "@/models/gathering";

export default function UploadableVerticalInvitationCard({
  gathering,
  invitation,
  setGathering,
  userId,
}: {
  gathering?: lighty.CreateGatheringRequest;
  invitation?: GatheringInvitation;
  setGathering?: SetterOrUpdater<lighty.CreateGatheringRequest>;
  userId?: string;
}) {
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
      <VerticalInvitationCard
        userId={userId}
        invitation={invitation}
        gathering={gathering}
        setGathering={setGathering}
      />
    </Flex>
  );
}

export function VerticalInvitationCard({
  gathering,
  invitation,
  setGathering,
  userId,
}: {
  userId?: string;
  gathering?: lighty.CreateGatheringRequest;
  invitation?: GatheringInvitation;
  setGathering?: SetterOrUpdater<lighty.CreateGatheringRequest>;
}) {
  const [imageLoaded, setImageLoaded] = useState(false);
  if (gathering && setGathering && !invitation) {
    const { name, invitationImageUrl, gatheringDate, description, address } =
      gathering;

    return (
      <div className="relative">
        <Image
          src="https://cdn.lighty.today/vertical_invitation.png"
          alt="verticalBar"
          width={330}
          height={460}
          onLoadingComplete={() => setImageLoaded(true)}
        />
        {imageLoaded && (
          <>
            <Flex direction="column" className={styles.mainContentWrapper}>
              <AddGatheringPhoto
                image={invitationImageUrl}
                setImage={setGathering}
              />

              <Spacing size={10} />
              <span className="text-T1 pl-[4px]">{name}</span>
              <span className="text-B4 pl-[4px] text-grayscale-600">
                {description}
              </span>
            </Flex>
            <Flex direction="column" className={styles.subContentWrapper}>
              <Flex align="center">
                <CalendarIcon width="14" height="14" color="#AEAEAE" />
                <Spacing direction="horizontal" size={8} />
                <span className="text-B4">
                  {gatheringDate ? formatToKoreanTime(gatheringDate) : ""}
                </span>
              </Flex>
              <Flex align="center">
                <MapPinIcon />
                <Spacing direction="horizontal" size={8} />
                <span className="text-B4">{address}</span>
              </Flex>
            </Flex>
            <div className={styles.groupMemberImagesWrapper}></div>
            <Flex align="center" className={styles.fromWrapper}>
              <span className="text-T5 text-grayscale-300">from</span>
              <Spacing direction="horizontal" size={4} />
              <span className="text-B3">{userId}</span>
            </Flex>
          </>
        )}
      </div>
    );
  }
  if (invitation && !gathering) {
    const {
      name,
      description,
      invitation_image_url,
      gatheringDate,
      address,
      sender,
    } = invitation;

    return (
      <div className="relative">
        <Image
          priority
          src="https://cdn.lighty.today/vertical_invitation.png"
          alt="verticalBar"
          width={330}
          height={460}
          onLoadingComplete={() => setImageLoaded(true)}
        />
        {imageLoaded && (
          <>
            <Flex direction="column" className={styles.mainContentWrapper}>
              <Image
                priority
                src={
                  invitation_image_url || "https://cdn.lighty.today/lighty.jpg"
                }
                className={styles.image}
                width={300}
                height={210}
                alt="invitationImage"
              />
              <Spacing size={10} />
              <span className="text-T1 pl-1">{name}</span>
              <span className="text-B4 pl-1 text-grayscale-600">
                {description}
              </span>
            </Flex>
            <Flex direction="column" className={styles.subContentWrapper}>
              <Flex align="center">
                <CalendarIcon width="14" height="14" color="#AEAEAE" />
                <Spacing direction="horizontal" size={8} />
                <span className="text-B4">
                  {gatheringDate ? formatToKoreanTime(gatheringDate) : ""}
                </span>
              </Flex>
              <Flex align="center">
                <MapPinIcon />
                <Spacing direction="horizontal" size={8} />
                <span className="text-B4">{address}</span>
              </Flex>
            </Flex>
            <div className={styles.groupMemberImagesWrapper}></div>
            <Flex align="center" className={styles.fromWrapper}>
              <span className="text-T5 text-grayscale-300">from</span>
              <Spacing direction="horizontal" size={4} />
              <span className="text-B3">{sender}</span>
            </Flex>
          </>
        )}
      </div>
    );
  }
}
const styles = {
  image: "h-[210px] object-cover rounded-[12px]",
  mainContentWrapper: "absolute p-[15px] left-0 top-0",
  subContentWrapper: "absolute pl-1 left-[15px] top-[332px]",
  groupMemberImagesWrapper: "absolute bottom-[15px] left-[15px] pl-1",
  fromWrapper: "absolute pr-1 right-[15px] bottom-[22px]",
  rejectBtn:
    "bg-grayscale-100 px-6 py-[14px] rounded-[36px] text-T6 hover:bg-grayscale-200",
  acceptBtn:
    "bg-grayscale-900 px-6 py-[14px] text-base-white rounded-[36px] text-T6",
};
