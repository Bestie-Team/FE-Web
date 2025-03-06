import React, { useEffect, useState } from "react";
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
import { usePathname } from "next/navigation";
import MakingGroupSuccess from "./MakingGroupSuccess";
import ErrorPage from "../shared/ErrorPage";

export default function NewGroupForm({
  step,
  setStep,
}: {
  step: number;
  setStep: (num: number) => void;
}) {
  const [isClient, setIsClient] = useState(false);
  const pathname = usePathname();
  const queryClient = useQueryClient();
  const [newGroup, setNewGroup] =
    useRecoilState<CreateGroupRequest>(newGroupAtom);

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
    if (!isClient) setIsClient(true);
  }, [isClient]);

  if (!isClient) {
    return <ErrorPage />;
  }

  if (step === 0 || isPending) {
    return (
      <MakingGroupSuccess
        group={{ ...newGroup, groupImageUrl: groupImageUrl }}
        isPending={isPending}
      />
    );
  }

  return (
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
      <AddFriendsSlider setGroup={setNewGroup} type="group" setStep={setStep} />
      <FixedBottomButton
        label={"그룹 생성하기"}
        onClick={makeGroup}
        disabled={newGroup.friendIds == null || newGroup.friendIds.length < 1}
      />
    </form>
  );
}
