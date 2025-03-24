import Image from "next/image";
import Flex from "../shared/Flex";
import Spacing from "../shared/Spacing";
import ArrowRightIcon from "../shared/Icon/ArrowRightIcon";
import clsx from "clsx";
import * as lighty from "lighty-type";
import GroupMemberImages from "../shared/GroupMemberImages";
import LightyIcon from "../shared/Icon/LightyIcon";

export default function GroupContainer({
  group,
  onClick,
  className,
}: {
  group: lighty.Group;
  onClick: (e: React.MouseEvent<HTMLLIElement>) => void;
  className?: string;
}) {
  const { name, description, groupImageUrl, gatheringCount, members } = group;
  const memberProfileImages = members.map((member) => member.profileImageUrl);

  return (
    <li
      className={clsx(styles.groupContainer, className)}
      onMouseDown={(e) => onClick(e)}
    >
      <Flex direction="column" className="flex-grow gap-3">
        <Flex align="center" className="gap-3">
          {!!groupImageUrl ? (
            <Image
              alt="leaderImg"
              width={48}
              height={48}
              className={styles.leaderImage}
              src={groupImageUrl}
            />
          ) : (
            <div className="rounded-full w-12 h-12 flex justify-center items-center bg-grayscale-100">
              <LightyIcon width="11" height="11" />
            </div>
          )}
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
    </li>
  );
}

const styles = {
  leaderImage: "rounded-full !h-12 w-12 object-cover",
  groupContainer:
    "flex items-center bg-base-white active:bg-grayscale-100 transition duration-75 gap-3 p-5 rounded-2xl border-[1px] border-grayscale-100",

  font: "text-C2 text-grayscale-300",
  bar: "mx-3 bg-grayscale-100 h-[13px] w-[1px]",
};
