import MemoryCard from "@/components/feed/MemoryCard";
import NoFeed from "@/components/feed/NoFeed";
import Flex from "@/components/shared/Flex";
import { Feed } from "@/models/feed";
import { Dispatch, SetStateAction } from "react";

export type FeedType = "나의피드" | "전체";

export default function MyFeed({
  feeds,
  onClickFeed,
}: {
  feeds: Feed[];
  onClickFeed: Dispatch<SetStateAction<string>>;
}) {
  return (
    <div className="pt-[90px] pb-[111px] animate-fadeIn">
      <Flex direction="column">
        {feeds?.length > 0 ? (
          feeds.map((feed) => (
            <MemoryCard key={feed.id} feed={feed} onClick={onClickFeed} />
          ))
        ) : (
          <NoFeed />
        )}
      </Flex>
    </div>
  );
}
