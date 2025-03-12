import Flex from "../Flex";
import Panel from "../Panel/Panel";
import Spacing from "../Spacing";

export function FeedSkeleton() {
  return (
    <Flex className="extended-container pl-5 pt-5" direction="column">
      <Flex className="gap-[6px]">
        <div className="w-9 h-9 rounded-full bg-grayscale-50 animate-pulse" />
        <Flex className="gap-[2px]" direction="column">
          <span className="w-40 h-[18px] rounded-[4px] bg-grayscale-50 animate-pulse" />
          <span className="w-[29px] h-[14px] rounded-[4px] bg-grayscale-50 animate-pulse" />
        </Flex>
      </Flex>
      <Spacing size={12} />
      <div className="w-[340px] h-[390px] rounded-2xl bg-grayscale-50 animate-pulse" />
      <Spacing size={8} />
      <Flex direction="column" className="pl-1 gap-[4px]">
        <span className="w-80 h-5 bg-grayscale-50 animate-pulse rounded-[4px]" />
        <span className="w-11 h-5 bg-grayscale-50 animate-pulse rounded-[4px]" />
      </Flex>
    </Flex>
  );
}

export default function FeedPageSkeleton() {
  return (
    <div className="h-dvh w-full">
      <header className="flex flex-col">
        <div className="w-full flex justify-between items-center h-12 pl-5 text-[20px] font-[700] leading-[26px] tracking-[-0.3px]">
          <span>{"추억 피드"}</span>
        </div>
        <div id="filter" className={"px-5 w-full"}>
          <Panel
            selectedTab={"1"}
            long="short"
            title1="전체"
            title2="마이"
            onClick={() => {}}
            year={false}
          />
        </div>
      </header>
      <div className="h-dvh">
        <div className="h-full no-scrollbar pt-[90px] pb-28">
          <FeedSkeleton />
        </div>
      </div>
    </div>
  );
}
