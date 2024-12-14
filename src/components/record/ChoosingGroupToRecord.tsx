"use client";
import { useRecoilState } from "recoil";
import Flex from "../shared/Flex";
import LightyLogo from "../shared/icons/LightyLogo";
import Spacing from "../shared/Spacing";
import SmallPhotoSwiper from "./SmallPhotoSwiper";
import { recordGroupAtom } from "@/atoms/record";
import FixedBottomButton from "../shared/buttons/FixedBottomButton";

export default function ChoosingGroupToRecord({
  onNext,
}: {
  onNext: (groupInfoValue: string) => void;
}) {
  const [groupId, setGroupId] = useRecoilState(recordGroupAtom);

  const onImageClick = (group: string) => {
    setGroupId(group);
  };
  return (
    <Flex direction="column">
      <Flex
        direction="column"
        style={{ paddingLeft: "24px", paddingRight: "24px" }}
      >
        <Spacing size={28} />
        <LightyLogo />
        <Spacing size={16} />
        <span className="text-T2">어떤 모임의</span>
        <Spacing size={7} />
        <span className="text-T2">추억을 기록할까요?</span>
        <Spacing size={16} />
        <span className="text-B3 text-grayscale-500">
          작성한 기록은 모임에 참여한 이들만 볼 수 있어요
        </span>
      </Flex>
      <Spacing size={40} />
      <SmallPhotoSwiper
        images={imageList}
        onImageClick={onImageClick}
        groupId={groupId}
      />
      <FixedBottomButton
        disabled={groupId === null}
        label={"기록 시작하기"}
        onClick={() => {
          onNext("1");
        }}
      />
    </Flex>
  );
}

const imageList = [
  "https://d20j4cey9ep9gv.cloudfront.net/window.jpg",
  "https://d20j4cey9ep9gv.cloudfront.net/party.jpg",
  "https://d20j4cey9ep9gv.cloudfront.net/ocean.JPG",
  "https://d20j4cey9ep9gv.cloudfront.net/groom.JPG",
  "https://d20j4cey9ep9gv.cloudfront.net/groom.JPG",
];
