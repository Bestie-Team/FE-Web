import { FeedCommentResponse } from "@/models/feed";
import Flex from "../Flex";
import Options from "../Options";
import Spacing from "../Spacing";
import { useAuth } from "../providers/AuthProvider";
import { addHours } from "date-fns";
import { formatDate } from "@/utils/formatDate";

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
    <Flex align="center" className={styles.container}>
      <span className={styles.commenter}>{writer.accountId}</span>
      <Spacing direction="horizontal" size={8} />
      <span className={styles.comment}>{content}</span>
      <Spacing direction="horizontal" size={8} />
      <span className={styles.time}>{time}</span>
      {isMe && (
        <>
          <Spacing direction="horizontal" size={8} />
          <Options width="12" height="12" type="default" />
        </>
      )}
    </Flex>
  );
}

const styles = {
  container: "p-[12px] border-[1px] rounded-[16px] border-grayscale-100 w-fit",

  commenter: "text-T6 flex-none",
  comment: "text-B4",

  time: "text-C5 text-grayscale-300 flex-none",
};
