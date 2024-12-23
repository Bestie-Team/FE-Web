import Image from "next/image";
import Flex from "../Flex";
import Spacing from "../Spacing";
import ArrowRightWithBody from "../icons/ArrowRightWithBody";

export default function Banner() {
  return (
    <Flex className="relative mb-[52px] px-0">
      <Image
        alt="bannerImage"
        className="object-cover h-[124px]"
        width={450}
        height={124}
        src={"https://d1al3w8x2wydb3.cloudfront.net/images/banner.png"}
      />
      <Flex className="absolute top-[40px] left-[22px]" align="center">
        <Flex direction="column">
          <span className="text-base-white font-[600] text-[16px] leading-[24px] tracking-[-0.48px]">
            이 서비스 같이 쓸래? ❤️‍🔥
          </span>
          <span className="text-base-white font-[600] text-[16px] leading-[24px] tracking-[-0.48px]">
            친구 초대하고 꾸미기템 받기
          </span>
        </Flex>
        <Spacing direction="horizontal" size={8} />
        <ArrowRightWithBody width="20" height="20" color="white" />
      </Flex>
    </Flex>
  );
}
