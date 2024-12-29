import Image from "next/image";
import Flex from "../shared/Flex";
import Spacing from "../shared/Spacing";
import { FriendInfo } from "@/models/friend";
import { GroupInfoResponse } from "@/models/group";

export default function FriendItem({
  friendInfo,
  groupInfo,
}: {
  friendInfo?: FriendInfo;
  groupInfo?: GroupInfoResponse;
}) {
  return (
    <Flex direction="column" style={{ width: "fit-content", flexShrink: 0 }}>
      <div className="p-[6px]">
        <Image
          alt="friendImage"
          src={
            friendInfo?.imageUrl ||
            groupInfo?.imageUrl ||
            "https://d1al3w8x2wydb3.cloudfront.net/images/bini.JPG"
          }
          className="rounded-full object-cover w-[56px] h-[56px]"
          width={56}
          height={56}
        />
      </div>
      <Spacing size={2} />
      <Flex direction="column" align="center">
        <span className="text-T6">
          {friendInfo?.userName || groupInfo?.groupName || "이름"}
        </span>
        <span className="text-C5 text-grayscale-400 truncate">
          {friendInfo?.userId || groupInfo?.desc || "아이디"}
        </span>
      </Flex>
    </Flex>
  );
}
