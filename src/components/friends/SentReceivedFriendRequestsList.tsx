import React from "react";
import Flex from "../shared/Flex";
import Spacing from "../shared/Spacing";
import DotSpinnerSmall from "../shared/Spinner/DotSpinnerSmall";
import FriendListItem from "./FriendListItem";
import useReceivedFriendsRequests from "./hooks/useReceivedFriendsRequests";
import useSentFriendsRequests from "./hooks/useSentFriendsRequests";

export default function SentReceivedFriendRequestsList() {
  const { data: received, isFetching } = useReceivedFriendsRequests({
    name: "가",
    accountId: "a",
    limit: 30,
  });

  const { data: sent } = useSentFriendsRequests({
    name: "가",
    accountId: "a",
    limit: 30,
  });
  const receivedRequests = received?.requests.map((request) => ({
    sender: request.sender,
    requestId: request.id,
  }));
  const sentRequests = sent?.requests.map((request) => ({
    sender: request.sender,
    requestId: request.id,
  }));
  if (isFetching) return <DotSpinnerSmall />;
  return (
    <Flex
      direction="column"
      className="bg-grayscale-50 pt-[177px] px-5 gap-8 h-screen"
    >
      {receivedRequests && receivedRequests.length > 0 && (
        <Flex direction="column">
          <span className="text-T5">받은 요청</span>
          <Spacing size={12} />
          {receivedRequests?.map((receivedRqs, i) => (
            <React.Fragment key={i}>
              <FriendListItem
                idx={1}
                type="receivedRequest"
                senderId={receivedRqs.sender.id}
                friendInfo={receivedRqs.sender}
              />
              <Spacing size={16} />
            </React.Fragment>
          ))}
        </Flex>
      )}

      {sentRequests && sentRequests.length > 0 && (
        <Flex direction="column">
          <span className="text-T5">보낸 요청</span>
          <Spacing size={12} />
          {sentRequests?.map((sentRqs) => (
            <>
              <FriendListItem
                idx={1}
                type="sentRequest"
                senderId={sentRqs.sender.id}
                friendInfo={sentRqs.sender}
              />
              <Spacing size={16} />
            </>
          ))}
        </Flex>
      )}
    </Flex>
  );
}
