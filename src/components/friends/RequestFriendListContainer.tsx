import Flex from "../shared/Flex";
import Spacing from "../shared/Spacing";
import FriendListItem from "./FriendListItem";

export default function RequestFriendListContainer() {
  return (
    <Flex direction="column" className="bg-grayscale-50 pt-[177px] pr-[20px]">
      <Flex direction="column">
        <span className="text-T5">받은 요청</span>
        <Spacing size={12} />
        <FriendListItem idx={1} type="sendedRequest" />
      </Flex>
      <Spacing size={32} />
      <Flex direction="column">
        <span className="text-T5">보낸 요청</span>
        <Spacing size={12} />
        <FriendListItem idx={1} type="receivedRequest" />
      </Flex>
    </Flex>
  );
}
