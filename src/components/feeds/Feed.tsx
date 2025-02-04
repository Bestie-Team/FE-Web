import MemoryCard from "@/components/feeds/MemoryCard";
import Flex from "@/components/shared/Flex";
import { Feed } from "@/models/feed";
import clsx from "clsx";
import { Dispatch, SetStateAction } from "react";

export type FeedType = "나의피드" | "전체";

export default function MyFeed({
  feeds,
  onClickFeed,
  className,
}: {
  feeds: Feed[];
  onClickFeed: Dispatch<SetStateAction<string>>;
  className?: string;
}) {
  return (
    <div className={clsx("pt-[90px] pb-[111px] animate-fadeIn", className)}>
      <Flex direction="column">
        {feeds.map((feed) => (
          <MemoryCard key={feed.id} feed={feed} onClick={onClickFeed} />
        ))}
      </Flex>
    </div>
  );
}
