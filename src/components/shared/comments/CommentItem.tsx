import Flex from "../Flex";
import Options from "../Options";
import Spacing from "../Spacing";

export default function CommentItem() {
  const 댓글슨이가나인가 = false;

  return (
    <Flex align="center" className={styles.container}>
      <span className={styles.commenter}>최은재</span>
      <Spacing direction="horizontal" size={8} />
      <span className={styles.comment}>wow great post</span>
      <Spacing direction="horizontal" size={8} />
      <span className={styles.time}>00분전</span>
      {댓글슨이가나인가 && (
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
