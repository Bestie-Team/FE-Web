import React from "react";
import Flex from "../shared/Flex";
import Image from "next/image";
import Spacing from "../shared/Spacing";
import { format } from "date-fns";

export default function GatheringBannerContainer() {
  const dateInfo = format(new Date(), "yyyy.MM.dd");
  const title = "연말 술모임";

  return (
    <Flex>
      <div className="relative">
        <Image
          alt="homeImage"
          src="https://d20j4cey9ep9gv.cloudfront.net/gathering.png"
          width={600}
          height={434}
          className="h-[434px] object-cover"
        />
        <Flex
          justify="space-between"
          className="absolute left-0 right-0 bottom-0 p-[24px] pt-0"
        >
          <Flex direction="column">
            <Flex direction="column">
              {title.length >= 10 ? (
                <>
                  <span className="text-base-white text-T1">
                    {title.slice(0, 5)}
                  </span>
                  <Spacing size={6} />
                  <span className="text-base-white text-T1">
                    {title.slice(5)}
                  </span>
                </>
              ) : (
                <span className="text-base-white text-T1">{title}</span>
              )}
            </Flex>
            <Spacing size={4} />
            <span className="text-grayscale-100 text-B3">{dateInfo}</span>
          </Flex>
          <div className="text-base-white text-T2 self-end">D-2</div>
        </Flex>
      </div>
    </Flex>
  );
}
