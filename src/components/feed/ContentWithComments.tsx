import { commentModalStateAtom } from "@/atoms/feed";
import Flex from "../shared/Flex";
import MessageIcon from "../shared/icons/MessageIcon";
import Spacing from "../shared/Spacing";
import { useSetRecoilState } from "recoil";

export default function ContentWithComments({
  content,
  commentCount,
}: {
  content: string;
  commentCount: number;
}) {
  const setModalOpen = useSetRecoilState(commentModalStateAtom);
  return (
    <Flex direction="column" className="py-0 px-[24px]">
      <div className="text-B4 text-grayscale-800 pr-[12px]">{content}</div>
      <Spacing size={4} />
      <Flex align="center">
        <MessageIcon
          onClick={() => {
            setModalOpen(true);
          }}
        />
        <Spacing direction="horizontal" size={2} />
        <span
          onClick={() => {
            setModalOpen(true);
          }}
          className="text-B4 text-grayscale-600 cursor-pointer"
        >
          {commentCount}
        </span>
      </Flex>
    </Flex>
  );
}
