import Flex from "../shared/Flex";
import Spacing from "../shared/Spacing";
import ContentWithComments from "./ContentWithComments";
import PhotoSwiper from "../shared/PhotoSwiper";
import { Feed } from "@/models/feed";
import React from "react";

interface FeedCardProps {
  feed: Feed;
  children: React.ReactNode;
  onClick: () => void;
}

export const FeedCard = ({ feed, children, onClick }: FeedCardProps) => {
  if (!feed?.writer) {
    return null;
  }

  return (
    <Flex direction="column" className="py-3" onClick={onClick}>
      {children}
      <Spacing size={12} />
      <PhotoSwiper feed={feed} />
      <Spacing size={8} />
      <ContentWithComments
        content={feed.content}
        commentCount={feed.commentCount}
      />
    </Flex>
  );
};

export default React.memo(FeedCard);
