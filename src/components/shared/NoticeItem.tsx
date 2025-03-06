import Flex from "./Flex";
import ArrowRightIcon from "./Icon/ArrowRightIcon";
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
    <Flex className="p-4 rounded-2xl bg-base-white">
      <Flex
        align="center"
        justify="center"
        className="w-8 h-8 rounded-full bg-grayscale-50"
      >
        {icon}
      </Flex>
      <Spacing size={10} direction="horizontal" />
      <Flex direction="column" className="flex-grow gap-1">
        <Flex align="center">
          <span className="text-T5">{title}</span>
          <Spacing size={4} direction="horizontal" />
          <span className="text-C2 text-grayscale-300">{date}</span>
        </Flex>
        <span className="text-B4 text-grayscale-500">{description}</span>
      </Flex>
      <Spacing size={8} direction="horizontal" />
      <div className="self-center">
        <ArrowRightIcon width="24" height="24" />
      </div>
    </Flex>
  );
}
