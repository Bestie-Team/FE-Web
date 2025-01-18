import MemoryCard from "@/components/feed/MemoryCard";
import NoFeed from "@/components/feed/NoFeed";
import Flex from "@/components/shared/Flex";
import { Feed } from "@/models/feed";
import { Dispatch, SetStateAction } from "react";

export default function MyFeed({
  feeds,
  which,
  onClickFeed,
}: {
  feeds: Feed[] | null;
  which: string;
  onClickFeed: Dispatch<SetStateAction<string>>;
}) {
  if (!feeds) return;
  return (
    <div className="pt-[107px] pb-[111px] animate-fadeIn">
      <Flex direction="column">
        {feeds?.length > 0 ? (
          feeds.map((feed) => (
            <MemoryCard
              key={feed.id}
              feed={which === "1" ? feed : feed}
              onClick={onClickFeed}
            />
          ))
        ) : (
          <NoFeed />
        )}
      </Flex>
    </div>
  );
}
