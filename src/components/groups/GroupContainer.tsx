import Image from "next/image";
import Flex from "../shared/Flex";
import Spacing from "../shared/Spacing";
import ArrowRightIcon from "../shared/Icon/ArrowRightIcon";
import clsx from "clsx";
import * as lighty from "lighty-type";
import GroupMemberImages from "../shared/GroupMemberImages";

export default function GroupContainer({
  group,
  onClick,
  className,
}: {
  group: lighty.Group;
  onClick?: () => void;
  className?: string;
}) {
  const { name, description, groupImageUrl, gatheringCount, members } = group;
  const memberProfileImages = members.map((member) => member.profileImageUrl);
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
              className={styles.leaderImage}
              src={groupImageUrl || "https://cdn.lighty.today/cute.jpg"}
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
          <span className="text-B4">{gatheringCount}</span>
          <div className={styles.bar} />
          <span className={styles.font}>그룹 멤버</span>
          <Spacing size={2} direction="horizontal" />
          <span className="text-B4">{members.length}</span>
          <Spacing size={12} direction="horizontal" />
          <GroupMemberImages
            width={24}
            height={24}
            gap={8}
            memberImageUrls={memberProfileImages}
          />
        </Flex>
      </Flex>
      <ArrowRightIcon color="#979797" />
    </Flex>
  );
}

const styles = {
  leaderImage: "object-cover rounded-full h-[48px]",
  groupContainer: "bg-base-white gap-[12px] p-[20px] rounded-[16px]",

  font: "text-C2 text-grayscale-300",
  bar: "mx-[12px] bg-grayscale-100 h-[13px] w-[1px]",
};
