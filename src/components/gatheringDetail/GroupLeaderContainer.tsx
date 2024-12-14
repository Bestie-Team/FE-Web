import Image from "next/image";
import Flex from "../shared/Flex";
import Spacing from "../shared/Spacing";

export default function GroupLeaderContainer() {
  return (
    <Flex
      align="center"
      justify="space-between"
      style={{
        width: "100%",
        padding: "16px 20px",
      }}
    >
      <Flex align="center">
        <Image
          alt="leader"
          width={36}
          height={36}
          src="https://d20j4cey9ep9gv.cloudfront.net/hi.jpeg"
          className="object-cover rounded-full border-[1.27px] border-base-white h-[36px] w-[36px]"
        />
        <Spacing direction="horizontal" size={8} />
        <span className="text-B3">maybin_</span>
        <Spacing direction="horizontal" size={8} />
        <span className="text-B3 text-grayscale-500">김혜빈</span>
      </Flex>

      <div className="text-C1 text-base-white bg-grayscale-900 px-[12px] py-[8px] rounded-[8px] h-fit">
        <Flex align="center" justify="space-between" style={{ gap: "6px" }}>
          <div className="pb-[2px]">👑</div>
          <span>모임장</span>
        </Flex>
      </div>
    </Flex>
  );
}
