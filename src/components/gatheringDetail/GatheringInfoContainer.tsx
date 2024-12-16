import React from "react";
import Flex from "../shared/Flex";
import Spacing from "../shared/Spacing";

interface GatheringInfoContainerProps {
  icon: React.ReactNode;
  title: React.ReactNode;
  content: React.ReactNode;
}
export default function GatheringInfoContainer({
  icon,
  title,
  content,
}: GatheringInfoContainerProps) {
  return (
    <Flex
      direction="column"
      className="pt-[24px] px-[20px] pb-[32px] bg-base-white"
    >
      <Flex>
        {icon}
        <Spacing size={4} direction="horizontal" />
        {title}
      </Flex>
      <Spacing size={18} />
      <Flex>{content}</Flex>
    </Flex>
  );
}
