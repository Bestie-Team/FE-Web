import Dimmed from "../shared/Dimmed";
import CloseIcon from "../shared/icons/CloseIcon";
import Spacing from "../shared/Spacing";
import Image from "next/image";
import Flex from "../shared/Flex";
import CalendarIcon from "../shared/icons/CalendarIcon";
import MapPinIcon from "../shared/icons/MapPinIcon";
import GroupImages from "../shared/GroupImages";
import Button from "../shared/buttons";

export default function InvitationModal({
  onClickClose,
}: {
  onClickClose: (value: boolean) => void;
}) {
  return (
    <Dimmed className="flex flex-col justify-center items-center">
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
            src="https://d20j4cey9ep9gv.cloudfront.net/invitationV.png"
            alt="invitationVertical"
            width={330}
            height={460}
          />
          <Flex
            direction="column"
            style={{ position: "absolute", padding: "15px", left: 0, top: 0 }}
          >
            <Image
              src="https://d20j4cey9ep9gv.cloudfront.net/dishes.jpg"
              className="h-[210px] object-cover rounded-[12px]"
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
          <Flex
            direction="column"
            style={{
              position: "absolute",
              paddingLeft: "4px",
              left: "15px",
              top: "332px",
            }}
          >
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
          <div className="absolute bottom-[15px] left-[15px] pl-[4px]">
            <GroupImages width={34} height={34} gap={6} />
          </div>
          <Flex
            align="center"
            style={{
              position: "absolute",
              paddingRight: "4px",
              right: "15px",
              bottom: "22px",
            }}
          >
            <span className="text-T5 text-grayscale-300">from</span>
            <Spacing direction="horizontal" size={4} />
            <span className="text-B3">Maybin_</span>
          </Flex>
        </div>
        <Spacing size={16} />
        <Flex justify="center">
          <Button className="bg-grayscale-100 px-[24px] py-[14px] rounded-[36px] text-T6 hover:bg-grayscale-200">
            거절
          </Button>
          <Spacing size={15} direction="horizontal" />
          <Button className="bg-grayscale-900 px-[24px] py-[14px] text-base-white rounded-[36px] text-T6">
            수락
          </Button>
        </Flex>
      </Flex>
    </Dimmed>
  );
}
