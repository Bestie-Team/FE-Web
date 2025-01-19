import React from "react";
import * as lighty from "lighty-type";
import Flex from "../shared/Flex";
import Spacing from "../shared/Spacing";
import Button from "../shared/Button/Button";
import Link from "next/link";
import FriendListItem from "./FriendListItem";
import { SetterOrUpdater } from "recoil";
import Modal from "../shared/Modal/Modal";

export default function FriendsListContainer({
  friends,
  searchedFriends,
  isModalOpen,
  setIsModalOpen,
}: {
  friends?: lighty.User[];
  searchedFriends?: lighty.User[];
  isModalOpen: boolean;
  setIsModalOpen: SetterOrUpdater<boolean>;
}) {
  if (searchedFriends) {
    return (
      <Flex
        direction="column"
        style={{
          height: "100dvh",
          backgroundColor: "#F4F4F4",
          paddingTop: "177px",
          paddingBottom: "60px",
          paddingLeft: "20px",
          paddingRight: "20px",
        }}
      >
        <ul>
          {searchedFriends?.map((friendItem, idx) => {
            return (
              <React.Fragment key={`${friendItem.accountId}`}>
                <FriendListItem
                  friendInfo={friendItem}
                  idx={idx}
                  type="friend"
                />
                <Spacing size={16} />
              </React.Fragment>
            );
          })}
        </ul>
      </Flex>
    );
  }
  return (
    <Flex
      direction="column"
      style={{
        height: "100dvh",
        backgroundColor: "#F4F4F4",
        paddingTop: "177px",
        paddingBottom: "60px",
        paddingLeft: "20px",
        paddingRight: "20px",
      }}
    >
      <span className="text-T5">{`친구 ${friends?.length}`}</span>
      <Spacing size={12} />
      {friends?.length === 0 ? (
        <Flex
          direction="column"
          align="center"
          justify="center"
          className="flex-grow"
        >
          <span className="text-B2">
            친구가 아직 라이티를 가입하지 않았다면?
          </span>
          <Spacing size={20} />
          <Button
            color="#0a0a0a"
            className="rounded-[12px] py-[12px] px-[14px] text-base-white text-B3"
          >
            <Link href="/friends/search">💌 친구 초대하기</Link>
          </Button>
        </Flex>
      ) : (
        <ul>
          {friends?.map((friendItem, idx) => {
            return (
              <React.Fragment key={`${friendItem.accountId}`}>
                <FriendListItem
                  friendInfo={friendItem}
                  idx={idx}
                  type="friend"
                />
                <Spacing size={16} />
              </React.Fragment>
            );
          })}
        </ul>
      )}
      {isModalOpen ? (
        <Modal
          action={() => {}}
          onClose={() => {
            setIsModalOpen(false);
          }}
        />
      ) : null}
    </Flex>
  );
}
