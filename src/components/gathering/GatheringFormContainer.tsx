import React, { Dispatch, SetStateAction, useState } from "react";
import * as lighty from "lighty-type";
import Spacing from "../shared/Spacing";
import Input from "../shared/Input/Input";
import FeedIcon from "../shared/Icon/FeedIcon";
import Flex from "../shared/Flex";
import UserIcon from "../shared/Icon/UserIcon";
import AddGroupSlider from "../groups/AddGroupSlider";
import AddFriendsSlider from "../groups/AddFriendsSlider";
import GatheringInput from "../shared/Input/GatheringInput";
import { formatToKoreanTime } from "@/utils/makeUTC";
import MapPinIcon from "../shared/Icon/MapPinIcon";
import FixedBottomButton from "../shared/Button/FixedBottomButton";
import CalendarBottomSheet from "../shared/BottomDrawer/CalendarBottomSheet";
import { isValid } from "date-fns";
import getHeader from "@/utils/getHeader";
import EmptyLogoIcon from "../shared/Icon/EmptyLogoIcon";
import AnimatedTabButton from "../shared/Button/AnimatedTabButton";
import PencilIcon from "../shared/Icon/PencilIcon";
import CalendarIcon from "../shared/Icon/CalendarIcon";
import { SetterOrUpdater } from "recoil";
import useGroup from "../groups/hooks/useGroups";
import FullPageLoader from "../shared/FullPageLoader";

export default function GatheringFormContainer({
  setStep,
  gathering,
  setGathering,
}: {
  setStep: Dispatch<SetStateAction<number>>;
  gathering: lighty.CreateGatheringRequest;
  setGathering: SetterOrUpdater<lighty.CreateGatheringRequest>;
}) {
  const isGroupInfoValid = () => {
    if (
      gathering.name.length <= 2 ||
      gathering.description.length <= 10 ||
      gathering.type == null ||
      gathering.gatheringDate == null ||
      gathering.address.length < 1 ||
      gathering.invitationImageUrl == null ||
      (gathering.groupId == null && gathering.friendIds == null) ||
      (gathering.groupId == null &&
        gathering.friendIds &&
        gathering.friendIds.length < 1)
    ) {
      return false;
    } else return true;
  };

  const [calendarOpen, setCalendarOpen] = useState(false);
  const header = getHeader("/gathering/new");
  const { data: group_data, isFetching } = useGroup();

  return (
    <div className="h-screen bg-base-white pt-12">
      {header}
      <form className="flex flex-col px-5">
        <Spacing size={16} />
        <Flex align="center" className="h-[50px]">
          <EmptyLogoIcon color="#0A0A0A" />
          <Spacing size={4} direction="horizontal" />
          <span className="text-T5 flex-grow">약속 형태</span>
          <AnimatedTabButton />
        </Flex>
        <Spacing size={24} />
        <Input
          name="gatheringName"
          minLength={2}
          displayLength={10}
          value={gathering.name}
          onChange={(e) =>
            setGathering((prev) => ({ ...prev, name: e.target.value }))
          }
          placeholder="약속 이름을 입력해 주세요."
          label={
            <>
              <PencilIcon width="16" height="16" color="#0A0A0A" />
              <Spacing direction="horizontal" size={4} />
              <span>약속 이름</span>
            </>
          }
        />
        <Spacing size={36} />
        <Input
          name="gatheringDesc"
          minLength={10}
          displayLength={40}
          value={gathering.description}
          onChange={(e) =>
            setGathering((prev) => ({
              ...prev,
              description: e.target.value,
            }))
          }
          placeholder="약속 이름을 설명해 주세요."
          label={
            <>
              <FeedIcon width="16" height="16" color="#0A0A0A" />
              <Spacing direction="horizontal" size={4} />
              <span>약속 설명</span>
            </>
          }
        />
        <Spacing size={36} />
        <Flex align="center" className="text-T5">
          <UserIcon width="16" height="16" color="#0A0A0A" />
          <Spacing direction="horizontal" size={4} />
          <span>
            {gathering.type === "FRIEND" ? "초대할 친구" : "초대할 친구 그룹"}
          </span>
        </Flex>
        <Spacing size={8} />
        {gathering.type === "FRIEND" ? (
          <AddFriendsSlider
            setGathering={setGathering}
            setStep={setStep}
            type="gathering"
          />
        ) : isFetching ? (
          <FullPageLoader />
        ) : group_data ? (
          <AddGroupSlider
            group_data={group_data}
            setGatheringInfo={setGathering}
            gatheringInfo={gathering}
          />
        ) : null}
        <Spacing size={36} />
        <div className="grid grid-cols-2 gap-4">
          <GatheringInput
            type="date"
            value={
              gathering.gatheringDate &&
              isValid(new Date(gathering.gatheringDate)) ? (
                <>
                  <span>
                    {formatToKoreanTime(gathering.gatheringDate).slice(0, 10)}
                  </span>
                  <Spacing size={8} />
                  <span>
                    {formatToKoreanTime(gathering.gatheringDate).slice(10)}
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
                <span>약속 일정</span>
              </>
            }
          />
          <GatheringInput
            type="address"
            value={gathering.address ? gathering.address : "선택하기"}
            setValue={setGathering}
            label={
              <>
                <MapPinIcon width="16" height="16" color="#0A0A0A" />
                <Spacing direction="horizontal" size={4} />
                <span>약속 장소</span>
              </>
            }
          />
          <FixedBottomButton
            label={"다음"}
            disabled={isGroupInfoValid() === false}
            onClick={() => {
              setStep(3);
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
