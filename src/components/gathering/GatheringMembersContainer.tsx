import Image from "next/image";
import "swiper/css";
import Spacing from "../shared/Spacing";
import Flex from "../shared/Flex";
import { UserInfo } from "@/models/user";

export default function GatheringMemberContainer({
  members,
}: {
  members: UserInfo[];
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
              src={accountId}
              alt={`gatheringMember${idx + 1}`}
              width={40}
              height={40}
            />
          </div>
          <Spacing size={6} />
          <Flex direction="column" align="center" className="text-T5">
            <span>{profileImageUrl}</span>
            <Spacing size={4} />
            <span className={styles.name}>{name}</span>
          </Flex>
        </Flex>
      ))}
    </Flex>
  );
}

const styles = {
  image:
    "object-cover rounded-full w-[40px] h-[40px] border-[1.41px] border-base-white overflow-hidden",

  memberWrapper:
    "px-[32px] py-[20px] rounded-[16px] border-[1px] border-grayscale-100",
  memberContainerStyle: "overflow-scroll no-scrollbar gap-[12px] pb-[46px]",

  name: "flex-none text-B4 text-grayscale-500",
};
