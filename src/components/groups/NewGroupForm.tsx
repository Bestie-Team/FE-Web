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

interface NewGroupFormPropsType {
  groupImageUrl: string | null;
  setGroupImageUrl: React.Dispatch<React.SetStateAction<string>>;
  newGroup: CreateGroupRequest;
  setNewGroup: React.Dispatch<React.SetStateAction<CreateGroupRequest>>;
  setStep: (step: number) => void;
}

export default function NewGroupForm({
  groupImageUrl,
  setGroupImageUrl,
  newGroup,
  setNewGroup,
  setStep,
}: NewGroupFormPropsType) {
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
    </form>
  );
}
