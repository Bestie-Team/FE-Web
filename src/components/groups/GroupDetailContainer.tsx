import React, { Dispatch, SetStateAction } from "react";
import GroupBannerContainer from "./GroupBannerContainer";
import DotSpinner from "../shared/Spinner/DotSpinner";
import GroupInfoContainer from "./GroupInfoContainer";
import LeaderContainer from "../shared/LeaderContainer";
import Spacing from "../shared/Spacing";
import LightyInfoContainer from "../shared/LightyInfoContainer";
import PencilIcon from "../shared/Icon/PencilIcon";
import Flex from "../shared/Flex";
import UserIcon from "../shared/Icon/UserIcon";
import GatheringMemberContainer from "../gathering/GatheringMembersContainer";
import * as lighty from "lighty-type";

interface GroupDetailPropsType {
  groupImageUrl: string;
  setIsLoaded: Dispatch<SetStateAction<boolean>>;
  isLoaded: boolean;
  selectedGroup: lighty.Group;
  owner: lighty.User;
  description: string;
  members: lighty.User[];
}
export default function GroupDetailContainer({
  groupImageUrl,
  setIsLoaded,
  isLoaded,
  selectedGroup,
  owner,
  description,
  members,
}: GroupDetailPropsType) {
  return (
    <>
      <div className="w-full h-[316px] relative">
        <GroupBannerContainer
          imageUrl={groupImageUrl}
          setIsLoaded={setIsLoaded}
        />
        {!isLoaded && <div className="absolute bg-grayscale-10 h-full" />}
      </div>
      <GroupInfoContainer group={selectedGroup} />
      <div className={styles.dividerWrapper}>
        <div className={styles.divider} />
      </div>
      <LeaderContainer leader={owner} />
      <Spacing size={10} color="#F4F4F4" />
      <LightyInfoContainer
        icon={<PencilIcon width="20" height="20" color="#0A0A0A" />}
        title={<span className={styles.title}>그룹 소개</span>}
        content={
          <Flex className={styles.contentWrapper}>
            <span>{description}</span>
          </Flex>
        }
      />
      <Spacing size={10} color="#F4F4F4" />
      <LightyInfoContainer
        icon={<UserIcon width="20" height="20" color="#0A0A0A" />}
        title={
          <span className={styles.title}>{`그룹 멤버 ${members.length}`}</span>
        }
        content={<GatheringMemberContainer members={members} />}
      />
    </>
  );
}

const styles = {
  divider: "flex-shrink-0 h-[1px] w-full bg-grayscale-50",
  dividerWrapper: "pl-[26px] pr-[14px] bg-base-white",
  title: "font-[700] text-base leading-[20.8px] flex-grow",
  contentWrapper:
    "w-full px-5 py-4 border-[1px] border-grayscale-100 rounded-xl text-B3",
};
