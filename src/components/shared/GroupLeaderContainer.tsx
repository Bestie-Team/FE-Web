import Image from "next/image";
import Flex from "./Flex";
import Spacing from "./Spacing";
import Button from "./Button/Button";
import * as lighty from "lighty-type";

export default function GroupLeaderContainer({
  groupLeader,
}: {
  groupLeader?: lighty.User;
}) {
  const { name, accountId, profileImageUrl } = groupLeader!;
  return (
    <Flex
      align="center"
      justify="space-between"
      className={styles.leaderInfoContainer}
    >
      <Flex align="center">
        <Image
          alt="leader"
          width={36}
          height={36}
          src={profileImageUrl || "https://cdn.lighty.today/hi.jpeg"}
          className={styles.leaderImage}
        />
        <Spacing direction="horizontal" size={8} />
        <span>{accountId}</span>
        <Spacing direction="horizontal" size={8} />
        <span className="text-grayscale-500">{name}</span>
      </Flex>
      <Button className={styles.buttonWrapper}>
        <Flex align="center" justify="space-between" style={{ gap: "6px" }}>
          <div className="pb-[2px]">👑</div>
          <span>약속장</span>
        </Flex>
      </Button>
    </Flex>
  );
}

const styles = {
  leaderInfoContainer: "w-full px-5 py-4 bg-base-white text-B3",

  leaderImage:
    "object-cover rounded-full border-[1.27px] border-base-white h-9 w-9",

  buttonWrapper:
    "text-C1 text-base-white bg-grayscale-900 px-3 py-2 rounded-[8px] h-fit",
};
