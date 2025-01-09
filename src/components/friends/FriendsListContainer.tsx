import React from "react";
import Flex from "../shared/Flex";
import Spacing from "../shared/Spacing";
import FriendListItem from "./FriendListItem";
import Modal from "../shared/modal";
import { useRecoilState } from "recoil";
import { recordModalStateAtom } from "@/atoms/record";
import FRIENDS from "@/constants/friends";

export default function FriendsListContainer() {
  const [isModalOpen, setIsModalOpen] = useRecoilState(recordModalStateAtom);

  const userFriends = FRIENDS;

  return (
    <Flex
      direction="column"
      style={{
        backgroundColor: "#F4F4F4",
        paddingTop: "177px",
        paddingBottom: "60px",
        paddingLeft: "20px",
        paddingRight: "20px",
      }}
    >
      <span className="text-T5">{`친구 ${userFriends.length}`}</span>
      <Spacing size={12} />
      <ul>
        {userFriends.map((friendItem, idx) => {
          return (
            <React.Fragment key={`${friendItem.accountId}`}>
              <FriendListItem friendInfo={friendItem} idx={idx} type="basic" />
              <Spacing size={16} />
            </React.Fragment>
          );
        })}
      </ul>
      {isModalOpen ? (
        <Modal
          onClose={() => {
            setIsModalOpen(false);
          }}
        />
      ) : null}
    </Flex>
  );
}
