"use client";
import GatheringMembersSlider from "@/components/gathering/GatheringMembersContainer";
import GroupLeaderContainer from "@/components/shared/GroupLeaderContainer";
import GroupBannerContainer from "@/components/groups/GroupBannerContainer";
import Flex from "@/components/shared/Flex";
import UserIcon from "@/components/shared/icons/UserIcon";
import Spacing from "@/components/shared/Spacing";
import MEMBERS from "@/constants/members";
import LightyInfoContainer from "@/components/shared/LightyInfoContainer";
import PencilIcon from "@/components/shared/icons/PencilIcon";
import Button from "@/components/shared/buttons";
import GroupInfoContainer from "@/components/groups/GroupInfoContainer";

export default function GroupDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const member = 4;
  console.log(params);
  const 내가이그룹장인가 = true;
  return (
    <Flex direction="column" className="w-full h-screen bg-grayscale-50">
      <GroupBannerContainer />
      <GroupInfoContainer />
      <div className="pl-[26px] pr-[14px] bg-base-white">
        <div className="flex-shrink-0 h-[1px] w-full bg-grayscale-50" />
      </div>
      <GroupLeaderContainer />
      <Spacing size={10} />
      <LightyInfoContainer
        icon={<PencilIcon width="20" height="20" color="#0A0A0A" />}
        title={<span className={titleStyle}>그룹 소개</span>}
        editBtn={
          내가이그룹장인가 ? (
            <Button className={buttonStyle}>편집</Button>
          ) : null
        }
        content={
          <Flex className={contentWrapperStyle}>
            <span>다꾸하는 모임</span>
          </Flex>
        }
      />
      <Spacing size={10} />
      <LightyInfoContainer
        icon={<UserIcon width="20" height="20" color="#0A0A0A" />}
        title={<span className={titleStyle}>{`모임 멤버 ${member}`}</span>}
        editBtn={
          내가이그룹장인가 ? (
            <Button className={buttonStyle}>추가</Button>
          ) : null
        }
        content={<GatheringMembersSlider members={MEMBERS} />}
      />
    </Flex>
  );
}

const titleStyle = "font-[700] text-[16px] leading-[20.8px] flex-grow";

const contentWrapperStyle =
  "w-full px-[20px] py-[16px] border-[1px] border-grayscale-100 rounded-[12px] text-B3";

const buttonStyle =
  "bg-grayscale-50 hover:bg-grayscale-100 px-[12px] py-[8px] rounded-[8px] text-T6";
