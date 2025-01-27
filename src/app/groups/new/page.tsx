"use client";
import { newGroupAtom } from "@/atoms/group";
import AddFriendsSlider from "@/components/groups/AddFriendsSlider";
import AddGroupPhoto from "@/components/groups/AddGroupPhoto";
import useMakeGroup from "@/components/groups/hooks/useMakeGroup";
import FixedBottomButton from "@/components/shared/Button/FixedBottomButton";
import Flex from "@/components/shared/Flex";
import FeedIcon from "@/components/shared/Icon/FeedIcon";
import PencilIcon from "@/components/shared/Icon/PencilIcon";
import UserIcon from "@/components/shared/Icon/UserIcon";
import Input from "@/components/shared/Input/Input";
import Spacing from "@/components/shared/Spacing";
import * as lighty from "lighty-type";
import getHeader from "@/utils/getHeader";
import { useRecoilState } from "recoil";
import { useState } from "react";
import InviteFriends from "@/components/friends/InviteFriends";
import MakingGroupSuccess from "@/components/groups/MakingGroupSuccess";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export default function NewGroupPage() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const header = getHeader("/groups/new");
  const [newGroup, setNewGroup] =
    useRecoilState<lighty.CreateGroupRequest>(newGroupAtom);
  const [step, setStep] = useState(1);

  const {
    mutate: makeGroup,
    isPending,
    isSuccess,
  } = useMakeGroup({
    group: newGroup,
    onSuccess: async (data) => {
      router.push("/groups");
      await queryClient.invalidateQueries({
        queryKey: ["groups"],
      });
      toast.success(data.message);
    },
  });

  const handleMakeGroup = async () => {
    makeGroup();
  };

  if (isSuccess || isPending) {
    return <MakingGroupSuccess group={newGroup} isPending={isPending} />;
  }

  if (step === 1) {
    return (
      <div className="h-screen bg-base-white">
        {header}
        <form className="flex flex-col px-5 pt-12">
          <Spacing size={24} />
          <AddGroupPhoto
            image={newGroup.groupImageUrl}
            setImage={setNewGroup}
          />
          <Spacing size={36} />
          <Input
            value={newGroup.name}
            onChange={(e) => {
              setNewGroup((prev) => ({ ...prev, name: e.target.value }));
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
            value={newGroup.description}
            onChange={(e) => {
              setNewGroup((prev) => ({ ...prev, description: e.target.value }));
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
            setGroup={setNewGroup}
            type="group"
            setStep={setStep}
          />
        </form>
        <FixedBottomButton label={"그룹 생성하기"} onClick={handleMakeGroup} />
      </div>
    );
  } else if (step === 2) {
    return <InviteFriends setStep={setStep} />;
  }
}
