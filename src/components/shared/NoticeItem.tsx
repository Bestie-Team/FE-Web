import Flex from "./Flex";
import ArrowRightIcon from "./icons/ArrowRightIcon";
import Spacing from "./Spacing";

interface NoticeProps {
  icon: string;
  title: string;
  date: string;
  description: string;
}

export default function NoticeItem({
  icon,
  title,
  date,
  description,
}: NoticeProps) {
  return (
    <Flex className="p-[16px] rounded-[16px] bg-base-white">
      <Flex
        align="center"
        justify="center"
        className="w-[32px] h-[32px] rounded-full bg-grayscale-50"
      >
        {icon}
      </Flex>
      <Spacing size={10} direction="horizontal" />
      <Flex direction="column" className="flex-grow">
        <Flex align="center">
          <span className="text-T5">{title}</span>
          <Spacing size={4} direction="horizontal" />
          <span className="text-C2 text-grayscale-300">{date}</span>
        </Flex>
        <Spacing size={4} />
        <span className="text-B4 text-grayscale-500">{description}</span>
      </Flex>
      <Spacing size={8} direction="horizontal" />
      <div className="self-center">
        <ArrowRightIcon width="24" height="24" />
      </div>
    </Flex>
  );
}
