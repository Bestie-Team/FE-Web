import Spacing from "../shared/Spacing";
import Flex from "../shared/Flex";
import { AddFriendItem } from "../home/FriendItem";
import { useRecoilValue } from "recoil";
import React from "react";
import { groupMemberCandidatesSelector } from "@/atoms/group";
import UnDeletableFriendItem from "../friends/UnDeletableFriendItem";

export default function AddOnlyFriendsSlider({
  setStep,
}: {
  setStep?: (step: number) => void;
}) {
  const finalMembers = useRecoilValue(groupMemberCandidatesSelector);

  return (
    <div className="w-full">
      <Flex className="overflow-scroll no-scrollbar gap-1">
        <AddFriendItem
          onClick={() => {
            if (setStep) {
              setStep(2);
            }
          }}
        />
        {finalMembers
          ? finalMembers.map((finalMember, i) => {
              return (
                <React.Fragment key={`friendItem${i}`}>
                  <UnDeletableFriendItem friendInfo={finalMember} />
                  <Spacing size={4} direction="horizontal" />
                </React.Fragment>
              );
            })
          : null}
      </Flex>
    </div>
  );
}
