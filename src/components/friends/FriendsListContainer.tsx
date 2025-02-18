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
  isModalOpen,
  setIsModalOpen,
}: {
  friends?: lighty.User[];
  isModalOpen: boolean;
  setIsModalOpen: SetterOrUpdater<boolean>;
}) {
  return (
    <div className="bg-grayscale-50 pb-15 px-5">
      <span className="text-T5" id="friendList">{`친구 ${
        friends ? friends?.length : 0
      }`}</span>
      <Spacing size={12} />
      {friends?.length === 0 ? (
        <Flex
          direction="column"
          align="center"
          justify="center"
          className="h-[calc(100dvh-300px)] gap-5"
        >
          <span className="text-B2">
            친구가 아직 라이티를 가입하지 않았다면?
          </span>
          <Button
            color="#0a0a0a"
            className="rounded-[12px] py-[12px] px-[14px] text-base-white text-B3"
          >
            <Link href="/friends/search">💌 친구 초대하기</Link>
          </Button>
        </Flex>
      ) : (
        <ul aria-labelledby="friendList">
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
    </div>
  );
}
