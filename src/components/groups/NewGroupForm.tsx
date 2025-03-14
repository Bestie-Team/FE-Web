import React from "react";
import Spacing from "../shared/Spacing";
import AddGroupPhoto from "./AddGroupPhoto";
import Input from "../shared/Input/Input";
import PencilIcon from "../shared/Icon/PencilIcon";
import FeedIcon from "../shared/Icon/FeedIcon";
import Flex from "../shared/Flex";
import AddFriendsSlider from "./AddFriendsSlider";
import UserIcon from "../shared/Icon/UserIcon";
import { CreateGroupRequest } from "@/models/group";
import { useRecoilState } from "recoil";
import { newGroupAtom } from "@/atoms/group";
import { useQueryClient } from "@tanstack/react-query";
import { lightyToast } from "@/utils/toast";
import useMakeGroup from "./hooks/useMakeGroup";
import FixedBottomButton from "../shared/Button/FixedBottomButton";
import MakingGroupSuccess from "./MakingGroupSuccess";
import { useReactNativeWebView } from "../shared/providers/ReactNativeWebViewProvider";

export default function NewGroupForm({
  step,
  setStep,
}: {
  step: number;
  setStep: (num: number) => void;
}) {
  const queryClient = useQueryClient();
  const [newGroup, setNewGroup] =
    useRecoilState<CreateGroupRequest>(newGroupAtom);
  const { isReactNativeWebView } = useReactNativeWebView();

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
    group: newGroup,
    onSuccess: makeGroupSuccessHandler,
  });

  if (step === 0 || isPending) {
    return (
      <MakingGroupSuccess
        group={{ ...newGroup, groupImageUrl: newGroup.groupImageUrl }}
        isPending={isPending}
      />
    );
  }

  return (
    <form className="min-h-dvh flex flex-col px-5 pt-12 mt-safe-top">
      <Spacing size={24} />
      <AddGroupPhoto image={newGroup.groupImageUrl} setNewGroup={setNewGroup} />
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
      <AddFriendsSlider setGroup={setNewGroup} type="group" setStep={setStep} />
      <FixedBottomButton
        label={"그룹 생성하기"}
        onClick={makeGroup}
        disabled={newGroup.friendIds == null || newGroup.friendIds.length < 1}
        className={isReactNativeWebView ? "mb-safe-bottom" : ""}
      />
    </form>
  );
}
