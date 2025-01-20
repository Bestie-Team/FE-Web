import Flex from "../shared/Flex";
import Spacing from "../shared/Spacing";
import ContentWithComments from "./ContentWithComments";
import PhotoSwiper from "../shared/PhotoSwiper";
import { Feed } from "@/models/feed";
import { Dispatch, SetStateAction } from "react";
import InfoBar from "./InfoBar";
import useGatheringDetail from "../gathering/hooks/useGatheringDetail";

export default function MemoryCard({
  feed,
  onClick,
}: {
  feed: Feed;
  onClick: Dispatch<SetStateAction<string>>;
}) {
  if (!feed?.gathering?.id) return;
  const { data } = useGatheringDetail({ gatheringId: feed.gathering.id });
  const writer = feed?.writer;
  const others = data?.members.filter((member) => member.id !== writer.id);

  if (data?.hostUser && writer.id != data?.hostUser.id) {
    others?.push(data?.hostUser);
  }
  const othersImageUrl = others?.map((other) => other.profileImageUrl);

  if (!writer || !othersImageUrl) return;
  return (
    <Flex
      direction="column"
      className="py-[12px]"
      onClick={() => {
        onClick(feed.id);
      }}
    >
      {othersImageUrl.length > 0 ? (
        <InfoBar
          memberImageUrls={othersImageUrl}
          writer={writer}
          selectedId={feed.id}
        />
      ) : null}
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
