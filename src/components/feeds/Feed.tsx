import FeedCard from "@/components/feeds/FeedCard";
import { Feed } from "@/models/feed";
import clsx from "clsx";
import { Dispatch, SetStateAction } from "react";
import Spacing from "../shared/Spacing";
import DotSpinner from "../shared/Spinner/DotSpinner";

export type FeedType = "나의피드" | "전체";

export default function MyFeed({
  feeds,
  onClickFeed,
  className,
  isFetching,
}: {
  feeds: Feed[];
  onClickFeed: Dispatch<SetStateAction<string>>;
  className?: string;
  isFetching: boolean;
}) {
  return (
    <div
      className={clsx(
        "extended-container animate-fadeIn will-change-[opacity]",
        className
      )}
    >
      {feeds.map((feed) => (
        <FeedCard key={feed.id} feed={feed} onClick={onClickFeed} />
      ))}
      <Spacing size={50} />
      {isFetching && <DotSpinner />}
    </div>
  );
}
