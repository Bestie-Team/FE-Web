import Spacing from "../shared/Spacing";
import ContentWithComments from "./ContentWithComments";
import PhotoSwiper from "../shared/PhotoSwiper";
import { Feed } from "@/models/feed";
import React, { useCallback } from "react";

interface FeedCardProps {
  feed: Feed;
  children: React.ReactNode;
  onSelect: (feed: Feed) => void;
}

export const FeedCard = ({ feed, children, onSelect }: FeedCardProps) => {
  const handleSelect = useCallback(() => {
    onSelect(feed);
  }, [feed, onSelect]);

  if (!feed?.writer) {
    return null;
  }

  return (
    <div
      role="button"
      tabIndex={0}
      className="flex flex-col py-3"
      onClick={handleSelect}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleSelect();
        }
      }}
    >
      {children}
      <Spacing size={12} />
      <PhotoSwiper feed={feed} />
      <Spacing size={8} />
      <ContentWithComments
        content={feed.content}
        commentCount={feed.commentCount}
      />
    </div>
  );
};

export default React.memo(FeedCard);
