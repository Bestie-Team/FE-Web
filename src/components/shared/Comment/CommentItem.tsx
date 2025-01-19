import { FeedCommentResponse } from "@/models/feed";
import Flex from "../Flex";
import Options from "../Options";
import Spacing from "../Spacing";
import { useAuth } from "../providers/AuthProvider";
import { addHours } from "date-fns";
import { formatDate } from "@/utils/formatDate";
import clsx from "clsx";

export default function CommentItem({
  comment,
}: {
  comment: FeedCommentResponse;
}) {
  const { userInfo } = useAuth();
  if (!comment) return;

  const isMe = userInfo?.accountId === comment.writer.accountId;
  const { writer, content, createdAt } = comment;
  const time = formatDate(addHours(new Date(createdAt), 9));
  return (
    <Flex
      align="center"
      className={clsx(styles.container, isMe ? "!bg-grayscale-50" : "")}
    >
      <div className="flex flex-row flex-wrap items-center gap-2">
        <span className={styles.commenter}>{writer.accountId}</span>
        <span className={styles.comment}>{content}</span>
        <span className={styles.time}>{time}</span>
        {isMe && (
          <>
            <Spacing direction="horizontal" size={8} />
            <Options
              width="12"
              height="12"
              color="#0A0A0A"
              type="comment"
              commentId={comment.id}
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
  commenter: "text-T6 shrink-0",
  comment: "text-B4 break-all whitespace-pre-wrap flex-1 min-w-0",

  time: "text-C5 text-grayscale-300 flex-none",
};
