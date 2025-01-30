import Flex from "../shared/Flex";
import Spacing from "../shared/Spacing";
import ContentWithComments from "./ContentWithComments";
import PhotoSwiper from "../shared/PhotoSwiper";
import * as lighty from "lighty-type";
import { Dispatch, SetStateAction, useCallback, useMemo } from "react";
import InfoBar from "./InfoBar";
import useGatheringDetail from "../gathering/hooks/useGatheringDetail";

export default function MemoryCard({
  feed,
  onClick,
}: {
  feed: lighty.Feed;
  onClick: Dispatch<SetStateAction<string>>;
}) {
  const { data } = useGatheringDetail({
    gatheringId: feed.gathering?.id || "",
  });
  const writer = feed?.writer;

  const others = useMemo(() => {
    if (!data?.members) return [];
    const filteredMembers = data.members.filter(
      (member) => member.id !== writer.id
    );
    if (data?.hostUser && writer.id !== data.hostUser.id) {
      filteredMembers.push(data.hostUser);
    }
    return filteredMembers;
  }, [data?.members, data?.hostUser, writer.id]);

  const othersImageUrl = useMemo(
    () => others.map((other) => other.profileImageUrl),
    [others]
  );
  const handleClick = useCallback(() => {
    onClick(feed.id);
  }, [onClick, feed.id]);

  if (!feed?.gathering?.id || !writer) return null;

  // 친구 약속일 때 (그룹약속 아니고)
  return (
    <Flex direction="column" className="py-3" onClick={handleClick}>
      {othersImageUrl.length > 0 && (
        <InfoBar memberImageUrls={othersImageUrl} feed={feed} />
      )}
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
