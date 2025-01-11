"use client";
import { newGatheringInfo } from "@/atoms/gathering";
import AddFriendsSlider from "@/components/groups/AddFriendsSlider";
import AddGroupSlider from "@/components/groups/AddGroupSlider";
import CalendarBottomSheet from "@/components/shared/bottomSheet/CalendarBottomSheet";
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
import { GatheringInfo } from "@/models/gathering";
import getHeader from "@/utils/getHeader";
import { format } from "date-fns";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useRecoilState } from "recoil";

export default function NewGatheringPage() {
  const pathname = usePathname();
  const header = getHeader(pathname);
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [gatheringInfo, setGatheringInfo] =
    useRecoilState<GatheringInfo>(newGatheringInfo);

  return (
    <div className="h-screen bg-base-white pt-[48px]">
      {header}
      <form className="flex flex-col px-[20px]">
        <Spacing size={16} />
        <Flex align="center" className="h-[50px]">
          <EmptyLogoIcon color="#0A0A0A" />
          <Spacing size={4} direction="horizontal" />
          <span className="text-T5 flex-grow">모임 형태</span>
          <AnimatedTabButton />
        </Flex>
        <Spacing size={24} />
        <Input
          name="gatheringName"
          minLength={2}
          displayLength={10}
          value={gatheringInfo.name}
          onChange={(e) =>
            setGatheringInfo((prev) => ({ ...prev, name: e.target.value }))
          }
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
          name="gatheringDesc"
          minLength={10}
          displayLength={40}
          value={gatheringInfo.description}
          onChange={(e) =>
            setGatheringInfo((prev) => ({
              ...prev,
              description: e.target.value,
            }))
          }
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
          <span>
            {gatheringInfo.type === "friend"
              ? "초대할 친구"
              : "초대할 친구 그룹"}
          </span>
        </Flex>
        <Spacing size={8} />
        {gatheringInfo.type === "friend" ? (
          <AddFriendsSlider setGathering={setGatheringInfo} type="gathering" />
        ) : (
          <AddGroupSlider />
        )}
        <Spacing size={36} />
        <div className="grid grid-cols-2 gap-4">
          <GatheringInput
            type="date"
            value={
              gatheringInfo.date && gatheringInfo.ampm && gatheringInfo.time ? (
                <>
                  <span>{format(gatheringInfo.date, "yyyy.MM.dd")}</span>
                  <Spacing size={8} />
                  <span>
                    {gatheringInfo.ampm} {gatheringInfo.time}
                  </span>
                </>
              ) : (
                "선택하기"
              )
            }
            onClick={() => setCalendarOpen(true)}
            label={
              <>
                <CalendarIcon width="16" height="16" color="#0A0A0A" />
                <Spacing direction="horizontal" size={4} />
                <span>모임 일정</span>
              </>
            }
          />
          <GatheringInput
            type="address"
            value={gatheringInfo.address ? gatheringInfo.address : "선택하기"}
            setValue={setGatheringInfo}
            label={
              <>
                <MapPinIcon width="16" height="16" color="#0A0A0A" />
                <Spacing direction="horizontal" size={4} />
                <span>모임 장소</span>
              </>
            }
          />
          <FixedBottomButton
            label="다음"
            onClick={() => {
              console.log(gatheringInfo);
            }}
          />
        </div>
      </form>
      <CalendarBottomSheet
        onClose={() => setCalendarOpen(false)}
        open={calendarOpen}
      />
    </div>
  );
}
