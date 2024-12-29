import Image from "next/image";
import "swiper/css";
import Spacing from "../shared/Spacing";
import Flex from "../shared/Flex";
import { MemberInfo } from "@/constants/members";

export default function GatheringMemberContainer({
  members,
}: {
  members: MemberInfo[];
}) {
  return (
    <Flex className={memberContainerStyle}>
      {members.map(({ imageUrl, userId, name }, idx) => (
        <Flex
          key={`member${idx}`}
          direction="column"
          align="center"
          className={memberWrapperStyle}
        >
          <div className={imageStyle}>
            <Image
              src={imageUrl}
              alt={`img${idx + 1}`}
              width={40}
              height={40}
              key={`img${idx + 1}`}
            />
          </div>
          <Spacing size={6} />
          <Flex direction="column" align="center" className="text-T5">
            <span>{userId}</span>
            <Spacing size={4} />
            <span className="flex-none text-B4 text-grayscale-500">{name}</span>
          </Flex>
        </Flex>
      ))}
    </Flex>
  );
}
const imageStyle =
  "object-cover rounded-full w-[40px] h-[40px] border-[1.41px] border-base-white overflow-hidden";

const memberWrapperStyle =
  "px-[32px] py-[20px] rounded-[16px] border-[1px] border-grayscale-100";

const memberContainerStyle =
  "overflow-scroll no-scrollbar gap-[12px] pb-[46px]";
