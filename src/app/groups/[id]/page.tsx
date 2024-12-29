"use client";
import GatheringMembersSlider from "@/components/gathering/GatheringMembersContainer";
import GroupLeaderContainer from "@/components/shared/GroupLeaderContainer";
import GroupBannerContainer from "@/components/groups/GroupBannerContainer";
import Flex from "@/components/shared/Flex";
import UserIcon from "@/components/shared/icons/UserIcon";
import Spacing from "@/components/shared/Spacing";
import LightyInfoContainer from "@/components/shared/LightyInfoContainer";
import PencilIcon from "@/components/shared/icons/PencilIcon";
import Button from "@/components/shared/buttons";
import GroupInfoContainer from "@/components/groups/GroupInfoContainer";
import { GROUPS } from "@/constants/groups";

export default function GroupDetailPage({
  params,
}: {
  params: { id: string };
}) {
  // const { id } = params;
  // const { data, isLoading } = useGroup({ id });
  // if (data == null || isLoading) return <div>Loading...</div>;

  // 임시로 아래와 같이 데이터 불러옴
  const { groupLeader, desc, members } = GROUPS[Number(params.id)];

  const 내가이그룹장인가 = true;

  return (
    <Flex direction="column" className="w-full h-screen bg-grayscale-50">
      <GroupBannerContainer imageUrl={GROUPS[Number(params.id)].imageUrl} />
      <GroupInfoContainer group={GROUPS[Number(params.id)]} />
      <div className={styles.dividerWrapper}>
        <div className={styles.divider} />
      </div>
      <GroupLeaderContainer groupLeader={groupLeader} />
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
            <span>{desc}</span>
          </Flex>
        }
      />
      <Spacing size={10} />
      <LightyInfoContainer
        icon={<UserIcon width="20" height="20" color="#0A0A0A" />}
        title={
          <span className={styles.title}>{`모임 멤버 ${members.length}`}</span>
        }
        editBtn={
          내가이그룹장인가 ? (
            <Button className={styles.button}>추가</Button>
          ) : null
        }
        content={<GatheringMembersSlider members={members} />}
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
