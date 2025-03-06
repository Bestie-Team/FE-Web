import clsx from "clsx";
import Button from "../Button/Button";
import Flex from "../Flex";
import ArrowRightIcon from "../Icon/ArrowRightIcon";

export default function ActionItem({
  padding,
  title,
  onClick,
  subTitle,
  icon,
}: {
  padding?: string;
  title: string;
  onClick: () => void;
  subTitle?: string;
  icon: React.ReactNode;
}) {
  return (
    <Flex
      className={clsx(styles.container, padding)}
      onMouseDown={(e) => {
        e.stopPropagation();
        onClick();
      }}
    >
      <Button className={styles.button}>{icon}</Button>
      <Flex className={styles.descWrapper}>
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
  container: "gap-3 py-3 w-full hover:animate-tinkle will-change-transform",

  descWrapper: "gap-3 flex-grow cursor-pointer items-center",
  button:
    "bg-grayscale-900 w-10 h-10 flex justify-center items-center rounded-full cursor-default",

  subTitle: "text-C2 text-grayscale-400",
};
