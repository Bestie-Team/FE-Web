import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import * as lighty from "lighty-type";
import Flex from "../shared/Flex";
import Spacing from "../shared/Spacing";
import Button from "../shared/Button/Button";
import Link from "next/link";
import FriendListItem from "./FriendListItem";
import { SetterOrUpdater } from "recoil";
import Modal from "../shared/Modal/Modal";
import DotSpinnerSmall from "../shared/Spinner/DotSpinnerSmall";

export default function FriendsListContainer({
  friends,
  hasMore,
  loadMore,
  isModalOpen,
  setIsModalOpen,
}: {
  friends?: lighty.User[];
  hasMore: boolean;
  loadMore: () => void;
  isModalOpen: boolean;
  setIsModalOpen: SetterOrUpdater<boolean>;
}) {
  return (
    <div
      id="scrollableDiv"
      className="flex flex-col h-screen bg-grayscale-50 pb-15 px-5 overflow-y-scroll no-scrollbar"
    >
      <span className="text-T5">{`친구 ${friends?.length}`}</span>
      <Spacing size={12} />
      {friends?.length === 0 ? (
        <Flex
          direction="column"
          align="center"
          justify="center"
          className="h-[calc(100dvh-300px)]"
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
        <InfiniteScroll
          className="!overflow-visible"
          dataLength={friends?.length ?? 0}
          hasMore={hasMore}
          loader={<DotSpinnerSmall />}
          next={loadMore}
          scrollThreshold="10px"
          scrollableTarget="scrollableDiv"
        >
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
        </InfiniteScroll>
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
