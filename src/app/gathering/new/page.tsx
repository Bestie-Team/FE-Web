"use client";
import AddFriendsSlider from "@/components/groups/AddFriendsSlider";
import AnimatedTabButton from "@/components/shared/buttons/AnimatedTabButton";
import FixedBottomButton from "@/components/shared/buttons/FixedBottomButton";
import Flex from "@/components/shared/Flex";
import CalendarIcon from "@/components/shared/icons/CalendarIcon";
import EmptyLogoIcon from "@/components/shared/icons/EmptyLogoIcon";
import FeedIcon from "@/components/shared/icons/FeedIcon";
import MapPinIcon from "@/components/shared/icons/MapPinIcon";
import PencilIcon from "@/components/shared/icons/PencilIcon";
import UserIcon from "@/components/shared/icons/UserIcon";
import GatheringInput from "@/components/shared/inputs/GatheringInput";
import Input from "@/components/shared/inputs/Input";
import Spacing from "@/components/shared/Spacing";
import HeaderReturner from "@/utils/headerReturner";

export default function NewGatheringPage() {
  return (
    <div className="h-screen bg-base-white">
      <div>{HeaderReturner()}</div>
      <Flex direction="column" className="px-[20px]">
        <Spacing size={16} />
        <Flex align="center" className="h-[50px]">
          <EmptyLogoIcon color="#0A0A0A" />
          <Spacing size={4} direction="horizontal" />
          <span className="text-T5 flex-grow">모임 형태</span>
          <AnimatedTabButton />
        </Flex>
        <Spacing size={24} />
        <Input
          value={""}
          onChange={() => {}}
          placeholder="모임 이름을 입력해 주세요."
          label={
            <>
              <PencilIcon width="16" height="16" color="#0A0A0A" />
              <Spacing direction="horizontal" size={4} />
              <span>모임 이름</span>
            </>
          }
        />
        <Spacing size={36} />
        <Input
          value={""}
          onChange={() => {}}
          placeholder="모임 이름을 설명해 주세요."
          label={
            <>
              <FeedIcon width="16" height="16" color="#0A0A0A" />
              <Spacing direction="horizontal" size={4} />
              <span>모임 설명</span>
            </>
          }
        />
        <Spacing size={36} />
        <Flex align="center" className="text-T5">
          <UserIcon width="16" height="16" color="#0A0A0A" />
          <Spacing direction="horizontal" size={4} />
          <span>초대할 친구</span>
        </Flex>
        <Spacing size={8} />
        <AddFriendsSlider />
        <Spacing size={36} />
        <div className="grid grid-cols-2 gap-4">
          <GatheringInput
            value={""}
            onChange={() => {}}
            placeholder="선택하기"
            label={
              <>
                <CalendarIcon width="16" height="16" color="#0A0A0A" />
                <Spacing direction="horizontal" size={4} />
                <span>모임 일정</span>
              </>
            }
          />
          <GatheringInput
            value={""}
            onChange={() => {}}
            placeholder="선택하기"
            label={
              <>
                <MapPinIcon width="16" height="16" color="#0A0A0A" />
                <Spacing direction="horizontal" size={4} />
                <span>모임 장소</span>
              </>
            }
          />
        </div>
      </Flex>
      <FixedBottomButton label="다음" />
    </div>
  );
}
