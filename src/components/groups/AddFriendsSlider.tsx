import React from "react";
import Spacing from "../shared/Spacing";
import Flex from "../shared/Flex";
import FriendItem, { AddFriendItem } from "../home/FriendItem";
import { useRouter } from "next/navigation";
import { FriendInfo } from "@/models/friend";
import { selectedFriendsAtom } from "@/atoms/friends";
import { useRecoilValue } from "recoil";
import { GroupInfoResponse } from "@/models/group";
import { selectedGroupAtom } from "@/atoms/gathering";

export type AddFriendsSliderType = "친구" | "그룹";

export default function AddFriendsSlider({
  type = "친구",
}: {
  type?: AddFriendsSliderType;
}) {
  const router = useRouter();
  const friends = useRecoilValue<FriendInfo[]>(selectedFriendsAtom);
  const selectedGroup = useRecoilValue<GroupInfoResponse>(selectedGroupAtom);
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
                  <FriendItem friendInfo={friend} />
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
