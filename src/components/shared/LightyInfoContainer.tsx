import React from "react";
import Flex from "./Flex";
import Spacing from "./Spacing";

interface GatheringInfoContainerProps {
  icon: React.ReactNode;
  title: React.ReactNode;
  content: React.ReactNode;
  editBtn: React.ReactNode | null;
}
export default function LightyInfoContainer({
  icon,
  title,
  content,
  editBtn,
}: GatheringInfoContainerProps) {
  return (
    <Flex
      direction="column"
      className="pt-[24px] px-[20px] pb-[32px] bg-base-white"
    >
      <Flex align="center">
        {icon}
        <Spacing size={4} direction="horizontal" />
        {title}
        {editBtn}
      </Flex>
      <Spacing size={18} />
      <Flex>{content}</Flex>
    </Flex>
  );
}
