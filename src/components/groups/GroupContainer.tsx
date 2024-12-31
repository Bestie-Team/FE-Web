import Image from "next/image";
import Flex from "../shared/Flex";
import Spacing from "../shared/Spacing";
import ArrowRightIcon from "../shared/icons/ArrowRightIcon";
import GroupImages from "../shared/GroupImages";
import clsx from "clsx";
import { GroupInfoResponse } from "@/models/group";

export default function GroupContainer({
  group,
  onClick,
  className,
}: {
  group: GroupInfoResponse;
  onClick?: () => void;
  className?: string;
}) {
  const { groupName, desc, gatheringCount, imageUrl, members } = group;

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
          <div className="w-[48px] h-[48px]">
            <Image
              alt="leaderImg"
              width={48}
              height={48}
              className="object-cover rounded-full h-[48px]"
              src={imageUrl || "https://cdn.lighty.today/cute.jpg"}
            />
          </div>
          <Spacing size={12} direction="horizontal" />
          <Flex direction="column">
            <span className="text-T5">{groupName}</span>
            <Spacing size={4} />
            <span className={styles.font}>{desc}</span>
          </Flex>
        </Flex>
        <Spacing size={12} />
        <Flex align="center">
          <span className={styles.font}>모임횟수</span>
          <Spacing size={2} direction="horizontal" />
          <span className="text-B4">{gatheringCount}</span>
          <div className={styles.bar} />
          <span className={styles.font}>그룹 멤버</span>
          <Spacing size={2} direction="horizontal" />
          <span className="text-B4">{members.length}</span>
          <Spacing size={12} direction="horizontal" />
          <GroupImages
            width={24}
            height={24}
            gap={8}
            memberImageUrls={images}
          />
        </Flex>
      </Flex>
      <ArrowRightIcon color="#979797" />
    </Flex>
  );
}

const styles = {
  groupContainer: "bg-base-white gap-[12px] p-[20px] rounded-[16px]",

  font: "text-C2 text-grayscale-300",

  bar: "mx-[12px] bg-grayscale-100 h-[13px] w-[1px]",
};
const images = [
  "https://cdn.lighty.today/bini.JPG",
  "https://cdn.lighty.today/binanton_jp.jpeg",
  "https://cdn.lighty.today/ocean.JPG",
  "https://cdn.lighty.today/groom.JPG",
];
