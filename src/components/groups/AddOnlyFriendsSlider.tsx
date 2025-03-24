import Spacing from "../shared/Spacing";
import Flex from "../shared/Flex";
import { AddFriendItem } from "../home/FriendItem";
import { useRecoilValue } from "recoil";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import * as lighty from "lighty-type";
import { selectedFriendsAtom } from "@/atoms/friends";
import UnDeletableFriendItem from "../friends/UnDeletableFriendItem";

export default function AddOnlyFriendsSlider({
  setStep,
  groupMembers,
}: {
  setGroupMemberIds?: Dispatch<SetStateAction<string[]>>;
  setStep?: (step: number) => void;
  groupMembers: lighty.User[] | null;
}) {
  const selected = useRecoilValue(selectedFriendsAtom);
  const [finalMembers, setFinalMembers] = useState<lighty.User[]>([]);

  useEffect(() => {
    if (groupMembers !== null) {
      setFinalMembers(groupMembers);
    }
  }, [groupMembers]);

  useEffect(() => {
    if (selected !== null) {
      setFinalMembers((prev: lighty.User[] | []) => {
        return prev ? [...prev, ...selected] : selected || [];
      });
    }
  }, [selected]);
  console.log(groupMembers);

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
