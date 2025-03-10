import React from "react";
import GroupSkeleton from "./GroupSkeleton";
import Flex from "../Flex";

export default function GroupListSkeleton() {
  return (
    <Flex direction="column" className="gap-4">
      <GroupSkeleton />
      <GroupSkeleton />
      <GroupSkeleton />
    </Flex>
  );
}
