import { bottomSheetStateAtom } from "@/atoms/feed";
import Flex from "../shared/Flex";
import MessageIcon from "../shared/Icon/MessageIcon";
import Spacing from "../shared/Spacing";
import { useSetRecoilState } from "recoil";

export default function ContentWithComments({
  content,
  commentCount,
}: {
  content: string;
  commentCount: number;
}) {
  const setBottomSheetState = useSetRecoilState(bottomSheetStateAtom);
  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>{content}</div>
      <Spacing size={4} />
      <Flex align="center">
        <MessageIcon
          onClick={() => {
            setBottomSheetState(true);
          }}
        />
        <Spacing direction="horizontal" size={2} />
        <span
          onClick={() => {
            setBottomSheetState(true);
          }}
          className="text-B4 text-grayscale-600 cursor-pointer"
        >
          {commentCount}
        </span>
      </Flex>
    </div>
  );
}
const styles = {
  wrapper: "pl-6 pr-4 max-w-[430px]",
  content:
    "break-words whitespace-normal overflow-wrap-anywhere text-B4 text-grayscale-800 pr-3",
};
