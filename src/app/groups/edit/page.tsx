"use client";
import { originalGroupMembersAtom, selectedGroupAtom } from "@/atoms/group";
import InviteFriends from "@/components/friends/InviteFriends";
import AddGroupPhoto from "@/components/groups/AddGroupPhoto";
import FixedBottomButton from "@/components/shared/Button/FixedBottomButton";
import Flex from "@/components/shared/Flex";
import FeedIcon from "@/components/shared/Icon/FeedIcon";
import PencilIcon from "@/components/shared/Icon/PencilIcon";
import UserIcon from "@/components/shared/Icon/UserIcon";
import Input from "@/components/shared/Input/Input";
import Spacing from "@/components/shared/Spacing";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { UpdateGroupRequest } from "@/models/group";
import useUpdateGroup from "@/components/groups/hooks/useUpdateGroup";
import { lightyToast } from "@/utils/toast";
import { useRouter } from "next/navigation";
import * as lighty from "lighty-type";
import AddOnlyFriendsSlider from "@/components/groups/AddOnlyFriendsSlider";
import HeaderWithBtn from "@/components/shared/Header/HeaderWithBtn";
import { useQueryClient } from "@tanstack/react-query";

export default function GroupEditPage() {
  const queryClient = useQueryClient();
  const selectedGroup = useRecoilValue<UpdateGroupRequest>(selectedGroupAtom);
  const [step, setStep] = useState(1);
  const router = useRouter();
  const [groupInfo, setGroupInfo] = useState(selectedGroup);
  const groupMembers = useRecoilValue<lighty.User[] | null>(
    originalGroupMembersAtom
  );

  useEffect(() => {
    if (!selectedGroup) {
      router.replace("/social?tab=group");
      lightyToast.error("그룹 정보를 찾을 수 없습니다.");
    }
  }, [selectedGroup, router]);

  const { mutate: updateGroup } = useUpdateGroup({
    groupId: groupInfo.groupId,
    group: {
      name: groupInfo.name,
      description: groupInfo.description,
      groupImageUrl: groupInfo.groupImageUrl,
    },
    onSuccess: async (data) => {
      await queryClient.invalidateQueries({
        queryKey: ["groups"],
      });
      lightyToast.success(data.message);
    },
  });

  const handleEdit = () => {
    updateGroup();
    router.replace("/social?tab=group");
  };

  if (step === 1) {
    return (
      <div className="min-h-[calc(100dvh+75px)] bg-base-white overflow-auto no-scrollbar">
        <HeaderWithBtn headerLabel="그룹 수정" bgColor="white" />
        <form className="flex flex-col px-5 pt-safe-top">
          <Spacing size={72} />
          <AddGroupPhoto
            image={groupInfo.groupImageUrl}
            setGroup={setGroupInfo}
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
          <AddOnlyFriendsSlider setStep={setStep} groupMembers={groupMembers} />
        </form>
        <FixedBottomButton
          label={"수정 완료"}
          onClick={handleEdit}
          className="mb-safe-bottom"
        />
      </div>
    );
  } else if (step === 2) {
    return (
      <InviteFriends
        setStep={setStep}
        type="groupEdit"
        exceptFriends={groupMembers}
      />
    );
  }
}
