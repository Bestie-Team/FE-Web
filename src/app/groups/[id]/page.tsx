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
  console.log(params.id);

  const 내가이그룹장인가 = true;

  return (
    <Flex direction="column" className="w-full h-screen bg-grayscale-50">
      <GroupBannerContainer />
      <GroupInfoContainer />
      <div className={styles.dividerWrapper}>
        <div className={styles.divider} />
      </div>
      <GroupLeaderContainer />
      <Spacing size={10} />
      <LightyInfoContainer
        icon={<PencilIcon width="20" height="20" color="#0A0A0A" />}
        title={<span className={styles.title}>그룹 소개</span>}
        editBtn={
          내가이그룹장인가 ? (
            <Button className={styles.button}>편집</Button>
          ) : null
        }
        content={
          <Flex className={styles.contentWrapper}>
            <span>다꾸하는 모임</span>
          </Flex>
        }
      />
      <Spacing size={10} />
      <LightyInfoContainer
        icon={<UserIcon width="20" height="20" color="#0A0A0A" />}
        title={<span className={styles.title}>{`모임 멤버 ${4}`}</span>}
        editBtn={
          내가이그룹장인가 ? (
            <Button className={styles.button}>추가</Button>
          ) : null
        }
        content={<GatheringMembersSlider members={MEMBERS} />}
      />
    </Flex>
  );
}

const styles = {
  divider: "flex-shrink-0 h-[1px] w-full bg-grayscale-50",

  dividerWrapper: "pl-[26px] pr-[14px] bg-base-white",

  title: "font-[700] text-[16px] leading-[20.8px] flex-grow",

  contentWrapper:
    "w-full px-[20px] py-[16px] border-[1px] border-grayscale-100 rounded-[12px] text-B3",

  button:
    "bg-grayscale-50 hover:bg-grayscale-100 px-[12px] py-[8px] rounded-[8px] text-T6",
};
