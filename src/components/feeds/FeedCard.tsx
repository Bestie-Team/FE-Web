import Flex from "../shared/Flex";
import Spacing from "../shared/Spacing";
import ContentWithComments from "./ContentWithComments";
import PhotoSwiper from "../shared/PhotoSwiper";
import { Dispatch, SetStateAction, useCallback, useMemo } from "react";
import InfoBar from "./InfoBar";
import { Feed } from "@/models/feed";

export default function FeedCard({
  feed,
  onClick,
}: {
  feed: Feed;
  onClick: Dispatch<SetStateAction<string>>;
}) {
  const writer = feed?.writer;
  const friendInfo = useMemo(
    () =>
      feed.withMembers.map((other) => ({
        name: other.name,
        imageUrl: other.profileImageUrl,
      })),
    [feed]
  );

  const handleClick = useCallback(() => {
    onClick(feed.id);
  }, [onClick, feed.id]);

  if (!writer) return null;

  return (
    <Flex direction="column" className="py-3" onClick={handleClick}>
      <InfoBar friendInfo={friendInfo} feed={feed} />
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
