import Flex from "../shared/Flex";
import Spacing from "../shared/Spacing";
import ContentWithComments from "./ContentWithComments";
import PhotoSwiper from "../shared/PhotoSwiper";
import { Dispatch, SetStateAction, useState } from "react";
import { Feed } from "@/models/feed";

export default function FeedCard({
  feed,
  onClick,
  children,
}: {
  feed: Feed;
  onClick: Dispatch<SetStateAction<string>>;
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const writer = feed?.writer;

  const handleClick = () => {
    onClick(feed.id);
    if (isOpen) {
      setIsOpen(false);
    }
  };

  if (!writer) return null;

  return (
    <Flex direction="column" className="py-3" onClick={handleClick}>
      {children}
      <Spacing size={12} />
      <PhotoSwiper feed={feed} type="feed" />
      <Spacing size={8} />
      <ContentWithComments
        content={feed.content}
        commentCount={feed.commentCount}
      />
    </Flex>
  );
}
