"use client";
import { newGroupAtom } from "@/atoms/group";
import AddFriendsSlider from "@/components/groups/AddFriendsSlider";
import AddGroupPhoto from "@/components/groups/AddGroupPhoto";
import FixedBottomButton from "@/components/shared/buttons/FixedBottomButton";
import Flex from "@/components/shared/Flex";
import FeedIcon from "@/components/shared/icons/FeedIcon";
import PencilIcon from "@/components/shared/icons/PencilIcon";
import UserIcon from "@/components/shared/icons/UserIcon";
import Input from "@/components/shared/inputs/Input";
import Spacing from "@/components/shared/Spacing";
import { GroupInfo } from "@/models/group";
import HeaderReturner from "@/utils/headerReturner";
import { useRecoilState } from "recoil";

export default function NewGroupPage() {
  const [newGroup, setNewGroup] = useRecoilState<GroupInfo>(newGroupAtom);

  return (
    <div className="h-screen bg-base-white">
      <div>{HeaderReturner()}</div>
      <form className="flex flex-col px-[20px]">
        <Spacing size={24} />
        <AddGroupPhoto image={newGroup.groupImageUrl} setImage={setNewGroup} />
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
        <AddFriendsSlider setGroup={setNewGroup} type="group" />
      </form>
      <FixedBottomButton
        label="그룹 생성하기"
        onClick={() => {
          console.log(newGroup);
        }}
      />
    </div>
  );
}
