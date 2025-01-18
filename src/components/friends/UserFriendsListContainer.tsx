import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import useFriends from "./hooks/useFriends";
import * as lighty from "lighty-type";
import { friendsModalStateAtom } from "@/atoms/friends";
import FriendsListContainer from "./FriendsListContainer";

export default function UserFriendsListContainer() {
  const [friends, setFriends] = useState<lighty.User[] | []>([]);
  const [cursor, setCursor] = useState<lighty.UserCursor | null>();
  const [isModalOpen, setIsModalOpen] = useRecoilState(friendsModalStateAtom);

  const { data } = useFriends({
    name: cursor?.name ?? "가가",
    accountId: cursor?.accountId ?? "aaaaa",
    limit: 10,
  });
  console.log(data);

  useEffect(() => {
    if (data?.users) {
      setFriends([...friends, ...data?.users]);
    }
    if (data?.nextCursor) {
      setCursor(data?.nextCursor);
    }
  }, [data]);

  return (
    <FriendsListContainer
      friends={friends}
      isModalOpen={isModalOpen}
      setIsModalOpen={setIsModalOpen}
    />
  );
}
