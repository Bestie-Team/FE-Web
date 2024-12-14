import { commentModalStateAtom } from "@/atoms/feed";
import Flex from "../shared/Flex";
import MessageIcon from "../shared/icons/MessageIcon";
import Spacing from "../shared/Spacing";
import { useSetRecoilState } from "recoil";

export default function ContentWithComments() {
  const setModalOpen = useSetRecoilState(commentModalStateAtom);
  return (
    <Flex direction="column" className="py-0 px-[24px]">
      <div className="text-B4 text-grayscale-800 pr-[12px]">
        바람이 부는 언덕 위에 서서 하늘을 바라보니, 구름들이 흘러가는 모습이
        마치 흰색 물결처럼 부드럽게 흩어졌다. 사람들은 각자의 길을 따라가며 서로
        다른 꿈을 꾸고, 시간은 쉼 없이 흐르며 모든 것을 감싸 안는다. 오늘의 작은
        선택들이 내일의 커다란 변화를 만들어낼 것이다
      </div>
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
          댓글수
        </span>
      </Flex>
    </Flex>
  );
}
