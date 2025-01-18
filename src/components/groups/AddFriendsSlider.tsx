import Spacing from "../shared/Spacing";
import Flex from "../shared/Flex";
import { AddFriendItem } from "../home/FriendItem";
import { newGroupMembersAtom } from "@/atoms/friends";
import { SetterOrUpdater, useRecoilState } from "recoil";
import DeletableFriendItem from "../friends/DeletableFriendItem";
import { CreateGatheringRequest } from "@/models/gathering";
import React, { Dispatch, SetStateAction, useEffect } from "react";
import * as lighty from "lighty-type";

export default function AddFriendsSlider({
  type,
  setGathering,
  setGroup,
  setStep,
}: {
  type: "gathering" | "group";
  setGathering?: SetterOrUpdater<CreateGatheringRequest>;
  setGroup?: SetterOrUpdater<lighty.CreateGroupRequest>;
  setStep?: Dispatch<SetStateAction<number>>;
}) {
  const [friends, setFriends] =
    useRecoilState<lighty.User[]>(newGroupMembersAtom);

  const onClickDelete = (friend: lighty.User) => {
    const changedFriends = friends.filter(
      (friendItem) => friendItem.accountId !== friend.id
    );

    setFriends(changedFriends);
  };

  useEffect(() => {
    const friendIds = friends.map((friendItem) => friendItem.id);
    if (type === "group" && setGroup) {
      setGroup((prev: lighty.CreateGroupRequest) => ({
        ...prev,
        friendIds: friendIds,
      }));
    } else if (type === "gathering" && setGathering) {
      setGathering((prev: CreateGatheringRequest) => ({
        ...prev,
        friendIds: friendIds,
      }));
    }
  }, [friends]);

  return (
    <div className="w-full">
      <Flex className="overflow-scroll no-scrollbar">
        <AddFriendItem
          onClick={() => {
            if (setStep) {
              setStep(2);
            }
          }}
        />

        {friends.map((friend, i) => {
          return (
            <React.Fragment key={`friendItem${i}`}>
              <DeletableFriendItem
                friendInfo={friend}
                onClickDelete={() => onClickDelete(friend)}
              />
              <Spacing size={4} direction="horizontal" />
            </React.Fragment>
          );
        })}
      </Flex>
    </div>
  );
}
