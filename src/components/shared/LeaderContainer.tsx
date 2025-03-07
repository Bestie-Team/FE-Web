import Image from "next/image";
import Flex from "./Flex";
import Button from "./Button/Button";
import * as lighty from "lighty-type";
import LightyIcon from "./Icon/LightyIcon";

export default function LeaderContainer({ leader }: { leader?: lighty.User }) {
  const { name, accountId, profileImageUrl } = leader!;
  return (
    <Flex
      align="center"
      justify="space-between"
      className={styles.leaderInfoContainer}
    >
      <Flex align="center" className="gap-2">
        {!!profileImageUrl ? (
          <Image
            alt="leader"
            width={36}
            height={36}
            src={profileImageUrl}
            className={styles.leaderImage}
          />
        ) : (
          <div className="rounded-full border-[1.27px] border-base-white h-9 w-9 flex justify-center items-center bg-grayscale-100">
            <LightyIcon width="11" height="11" />
          </div>
        )}
        <span>{accountId}</span>
        <span className="text-grayscale-500">{name}</span>
      </Flex>
      <Button className={styles.buttonWrapper}>
        <Flex align="center" justify="space-between" style={{ gap: "6px" }}>
          <div className="pb-[2px]">👑</div>
          <span>그룹장</span>
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
    "text-C1 text-base-white bg-grayscale-900 px-3 py-2 rounded-lg h-fit",
};
