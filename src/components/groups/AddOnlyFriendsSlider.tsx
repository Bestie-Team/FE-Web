import Spacing from "../shared/Spacing";
import Flex from "../shared/Flex";
import { AddFriendItem } from "../home/FriendItem";
import React from "react";
import type { User } from "lighty-type";
import UnDeletableFriendItem from "../friends/UnDeletableFriendItem";

export default function AddOnlyFriendsSlider({
  setStep,
  members,
}: {
  setStep?: (step: number) => void;
  members: User[];
}) {
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
        {members.map((finalMember, i) => {
          return (
            <React.Fragment key={`friendItem${i}`}>
              <UnDeletableFriendItem friendInfo={finalMember} />
              <Spacing size={4} direction="horizontal" />
            </React.Fragment>
          );
        })}
      </Flex>
    </div>
  );
}
