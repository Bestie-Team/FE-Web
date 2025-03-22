import { FeedCommentResponse } from "@/models/feed";
import Flex from "../Flex";
import Spacing from "../Spacing";
import { useAuth } from "../providers/AuthProvider";
import { formatDate } from "@/utils/formatDate";
import clsx from "clsx";
import CommentOption from "@/components/feeds/CommentOption";
import { MENU_TYPES } from "@/models/dropdown";

export default function CommentItem({
  comment,
  feedWriterId,
}: {
  comment: FeedCommentResponse;
  feedWriterId: string;
}) {
  const { userInfo } = useAuth();
  if (!comment) return;

  const isMyComment = userInfo?.accountId === comment.writer.accountId;
  const isMyFeed = userInfo?.accountId === feedWriterId;

  const { writer, content, createdAt } = comment;
  const time = formatDate(new Date(createdAt));

  console.log("ismyfeed", isMyFeed, userInfo?.accountId, feedWriterId);
  return (
    <Flex
      align="center"
      className={clsx(styles.container, isMyComment ? "!bg-grayscale-50" : "")}
    >
      <div className="flex flex-row flex-wrap items-center gap-2">
        <span className={styles.commenter}>
          {isMyComment ? `${writer.name}(나)` : writer.name}
        </span>
        <span className={styles.comment}>{content}</span>
        <span className={styles.time}>{time}</span>
        {(isMyFeed || isMyComment) && (
          <>
            <Spacing direction="horizontal" size={8} />
            <CommentOption
              commentId={comment.id}
              type={isMyComment ? MENU_TYPES.COMMENT_MINE : MENU_TYPES.COMMENT}
            />
          </>
        )}
      </div>
    </Flex>
  );
}

const styles = {
  container:
    "max-w-full w-fit inline-block p-3 border-[1px] rounded-2xl border-grayscale-100",
  commenter: "text-T6 shrink-0 w-14",
  comment: "text-B4 break-all whitespace-pre-wrap flex-1 min-w-0",

  time: "text-C5 text-grayscale-300 flex-none",
};
