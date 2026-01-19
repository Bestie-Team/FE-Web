import Spacing from "../shared/Spacing";
import Flex from "../shared/Flex";
import { AddFriendItem } from "../home/FriendItem";
import {
  selectedFriendIdsSelector,
  selectedFriendsAtom,
} from "@/atoms/friends";
import { SetterOrUpdater, useRecoilState, useRecoilValue } from "recoil";
import DeletableFriendItem from "../friends/DeletableFriendItem";
import React, { Dispatch, SetStateAction, useEffect } from "react";
import type * as lighty from "lighty-type";
import { CreateGroupRequest } from "@/models/group";

export default function AddFriendsSlider({
  type,
  setGathering,
  setGroup,
  setStep,
}: {
  type: "gathering" | "group";
  setGathering?: SetterOrUpdater<lighty.CreateGatheringRequest>;
  setGroup?: Dispatch<SetStateAction<CreateGroupRequest>>;
  setStep?: (step: number) => void;
}) {
  const [friends, setFriends] = useRecoilState<lighty.User[] | null>(
    selectedFriendsAtom
  );
  const selectedFriendIds = useRecoilValue(selectedFriendIdsSelector);
  const onClickDelete = (friend: lighty.User) => {
    const changedFriends = friends?.filter(
      (friendItem) => friendItem.id !== friend.id
    );
    if (changedFriends) {
      setFriends(changedFriends);
    }
  };

  useEffect(() => {
    if (type === "group" && setGroup) {
      setGroup((prev: CreateGroupRequest) => ({
        ...prev,
        friendIds: selectedFriendIds,
      }));
    } else if (type === "gathering" && setGathering) {
      setGathering((prev: lighty.CreateGatheringRequest) => ({
        ...prev,
        friendIds: selectedFriendIds,
      }));
    }
  }, [selectedFriendIds, setGathering, setGroup, type]);

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
        {friends
          ? friends.map((friend, i) => {
              return (
                <React.Fragment key={`friendItem${i}`}>
                  <DeletableFriendItem
                    friendInfo={friend}
                    onClickDelete={() => onClickDelete(friend)}
                  />
                  <Spacing size={4} direction="horizontal" />
                </React.Fragment>
              );
            })
          : null}
      </Flex>
    </div>
  );
}
