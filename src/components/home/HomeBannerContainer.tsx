import React from "react";
import Flex from "../shared/Flex";
import Image from "next/image";
import Spacing from "../shared/Spacing";

export default function HomeBannerContainer() {
  const subTitle = "안녕하시오리까";
  const title = "가나다라마바사 라이티";

  return (
    <Flex>
      <div className="relative">
        <Image
          alt="homeImage"
          src="https://d20j4cey9ep9gv.cloudfront.net/dishes.jpg"
          width={600}
          height={434}
          className="h-[434px] object-cover"
        />
        <Flex
          direction="column"
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            paddingLeft: "28px",
            paddingBottom: "32px",
          }}
        >
          <span className="text-base-white font-500 text-[14px] leading-[24px] tracking-[-0.42px]">
            {subTitle}
          </span>
          <Spacing size={8} />
          <Flex direction="column">
            <span className="text-base-white text-T1">{title.slice(0, 5)}</span>
            <Spacing size={6} />
            <span className="text-base-white text-T1">{title.slice(5)}</span>
          </Flex>
        </Flex>
      </div>
    </Flex>
  );
}
