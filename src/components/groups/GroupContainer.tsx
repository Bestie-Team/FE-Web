import Image from "next/image";
import Flex from "../shared/Flex";
import Spacing from "../shared/Spacing";
import ArrowRightIcon from "../shared/icons/ArrowRightIcon";
import GroupImages from "../shared/GroupImages";
import { useRouter } from "next/navigation";

export default function GroupContainer() {
  const router = useRouter();
  const groupName = "다꾸 모임💖";
  const groupDetail = "다꾸하는 모임";

  return (
    <Flex
      align="center"
      className={groupContainerStyle}
      onClick={() => {
        router.push("/groups/123");
      }}
    >
      <Flex direction="column" className="flex-grow">
        <Flex align="center">
          <div className="w-[48px] h-[48px]">
            <Image
              alt="leaderImg"
              width={48}
              height={48}
              className="object-cover rounded-full"
              src={"https://d20j4cey9ep9gv.cloudfront.net/cute.jpg"}
            />
          </div>
          <Spacing size={12} direction="horizontal" />
          <Flex direction="column">
            <span className="text-T5">{groupName}</span>
            <Spacing size={4} />
            <span className="text-C2 text-grayscale-300">{groupDetail}</span>
          </Flex>
        </Flex>
        <Spacing size={12} />
        <Flex align="center">
          <span className="text-C2 text-grayscale-300">모임 횟수</span>
          <Spacing size={2} direction="horizontal" />
          <span className="text-B4">{12}</span>
          <div className="mx-[12px] bg-grayscale-100 h-[13px] w-[1px]" />
          <span className="text-C2 text-grayscale-300">그룹 멤버</span>
          <Spacing size={2} direction="horizontal" />
          <span className="text-B4">{4}</span>
          <Spacing size={12} direction="horizontal" />
          <GroupImages width={24} height={24} gap={8} />
        </Flex>
      </Flex>
      <ArrowRightIcon color="#979797" />
    </Flex>
  );
}

const groupContainerStyle =
  "bg-base-white gap-[12px] p-[20px] rounded-[16px] cursor-pointer";
