import Flex from "../shared/Flex";
import Spacing from "../shared/Spacing";

export default function GroupInfoContainer() {
  return (
    <Flex className="w-full py-[20px] px-[24px] bg-base-white">
      <Flex align="center">
        <span className="text-T1">다꾸모임💖</span>
        <Spacing size={6} direction="horizontal" />
        <span className="text-T4 text-grayscale-300">그룹</span>
      </Flex>
    </Flex>
  );
}
