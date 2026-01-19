import Spacing from "@/components/shared/Spacing";
import { FeedList } from "@/components/feeds/FeedPage/FeedList";
import { NoFeedHidden } from "@/components/feeds/NoFeed";
import LoadMoreTrigger from "../shared/LoadMoreTrigger";
import type { Feed } from "@/models/feed";

interface Props {
  hiddenFeed: any[];
  isFetching: boolean;
  onFeedSelect: (feed: Feed) => void;
  loadMoreRef: (node?: Element | null) => void;
  scrollContainerRef: React.RefObject<HTMLDivElement>;
}

export default function HiddenFeedListSection({
  hiddenFeed,
  isFetching,
  onFeedSelect,
  loadMoreRef,
  scrollContainerRef,
}: Props) {
  return (
    <>
      <Spacing size={96} />
      <div ref={scrollContainerRef} className="pt-safe-top pb-14">
        {hiddenFeed && hiddenFeed.length < 1 && <NoFeedHidden />}
        {hiddenFeed && hiddenFeed.length > 0 && (
          <FeedList
            feeds={hiddenFeed}
            userInfo={false}
            onFeedSelect={onFeedSelect}
            isFetching={isFetching}
            isMine={true}
          />
        )}
        <LoadMoreTrigger loadMoreRef={loadMoreRef} />
      </div>
    </>
  );
}
