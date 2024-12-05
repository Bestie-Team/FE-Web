import Flex from "../shared/Flex";
import MessageIcon from "../shared/icons/MessageIcon";
import Spacing from "../shared/Spacing";

export default function ContentWithComments() {
  return (
    <Flex direction="column" style={{ paddingLeft: "24px" }}>
      <div className="text-B4 text-grayscale-800">
        세빈이 집에서 다같이 모여 파티한 날
      </div>
      <Spacing size={4} />
      <Flex align="center">
        <MessageIcon />
        <Spacing direction="horizontal" size={2} />
        <span className="text-B4 text-grayscale-600">댓글수</span>
      </Flex>
    </Flex>
  );
}
