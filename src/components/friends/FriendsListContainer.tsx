import React from "react";
import * as lighty from "lighty-type";
import Flex from "../shared/Flex";
import Spacing from "../shared/Spacing";
import Button from "../shared/Button/Button";
import Link from "next/link";
import FriendListItem from "./FriendListItem";
import DotSpinnerSmall from "../shared/Spinner/DotSpinnerSmall";

export default function FriendsListContainer({
  friends,
  isFetching,
}: {
  friends?: lighty.User[];
  isFetching: boolean;
}) {
  return (
    <div className="pb-20 px-5">
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
            className="rounded-xl py-3 px-[14px] text-base-white text-B3"
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
          {isFetching && <DotSpinnerSmall />}
        </ul>
      )}
    </div>
  );
}
