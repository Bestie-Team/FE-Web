import Spacing from "@/components/shared/Spacing";
import { FeedList } from "@/components/feeds/FeedList";
import { NoFeedHidden } from "@/components/feeds/NoFeed";

interface Props {
  hiddenFeed: any[];
  isFetching: boolean;
  onFeedSelect: (feedId: string) => void;
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
        <div ref={loadMoreRef} />
      </div>
    </>
  );
}
