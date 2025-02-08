import Image from "next/image";
import Flex from "../shared/Flex";
import Spacing from "../shared/Spacing";
import ArrowRightIcon from "../shared/Icon/ArrowRightIcon";
import clsx from "clsx";
import { CreateGroupRequest } from "@/models/group";
const DEFAULT_IMAGE = "https://cdn.lighty.today/lighty_square.png";

export default function NewGroupContainer({
  group,
  onClick,
  className,
}: {
  group: CreateGroupRequest;
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
      <Flex direction="column" className="flex-grow gap-3">
        <Flex align="center" className="gap-3">
          <Image
            alt="leaderImg"
            width={48}
            height={48}
            className={styles.leaderImage}
            src={groupImageUrl || DEFAULT_IMAGE}
          />
          <Flex direction="column" className="gap-1">
            <span className="text-T5">{name}</span>
            <span className={styles.font}>{description}</span>
          </Flex>
        </Flex>
        <Flex align="center">
          <span className={styles.font}>약속횟수</span>
          <Spacing size={2} direction="horizontal" />
          <span className="text-B4">0</span>
          <div className={styles.bar} />
          <span className={styles.font}>그룹 멤버</span>
          <Spacing size={2} direction="horizontal" />
          <span className="text-B4">{friendIds ? friendIds.length : 0}</span>
          <Spacing size={12} direction="horizontal" />
        </Flex>
      </Flex>
      <ArrowRightIcon color="#979797" />
    </Flex>
  );
}

const styles = {
  leaderImage: "object-cover rounded-full h-12 w-12",
  groupContainer: "bg-base-white gap-3 p-5 rounded-[16px]",

  font: "text-C2 text-grayscale-300",
  bar: "mx-3 bg-grayscale-100 h-[13px] w-[1px]",
};
