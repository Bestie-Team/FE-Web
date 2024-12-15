import React from "react";
import Flex from "../shared/Flex";
import Spacing from "../shared/Spacing";
import FriendListItem from "./FriendListItem";

export default function FriendsListContainer() {
  return (
    <Flex
      direction="column"
      style={{
        backgroundColor: "#F4F4F4",
        paddingTop: "177px",
        paddingLeft: "20px",
        paddingRight: "20px",
      }}
    >
      <span className="text-T5">{`친구 ${24}`}</span>
      <Spacing size={12} />
      <ul>
        {Array.from({ length: 12 }, () => 1).map((friendItem, idx) => {
          return (
            <React.Fragment key={`${friendItem}${idx}`}>
              <FriendListItem idx={idx} type="basic" />
              <Spacing size={16} />
            </React.Fragment>
          );
        })}
      </ul>
    </Flex>
  );
}
