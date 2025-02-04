"use client";
import { selectedGroupAtom } from "@/atoms/group";
import InviteFriends from "@/components/friends/InviteFriends";
import AddFriendsSlider from "@/components/groups/AddFriendsSlider";
import AddGroupPhoto from "@/components/groups/AddGroupPhoto";
import FixedBottomButton from "@/components/shared/Button/FixedBottomButton";
import Flex from "@/components/shared/Flex";
import FeedIcon from "@/components/shared/Icon/FeedIcon";
import PencilIcon from "@/components/shared/Icon/PencilIcon";
import UserIcon from "@/components/shared/Icon/UserIcon";
import Input from "@/components/shared/Input/Input";
import Spacing from "@/components/shared/Spacing";
import getHeader from "@/utils/getHeader";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import FullPageLoader from "@/components/shared/FullPageLoader";
import { CreateGroupRequest } from "@/models/group";

export default function GroupEditPage() {
  const header = getHeader("/groups/*/edit");
  const [isClient, setIsClient] = useState(false);
  const selectedGroup = useRecoilValue<CreateGroupRequest>(selectedGroupAtom);
  const [step, setStep] = useState(1);

  const [groupInfo, setGroupInfo] = useState(selectedGroup);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return <FullPageLoader />;
  }
  if (step === 1) {
    return (
      <div className="h-screen bg-base-white">
        {header}
        <form className="flex flex-col px-5 pt-12">
          <Spacing size={24} />
          <AddGroupPhoto
            image={groupInfo.groupImageUrl}
            setImage={setGroupInfo}
          />
          <Spacing size={36} />
          <Input
            value={groupInfo.name}
            onChange={(e) => {
              setGroupInfo((prev) => ({ ...prev, name: e.target.value }));
            }}
            displayLength={20}
            placeholder="그룹 이름을 입력해 주세요."
            label={
              <>
                <PencilIcon width="16" height="16" color="#0A0A0A" />
                <Spacing direction="horizontal" size={4} />
                <span>그룹 이름</span>
              </>
            }
          />
          <Spacing size={36} />
          <Input
            value={groupInfo.description}
            onChange={(e) => {
              setGroupInfo((prev) => ({
                ...prev,
                description: e.target.value,
              }));
            }}
            displayLength={20}
            placeholder="그룹 이름을 설명해 주세요."
            label={
              <>
                <FeedIcon width="16" height="16" color="#0A0A0A" />
                <Spacing direction="horizontal" size={4} />
                <span>그룹 설명</span>
              </>
            }
          />
          <Spacing size={36} />
          <Flex align="center" className="text-T5">
            <UserIcon width="16" height="16" color="#0A0A0A" />
            <Spacing direction="horizontal" size={4} />
            <span>그룹 친구</span>
          </Flex>
          <Spacing size={8} />
          <AddFriendsSlider
            setGroup={setGroupInfo}
            type="group"
            setStep={setStep}
          />
        </form>
        <FixedBottomButton label={"그룹 수정 완료"} onClick={() => {}} />
      </div>
    );
  } else if (step === 2) {
    return <InviteFriends setStep={setStep} type="group" />;
  }
}
