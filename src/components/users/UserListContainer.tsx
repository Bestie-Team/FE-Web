import React from "react";
import * as lighty from "lighty-type";
import Spacing from "../shared/Spacing";
import { SetterOrUpdater } from "recoil";
import UserListItem from "./UserListItem";
import Modal from "../shared/Modal/Modal";
import DotSpinnerSmall from "../shared/Spinner/DotSpinnerSmall";

export default function UserListContainer({
  isFetching,
  searchedFriends,
  isModalOpen,
  setIsModalOpen,
}: {
  isFetching: boolean;
  friends?: lighty.User[];
  searchedFriends?: lighty.User[];
  isModalOpen: boolean;
  setIsModalOpen: SetterOrUpdater<boolean>;
}) {
  if (searchedFriends) {
    return (
      <div className="pt-[142px] pb-20 px-5">
        <ul>
          {searchedFriends?.map((friendItem, idx) => {
            return (
              <React.Fragment key={`${friendItem.accountId}`}>
                <UserListItem userInfo={friendItem} idx={idx} />
                <Spacing size={16} />
              </React.Fragment>
            );
          })}
          {isFetching && <DotSpinnerSmall />}
        </ul>
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
