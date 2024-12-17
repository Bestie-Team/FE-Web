import Image from "next/image";
import Flex from "../shared/Flex";
import Spacing from "../shared/Spacing";
import Button from "../shared/buttons";

export default function GroupLeaderContainer() {
  return (
    <Flex
      align="center"
      justify="space-between"
      className={leaderInfoContainerStyle}
    >
      <Flex align="center">
        <Image
          alt="leader"
          width={36}
          height={36}
          src="https://d20j4cey9ep9gv.cloudfront.net/hi.jpeg"
          className={leaderImageStyle}
        />
        <Spacing direction="horizontal" size={8} />
        <span>maybin_</span>
        <Spacing direction="horizontal" size={8} />
        <span className="text-grayscale-500">김혜빈</span>
      </Flex>
      <Button className={buttonWrapperStyle}>
        <Flex align="center" justify="space-between" style={{ gap: "6px" }}>
          <div className="pb-[2px]">👑</div>
          <span>모임장</span>
        </Flex>
      </Button>
    </Flex>
  );
}
const leaderInfoContainerStyle =
  "w-full px-[20px] py-[16px] bg-base-white text-B3";

const leaderImageStyle =
  "object-cover rounded-full border-[1.27px] border-base-white h-[36px] w-[36px]";

const buttonWrapperStyle =
  "text-C1 text-base-white bg-grayscale-900 px-[12px] py-[8px] rounded-[8px] h-fit";
