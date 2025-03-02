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
import getHeader from "@/utils/getHeader";
import { useRecoilState } from "recoil";
import { useEffect, useMemo, useState } from "react";
import InviteFriends from "@/components/friends/InviteFriends";
import MakingGroupSuccess from "@/components/groups/MakingGroupSuccess";
import { useQueryClient } from "@tanstack/react-query";
import FullPageLoader from "@/components/shared/FullPageLoader";
import { lightyToast } from "@/utils/toast";
import { CreateGroupRequest } from "@/models/group";
import { usePathname } from "next/navigation";

export default function NewGroupPage() {
  const pathname = usePathname();
  const [isClient, setIsClient] = useState(false);
  const queryClient = useQueryClient();
  const header = useMemo(() => getHeader("/groups/new"), []);
  const [newGroup, setNewGroup] =
    useRecoilState<CreateGroupRequest>(newGroupAtom);
  const [step, setStep] = useState(1);
  const [groupImageUrl, setGroupImageUrl] = useState<string>("");

  const makeGroupSuccessHandler = async (data: { message: string }) => {
    setStep(0);
    Promise.all([
      await queryClient.invalidateQueries({
        queryKey: ["groups"],
      }),
      await queryClient.invalidateQueries({
        queryKey: ["user/detail"],
      }),
    ]);
    lightyToast.success(data.message);
  };

  const { mutate: makeGroup, isPending } = useMakeGroup({
    group: { ...newGroup, groupImageUrl: groupImageUrl },
    onSuccess: makeGroupSuccessHandler,
  });

  useEffect(() => {
    if (!isClient) return;
    return setNewGroup({
      name: "",
      description: "",
      friendIds: null,
      groupImageUrl: "",
    });
  }, [isClient, pathname]);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return <FullPageLoader />;
  }

  if (step === 0 || isPending) {
    return (
      <MakingGroupSuccess
        group={{ ...newGroup, groupImageUrl: groupImageUrl }}
        isPending={isPending}
      />
    );
  }

  if (step === 2) {
    return <InviteFriends setStep={setStep} type="group" />;
  }

  return (
    <div className="min-h-[calc(100dvh+74px)] bg-base-white">
      {header}
      <form className="min-h-dvh flex flex-col px-5 pt-12">
        <Spacing size={24} />
        <AddGroupPhoto image={groupImageUrl} setImage={setGroupImageUrl} />
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
        <Flex align="center" className="text-T5 gap-1">
          <UserIcon width="16" height="16" color="#0A0A0A" />
          <span>그룹 친구</span>
        </Flex>
        <Spacing size={8} />
        <AddFriendsSlider
          setGroup={setNewGroup}
          type="group"
          setStep={setStep}
        />
      </form>
      <FixedBottomButton
        label={"그룹 생성하기"}
        onClick={makeGroup}
        disabled={newGroup.friendIds == null || newGroup.friendIds.length < 1}
      />
    </div>
  );
}
