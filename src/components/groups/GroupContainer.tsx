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
  onClick: () => void;
  className?: string;
}) {
  const { name, description, groupImageUrl, gatheringCount, members } = group;
  const memberProfileImages = members.map((member) => member.profileImageUrl);

  return (
    <Flex
      align="center"
      className={clsx(styles.groupContainer, className)}
      onMouseDown={onClick}
    >
      <Flex direction="column" className="flex-grow gap-3">
        <Flex align="center" className="gap-3">
          <Image
            alt="leaderImg"
            loading="eager"
            width={48}
            height={48}
            className={styles.leaderImage}
            src={groupImageUrl || "https://cdn.lighty.today/lighty_square.png"}
          />
          <Flex direction="column" className="gap-1">
            <span className="text-T5">{name}</span>
            <span className={styles.font}>{description}</span>
          </Flex>
        </Flex>
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
  leaderImage: "rounded-full !h-12 w-12 object-cover",
  groupContainer:
    "bg-base-white hover:bg-grayscale-10 gap-3 p-5 rounded-[16px] border-[1px] border-grayscale-100",

  font: "text-C2 text-grayscale-300",
  bar: "mx-3 bg-grayscale-100 h-[13px] w-[1px]",
};
