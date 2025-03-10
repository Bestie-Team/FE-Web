import Flex from "../Flex";

export default function GroupSkeleton() {
  return (
    <Flex direction="column" className="w-full p-5 gap-3">
      <Flex className="gap-3 w-full" align="center">
        <div className="bg-grayscale-50 rounded-full w-12 h-12" />
        <Flex direction="column" className="gap-1">
          <span className="bg-grayscale-50 w-[83px] h-[18px] rounded-[4px]" />
          <span className="bg-grayscale-50 w-full h-[14px]" />
        </Flex>
      </Flex>
      <div className="bg-grayscale-50 w-full h-5"></div>
    </Flex>
  );
}
