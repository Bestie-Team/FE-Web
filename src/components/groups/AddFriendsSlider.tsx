import Spacing from "../shared/Spacing";
import Flex from "../shared/Flex";
import { AddFriendItem } from "../home/FriendItem";
import { useRouter } from "next/navigation";
import { selectedFriendsAtom } from "@/atoms/friends";
import { SetterOrUpdater, useRecoilState } from "recoil";
import { UserInfo } from "@/models/user";
import DeletableFriendItem from "../friends/DeletableFriendItem";
import { GatheringInfo } from "@/models/gathering";
import React, { useEffect } from "react";
import { GroupInfo } from "@/models/group";

export default function AddFriendsSlider({
  type,
  setGathering,
  setGroup,
}: {
  type: "gathering" | "group";
  setGathering?: SetterOrUpdater<GatheringInfo>;
  setGroup?: SetterOrUpdater<GroupInfo>;
}) {
  const router = useRouter();

  const [friends, setFriends] = useRecoilState<UserInfo[]>(selectedFriendsAtom);

  const onClickDelete = (friend: UserInfo) => {
    const changedFriends = friends.filter(
      (friendItem) => friendItem.accountId !== friend.accountId
    );

    setFriends(changedFriends);
  };

  useEffect(() => {
    const friendIds = friends.map((friendItem) => friendItem.accountId);
    if (type === "group" && setGroup) {
      setGroup(
        (prev: GroupInfo) => ({ ...prev, friendIds: friendIds } as GroupInfo)
      );
    } else if (type === "gathering" && setGathering) {
      setGathering(
        (prev: GatheringInfo) =>
          ({ ...prev, friendIds: friendIds } as GatheringInfo)
      );
    }
  }, [friends]);

  return (
    <div className="w-full">
      <Flex className="overflow-scroll no-scrollbar">
        <AddFriendItem
          onClick={() => {
            router.push("/friends/invite");
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
