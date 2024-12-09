import { commentModalStateAtom } from "@/atom/feed";
import Flex from "../shared/Flex";
import MessageIcon from "../shared/icons/MessageIcon";
import Spacing from "../shared/Spacing";
import { useSetRecoilState } from "recoil";

export default function ContentWithComments() {
  const setModalOpen = useSetRecoilState(commentModalStateAtom);
  return (
    <Flex direction="column" style={{ padding: "0 24px" }}>
      <div className="text-B4 text-grayscale-800">
        바람이 부는 언덕 위에 서서 하늘을 바라보니, 구름들이 흘러가는 모습이
        마치 흰색 물결처럼 부드럽게 흩어졌다. 사람들은 각자의 길을 따라가며 서로
        다른 꿈을 꾸고, 시간은 쉼 없이 흐르며 모든 것을 감싸 안는다. 오늘의 작은
        선택들이 내일의 커다란 변화를 만들어낼 것이다
      </div>
      <Spacing size={4} />
      <Flex
        align="center"
        style={{
          cursor: "pointer",
        }}
        onClick={() => {
          setModalOpen(true);
        }}
      >
        <MessageIcon />
        <Spacing direction="horizontal" size={2} />
        <span className="text-B4 text-grayscale-600">댓글수</span>
      </Flex>
    </Flex>
  );
}
