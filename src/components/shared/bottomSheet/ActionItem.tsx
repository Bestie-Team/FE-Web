import Button from "../buttons/Button";
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
    <Flex className={styles.container}>
      <Button className={styles.button}>{icon}</Button>
      <Spacing size={12} direction="horizontal" />
      <Flex className={styles.descWrapper} onMouseDown={onClick}>
        <Flex direction="column" className="flex-grow">
          <span className="text-T5">{title}</span>
          <Spacing size={4} />
          <span className={styles.subTitle}>{subTitle}</span>
        </Flex>
        <Spacing size={12} />
        <ArrowRightIcon />
      </Flex>
    </Flex>
  );
}

const styles = {
  container: "py-[12px] w-full",

  descWrapper: "flex-grow cursor-pointer items-center",
  button:
    "bg-grayscale-900 w-[40px] h-[40px] flex justify-center items-center rounded-full cursor-default",

  subTitle: "text-C2 text-grayscale-400",
};
