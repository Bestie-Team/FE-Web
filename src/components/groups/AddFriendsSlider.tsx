import React from "react";
import Spacing from "../shared/Spacing";
import Flex from "../shared/Flex";
import FriendItem, { AddFriendItem } from "../home/FriendItem";
import { useRouter } from "next/navigation";
import { selectedFriendsAtom } from "@/atoms/friends";
import { useRecoilState, useRecoilValue } from "recoil";
import { GroupInfoResponse } from "@/models/group";
import { selectedGroupAtom } from "@/atoms/gathering";
import { MemberInfo } from "@/constants/members";
import DeletableFriendItem from "../friends/DeletableFriendItem";

export type AddFriendsSliderType = "친구" | "그룹";

export default function AddFriendsSlider({
  type = "친구",
}: {
  type?: AddFriendsSliderType;
}) {
  const router = useRouter();
  const [friends, setFriends] =
    useRecoilState<MemberInfo[]>(selectedFriendsAtom);
  const selectedGroup = useRecoilValue<GroupInfoResponse>(selectedGroupAtom);

  const onClickDelete = (friend: MemberInfo) => {
    const changedFriends = friends.filter(
      (friendItem) => friendItem.userId !== friend.userId
    );
    setFriends(changedFriends);
  };

  return (
    <div className="w-full">
      <Flex className="overflow-scroll no-scrollbar">
        <AddFriendItem
          onClick={() => {
            if (type === "친구") {
              router.push("/friends/invite");
            } else {
              router.push("/groups/invite");
            }
          }}
          type={type}
        />
        {type === "친구"
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
        {type === "그룹" && selectedGroup.groupName !== "" ? (
          <FriendItem groupInfo={selectedGroup} />
        ) : null}
      </Flex>
    </div>
  );
}
