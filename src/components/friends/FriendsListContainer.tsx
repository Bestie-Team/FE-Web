import React from "react";
import * as lighty from "lighty-type";
import Flex from "../shared/Flex";
import Spacing from "../shared/Spacing";
import Button from "../shared/Button/Button";
import FriendListItem from "./FriendListItem";
import DotSpinnerSmall from "../shared/Spinner/DotSpinnerSmall";
import handleShare from "@/utils/handleShare";

export default function FriendsListContainer({
  friends,
  isFetching,
}: {
  friends?: lighty.User[];
  isFetching: boolean;
}) {
  const sharingData = {
    url: `https://lighty.today`,
    text: "친구가 라이티에 초대했어요! 라이티에서 추억을 쌓아볼까요?",
    title: "Lighty, 나만의 프라이빗 일기 SNS",
  };
  return (
    <div className="h-full pb-14 px-5">
      {friends?.length === 0 ? (
        <Flex
          direction="column"
          align="center"
          justify="center"
          className="h-[calc(100dvh-278px)]"
        >
          <Flex
            className="pb-5 gap-5 items-center justify-center"
            direction="column"
          >
            <span className="text-B2">
              친구가 아직 라이티를 가입하지 않았다면?
            </span>
            <Button
              color="#0a0a0a"
              className="rounded-xl py-3 px-[14px] text-base-white text-B3"
              onClick={() => handleShare(sharingData)}
            >
              💌 친구 초대하기
            </Button>
          </Flex>
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
