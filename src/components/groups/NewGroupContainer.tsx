import Image from "next/image";
import Flex from "../shared/Flex";
import Spacing from "../shared/Spacing";
import ArrowRightIcon from "../shared/Icon/ArrowRightIcon";
import clsx from "clsx";
import * as lighty from "lighty-type";
const DEFAULT_IMAGE = "https://cdn.lighty.today/lighty_square.png";

export default function NewGroupContainer({
  group,
  onClick,
  className,
}: {
  group: lighty.CreateGroupRequest;
  onClick?: () => void;
  className?: string;
}) {
  const { name, description, groupImageUrl, friendIds } = group;

  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  return (
    <Flex
      align="center"
      className={clsx(styles.groupContainer, className)}
      onClick={handleClick}
    >
      <Flex direction="column" className="flex-grow">
        <Flex align="center">
          <div className="w-12 h-12">
            <Image
              alt="leaderImg"
              width={48}
              height={48}
              className={styles.leaderImage}
              src={groupImageUrl || DEFAULT_IMAGE}
            />
          </div>
          <Spacing size={12} direction="horizontal" />
          <Flex direction="column">
            <span className="text-T5">{name}</span>
            <Spacing size={4} />
            <span className={styles.font}>{description}</span>
          </Flex>
        </Flex>
        <Spacing size={12} />
        <Flex align="center">
          <span className={styles.font}>약속횟수</span>
          <Spacing size={2} direction="horizontal" />
          <span className="text-B4">0</span>
          <div className={styles.bar} />
          <span className={styles.font}>그룹 멤버</span>
          <Spacing size={2} direction="horizontal" />
          <span className="text-B4">{friendIds.length}</span>
          <Spacing size={12} direction="horizontal" />
        </Flex>
      </Flex>
      <ArrowRightIcon color="#979797" />
    </Flex>
  );
}

const styles = {
  leaderImage: "object-cover rounded-full h-12",
  groupContainer: "bg-base-white gap-3 p-5 rounded-[16px]",

  font: "text-C2 text-grayscale-300",
  bar: "mx-3 bg-grayscale-100 h-[13px] w-[1px]",
};
