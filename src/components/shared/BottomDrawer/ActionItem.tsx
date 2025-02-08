import Button from "../Button/Button";
import Flex from "../Flex";
import ArrowRightIcon from "../Icon/ArrowRightIcon";

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
      <Flex className={styles.descWrapper} onMouseDown={onClick}>
        <Flex direction="column" className="gap-1 flex-grow">
          <span className="text-T5">{title}</span>
          <span className={styles.subTitle}>{subTitle}</span>
        </Flex>
        <ArrowRightIcon />
      </Flex>
    </Flex>
  );
}

const styles = {
  container: "gap-3 py-3 w-full hover:animate-tinkle",

  descWrapper: "gap-3 flex-grow cursor-pointer items-center",
  button:
    "bg-grayscale-900 w-10 h-10 flex justify-center items-center rounded-full cursor-default",

  subTitle: "text-C2 text-grayscale-400",
};
