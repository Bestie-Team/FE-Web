import Flex from "../shared/Flex";
import Spacing from "../shared/Spacing";
import ContentWithComments from "./ContentWithComments";
import PhotoSwiper from "../shared/PhotoSwiper";
import { Dispatch, SetStateAction, useMemo, useState } from "react";
import InfoBar from "./InfoBar";
import { Feed } from "@/models/feed";

export default function FeedCard({
  feed,
  onClick,
}: {
  feed: Feed;
  onClick: Dispatch<SetStateAction<string>>;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const writer = feed?.writer;
  const friendInfo = useMemo(
    () =>
      feed.withMembers.map((other) => ({
        name: other.name,
        imageUrl: other.profileImageUrl,
      })),
    [feed]
  );

  const handleClick = () => {
    onClick(feed.id);
    if (isOpen) {
      setIsOpen(false);
    }
  };

  if (!writer) return null;

  return (
    <Flex direction="column" className="py-3" onClick={handleClick}>
      <InfoBar
        friendInfo={friendInfo}
        feed={feed}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />
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
