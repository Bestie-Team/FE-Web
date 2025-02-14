import Image from "next/image";
import "swiper/css";
import Flex from "../shared/Flex";
import * as lighty from "lighty-type";

export default function GatheringMemberContainer({
  members,
}: {
  members: lighty.User[];
}) {
  return (
    <Flex className={styles.memberContainerStyle}>
      {members.map(({ profileImageUrl, accountId, name }, idx) => (
        <Flex
          key={`gatheringMember${idx}`}
          direction="column"
          align="center"
          className={styles.memberWrapper}
        >
          <div className={styles.image}>
            <Image
              src={profileImageUrl || "https://cdn.lighty.today/default.png"}
              alt={`gatheringMember${idx + 1}`}
              width={40}
              height={40}
              className="w-10 h-10 object-cover"
            />
          </div>
          <Flex direction="column" align="center" className="text-T5 gap-1">
            <span className="break-words text-center w-full px-2">
              {accountId}
            </span>
            <span className={styles.name}>{name}</span>
          </Flex>
        </Flex>
      ))}
    </Flex>
  );
}

const styles = {
  image:
    "rounded-full w-10 h-10 border-[1.41px] border-base-white overflow-hidden",

  memberWrapper:
    "w-24 px-2 py-5 rounded-[16px] border-[1px] border-grayscale-100 gap-[6px]",
  memberContainerStyle: "overflow-scroll no-scrollbar gap-3 pb-[46px]",

  name: "text-B4 text-grayscale-500",
};
