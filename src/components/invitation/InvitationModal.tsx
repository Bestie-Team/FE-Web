import Dimmed from "../shared/Dimmed";
import CloseIcon from "../shared/Icon/CloseIcon";
import Spacing from "../shared/Spacing";
import Flex from "../shared/Flex";
import Button from "../shared/Button/Button";
import { useRecoilValue } from "recoil";
import { selectedInvitationAtom } from "@/atoms/invitation";
import useAcceptInvitationToGathering from "../gathering/hooks/useAcceptInvitationToGathering";
import useRejectInvitationToGathering from "../gathering/hooks/useRejectInvitationToGathering";
import { SuccessResponse } from "@/models/response";
import { VerticalInvitationCard } from "./VerticalInvitationCard";

export default function InvitationModal({
  selectedTab,
  onClickClose,
}: {
  selectedTab: "1" | "2";
  onClickClose: (value: boolean) => void;
}) {
  const selectedInvitation = useRecoilValue(selectedInvitationAtom);
  const { mutate: accept } = useAcceptInvitationToGathering({
    invitationId: selectedInvitation?.id || "",
    onSuccess: (data: SuccessResponse) => alert(data.message),
  });

  const { mutate: reject } = useRejectInvitationToGathering({
    invitationId: selectedInvitation?.id || "",
    onSuccess: (data: SuccessResponse) => alert(data.message),
  });

  if (!selectedInvitation) return;

  const handleAccept = () => {
    accept();
  };
  const handleReject = () => {
    reject();
  };

  return (
    <Dimmed className={styles.dimmed}>
      <Flex
        direction="column"
        justify="center"
        align="center"
        style={{ width: "330px" }}
      >
        <CloseIcon
          width="32"
          height="32"
          className="self-end cursor-pointer"
          onClick={() => {
            onClickClose(false);
          }}
        />
        <Spacing size={8} />
        {/*  <div className="relative">
          <Image
            src="/vertical_invitation.png"
            alt="verticalBar"
            width={330}
            height={460}
          />
          <Flex direction="column" className={styles.mainContentWrapper}>
            <Image
              src={invitation_image_url||"https://cdn.lighty.today/dishes.jpg"}
              className={styles.image}
              width={300}
              height={210}
              alt="invitationImage"
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
              <span className="text-B4">{name}</span>
              <Spacing direction="horizontal" size={8} />
              <span className="text-B4">{convertedTime}</span>
            </Flex>
            <Flex align="center">
              <MapPinIcon />
              <Spacing direction="horizontal" size={8} />
              <span className="text-B4">{address}</span>
            </Flex>
          </Flex>
          <div className={styles.groupMemberImagesWrapper}>
            <GroupMemberImages
              width={34}
              height={34}
              gap={6}
              memberImageUrls={groupMemberImages}
            />
          </div>
          <Flex align="center" className={styles.fromWrapper}>
            <span className="text-T5 text-grayscale-300">from</span>
            <Spacing direction="horizontal" size={4} />
            <span className="text-B3">{sender}</span>
          </Flex>
        </div>} */}
        <VerticalInvitationCard invitation={selectedInvitation} />
        {selectedTab === "1" ? (
          <>
            <Spacing size={16} />
            <Flex justify="center">
              <Button className={styles.rejectBtn} onClick={handleReject}>
                거절
              </Button>
              <Spacing size={15} direction="horizontal" />
              <Button className={styles.acceptBtn} onClick={handleAccept}>
                수락
              </Button>
            </Flex>
          </>
        ) : null}
      </Flex>
    </Dimmed>
  );
}

const groupMemberImages = [
  "https://cdn.lighty.today/bini.JPG",
  "https://cdn.lighty.today/binanton_jp.jpeg",
  "https://cdn.lighty.today/ocean.JPG",
  "https://cdn.lighty.today/groom.JPG",
];

const styles = {
  dimmed: "flex flex-col justify-center items-center",

  image: "h-[210px] object-cover rounded-[12px]",
  mainContentWrapper: "absolute p-[15px] left-0 top-0",
  subContentWrapper: "absolute pl-[4px] left-[15px] top-[332px]",
  groupMemberImagesWrapper: "absolute bottom-[15px] left-[15px] pl-[4px]",
  fromWrapper: "absolute pr-[4px] right-[15px] bottom-[22px]",
  rejectBtn:
    "bg-grayscale-100 px-[24px] py-[14px] rounded-[36px] text-T6 hover:bg-grayscale-200",
  acceptBtn:
    "bg-grayscale-900 px-[24px] py-[14px] text-base-white rounded-[36px] text-T6",
};
