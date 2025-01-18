import React from "react";
import * as lighty from "lighty-type";
import Flex from "../shared/Flex";
import Spacing from "../shared/Spacing";
import Modal from "../shared/modal";
import { SetterOrUpdater } from "recoil";
import UserListItem from "./UserListItem";

export default function UserListContainer({
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
          paddingTop: "134px",
          paddingBottom: "60px",
          paddingLeft: "20px",
          paddingRight: "20px",
        }}
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
  } else return null;
}
