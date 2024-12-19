import Flex from "../shared/Flex";
import CheckInCircleIcon from "../shared/icons/CheckInCircleIcon";
import Spacing from "../shared/Spacing";
import GroupContainer from "./GroupContainer";

export default function MakingGroupDone() {
  return (
    <Flex direction="column">
      <Flex direction="column" align="center">
        <CheckInCircleIcon />
        <Spacing size={17} />
        <span className="text-T2">그룹 생성 완료!</span>
        <Spacing size={12} />
        <span className="text-B3">앞으로 그룹 별로 모임을 만들 수 있어요</span>
      </Flex>
      <Spacing size={48} />
      <GroupContainer className="shadow-sm" />
    </Flex>
  );
}
