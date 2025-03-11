import React, { useEffect, useState } from "react";
import Panel from "../Panel/Panel";
import clsx from "clsx";
import Flex from "../Flex";

export default function SocialPageSkeleton() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;
  return (
    <>
      <div
        className={clsx(
          "w-full bg-base-white fixed px-5 mt-12",
          isClient && window.ReactNativeWebView ? "pt-safe-top" : ""
        )}
      >
        <Panel
          title1="친구"
          title2="그룹"
          long="short"
          selectedTab={"1"}
          onClick={() => {}}
          year={false}
        />
      </div>
      <div className="h-dvh pt-[87px] pb-14">
        <Flex
          direction="column"
          justify="space-between"
          align="center"
          className={clsx(
            "px-5 gap-4 mt-3 pb-4",
            window.ReactNativeWebView ? "pt-safe-top" : ""
          )}
        >
          <Flex
            justify="space-between"
            align="center"
            className="w-full h-[33px]"
          >
            <span className="text-T4" id="friendList">
              친구
            </span>
            <span className="w-[71px] h-[33px] py-2 px-3 bg-grayscale-50 animate-pulse text-T6 rounded-lg" />
          </Flex>
          <div className="bg-grayscale-50 animate-pulse w-full py-5 px-6 rounded-lg" />
        </Flex>
        <Flex direction="column" className="px-5 gap-4 w-full" align="center">
          <Flex className="px-4 py-[14px] w-full gap-2">
            <div className="w-9 h-9 bg-grayscale-50 animate-pulse rounded-full" />
            <Flex direction="column" className="gap-[2px]">
              <div className="bg-grayscale-50 animate-pulse w-[143px] h-[17px] rounded-[4px]" />
              <div className="bg-grayscale-50 animate-pulse w-[31px] h-[14px] rounded-[4px]" />
            </Flex>
          </Flex>
        </Flex>
      </div>
    </>
  );
}
