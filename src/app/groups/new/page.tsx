"use client";
import Flex from "@/components/shared/Flex";
import FeedIcon from "@/components/shared/icons/FeedIcon";
import PencilIcon from "@/components/shared/icons/PencilIcon";
import PhotoIcon from "@/components/shared/icons/PhotoIcon";
import UserIcon from "@/components/shared/icons/UserIcon";
import Input from "@/components/shared/inputs/Input";
import Spacing from "@/components/shared/Spacing";
import HeaderReturner from "@/utils/headerReturner";

export default function NewGroupPage() {
  return (
    <div className="h-screen bg-base-white">
      <div>{HeaderReturner()}</div>
      <Flex direction="column" className="px-[20px]">
        <Spacing size={24} />
        <Flex
          justify="center"
          align="center"
          direction="column"
          className="w-[170px] h-[170px] bg-grayscale-50 rounded-[14.62px] text-C1 text-grayscale-300"
        >
          <PhotoIcon />
          <Spacing size={8} />
          <span>그룹 이미지 등록</span>
        </Flex>
        <Spacing size={36} />
        <Input
          value={""}
          onChange={() => {}}
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
          value={""}
          onChange={() => {}}
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
      </Flex>
    </div>
  );
}
