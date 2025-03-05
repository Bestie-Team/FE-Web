"use client";
import React from "react";
import Flex from "../shared/Flex";
import Spacing from "../shared/Spacing";
import FriendListItem from "./FriendListItem";
import DotSpinner from "../shared/Spinner/DotSpinner";
import { User } from "lighty-type";
import useSentAndReceivedFriendsRequests from "./hooks/useSentAndReceivedFriendsRequests";
interface Request {
  sender: User;
  requestId: string;
}

export default function SentReceivedFriendRequestsList() {
  const { data, isLoading } = useSentAndReceivedFriendsRequests({
    name: "가",
    accountId: "a",
    limit: 30,
  });
  const receivedRequests = data?.received?.requests.map((request) => ({
    sender: request.sender,
    requestId: request.id,
  }));

  const sentRequests = data?.sent?.requests.map((request) => ({
    sender: request.sender,
    requestId: request.id,
  }));

  return (
    <Flex
      direction="column"
      className="bg-grayscale-50 pt-[68px] px-5 gap-8 h-dvh"
    >
      {isLoading && <DotSpinner />}
      {receivedRequests &&
        receivedRequests?.length > 0 &&
        renderRequests(receivedRequests, "받은 요청", "receivedRequest")}
      {sentRequests &&
        sentRequests?.length > 0 &&
        renderRequests(sentRequests, "보낸 요청", "sentRequest")}
    </Flex>
  );
}

const renderRequests = (
  requests: Request[],
  title: string,
  type: "receivedRequest" | "sentRequest"
) => (
  <Flex direction="column">
    <span className="text-T5">{title}</span>
    <Spacing size={12} />
    {requests.map((request, i) => (
      <React.Fragment key={request.requestId}>
        <FriendListItem
          idx={i}
          type={type}
          senderId={request.sender.id}
          friendInfo={request.sender}
        />
        <Spacing size={16} />
      </React.Fragment>
    ))}
  </Flex>
);
