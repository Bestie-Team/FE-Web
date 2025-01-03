import Dimmed from "../shared/Dimmed";
import CloseIcon from "../shared/icons/CloseIcon";
import Spacing from "../shared/Spacing";
import Image from "next/image";
import Flex from "../shared/Flex";
import CalendarIcon from "../shared/icons/CalendarIcon";
import MapPinIcon from "../shared/icons/MapPinIcon";
import Button from "../shared/buttons/Button";
import { useRecoilValue } from "recoil";
import { invitationSelectedTabAtom } from "@/atoms/invitation";
import GroupMemberImages from "../shared/GroupMemberImages";

export default function InvitationModal({
  onClickClose,
}: {
  onClickClose: (value: boolean) => void;
}) {
  const selectedTab = useRecoilValue(invitationSelectedTabAtom);

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
        <div className="relative">
          <Image
            src="https://cdn.lighty.today/invitationV.png"
            alt="verticalBar"
            width={330}
            height={460}
          />
          <Flex direction="column" className={styles.mainContentWrapper}>
            <Image
              src="https://cdn.lighty.today/dishes.jpg"
              className={styles.image}
              width={300}
              height={210}
              alt="invitationImage"
            />
            <Spacing size={10} />
            <span className="text-T1 pl-[4px]">christmas party</span>
            <span className="text-B4 pl-[4px] text-grayscale-600">
              먹고 죽는 크리스마스 돼지 파티에 초대합니다.
            </span>
          </Flex>
          <Flex direction="column" className={styles.subContentWrapper}>
            <Flex align="center">
              <CalendarIcon width="14" height="14" color="#AEAEAE" />
              <Spacing direction="horizontal" size={8} />
              <span className="text-B4">christmas party</span>
              <Spacing direction="horizontal" size={8} />
              <span className="text-B4">오후 6:00</span>
            </Flex>
            <Flex align="center">
              <MapPinIcon />
              <Spacing direction="horizontal" size={8} />
              <span className="text-B4">성수 에이바</span>
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
            <span className="text-B3">Maybin_</span>
          </Flex>
        </div>
        {selectedTab === "1" ? (
          <>
            <Spacing size={16} />
            <Flex justify="center">
              <Button className={styles.rejectBtn}>거절</Button>
              <Spacing size={15} direction="horizontal" />
              <Button className={styles.acceptBtn}>수락</Button>
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
