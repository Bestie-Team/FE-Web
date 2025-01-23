import React from "react";
import * as lighty from "lighty-type";
import Spacing from "../shared/Spacing";
import { SetterOrUpdater } from "recoil";
import UserListItem from "./UserListItem";
import Modal from "../shared/Modal/Modal";
import InfiniteScroll from "react-infinite-scroll-component";

export default function UserListContainer({
  hasMore,
  loadMore,
  searchedFriends,
  isModalOpen,
  setIsModalOpen,
}: {
  hasMore: boolean;
  loadMore: () => void;
  friends?: lighty.User[];
  searchedFriends?: lighty.User[];
  isModalOpen: boolean;
  setIsModalOpen: SetterOrUpdater<boolean>;
}) {
  if (searchedFriends) {
    return (
      <div
        id="scrollableDiv"
        className="flex flex-col h-screen bg-grayscale-50 pt-[142px] pb-15 px-5 overflow-y-scroll no-scrollbar"
      >
        <InfiniteScroll
          className="!overflow-visible"
          dataLength={searchedFriends?.length ?? 0}
          hasMore={hasMore}
          loader={<></>}
          next={loadMore}
          scrollThreshold="10px"
          scrollableTarget="scrollableDiv"
        >
          <ul>
            {searchedFriends?.map((friendItem, idx) => {
              return (
                <React.Fragment key={`${friendItem.accountId}`}>
                  <UserListItem userInfo={friendItem} idx={idx} />
                  <Spacing size={16} />
                </React.Fragment>
              );
            })}
          </ul>
        </InfiniteScroll>
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
  } else return null;
}
