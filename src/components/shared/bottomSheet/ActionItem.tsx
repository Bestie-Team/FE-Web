import Button from "../buttons";
import Flex from "../Flex";
import ArrowRightIcon from "../icons/ArrowRightIcon";
import Spacing from "../Spacing";

export default function ActionItem({
  title,
  onClick,
  subTitle,
  icon,
}: {
  title: string;
  onClick?: () => void;
  subTitle?: string;
  icon: React.ReactNode;
}) {
  return (
    <Flex className="py-[12px] w-full">
      <Button className={buttonStyle}>{icon}</Button>
      <Spacing size={12} direction="horizontal" />
      <Flex className="flex-grow cursor-pointer" onClick={onClick}>
        <Flex direction="column" className="flex-grow">
          <span className="text-T5">{title}</span>
          <Spacing size={4} />
          <span className="text-C2 text-grayscale-400">{subTitle}</span>
        </Flex>
        <Spacing size={12} />
        <ArrowRightIcon />
      </Flex>
    </Flex>
  );
}

const buttonStyle =
  "bg-grayscale-900 w-[40px] h-[40px] p-[11px] rounded-full cursor-default";
