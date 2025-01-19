import React, { useEffect, useState } from "react";
import Flex from "../shared/Flex";
import Spacing from "../shared/Spacing";
import FriendItem, { AddFriendItem, SeeMoreItem } from "./FriendItem";
import { useRouter } from "next/navigation";
import useFriends from "../friends/hooks/useFriends";
import * as lighty from "lighty-type";

export default function FriendsSlider() {
  const [friends, setFriends] = useState<lighty.User[] | []>([]);
  const [cursor, setCursor] = useState<lighty.UserCursor | null>();
  const router = useRouter();
  const { data } = useFriends({
    name: cursor?.name ?? "가가",
    accountId: cursor?.accountId ?? "aaaaa",
    limit: 10,
  });

  useEffect(() => {
    if (data?.users) {
      setFriends([...friends, ...data?.users]);
    }
    if (data?.nextCursor) {
      setCursor(data?.nextCursor);
    }
  }, [data]);

  return (
    <div className="w-max-[430px] pl-[20px] overflow-scroll no-scrollbar">
      <Spacing size={16} />
      <Flex>
        <AddFriendItem
          onClick={() => {
            router.push("/friends/search");
          }}
        />
        {friends.map((friend, i) => {
          return (
            <React.Fragment key={`friendItem${i}`}>
              <FriendItem friendInfo={friend} />
              <Spacing size={4} direction="horizontal" />
            </React.Fragment>
          );
        })}

        <SeeMoreItem
          onClick={() => {
            console.log("친구를 추가하라");
          }}
        />
      </Flex>
    </div>
  );
}
