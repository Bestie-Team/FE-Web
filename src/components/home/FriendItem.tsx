import Image from "next/image";
import Flex from "../shared/Flex";
import Spacing from "../shared/Spacing";
import PlusIcon from "../shared/icons/PlusIcon";
import { GroupInfoResponse } from "@/models/group";
import { UserInfo } from "@/models/user";

export default function FriendItem({
  friendInfo,
  groupInfo,
}: {
  friendInfo?: UserInfo;
  groupInfo?: GroupInfoResponse;
}) {
  return (
    <Flex direction="column" style={{ width: "fit-content", flexShrink: 0 }}>
      <div className="p-[6px]">
        <Image
          alt="friendImage"
          src={
            friendInfo?.profileImageUrl ||
            groupInfo?.imageUrl ||
            "https://cdn.lighty.today/bini.JPG"
          }
          className="rounded-full object-cover w-[56px] h-[56px]"
          width={56}
          height={56}
        />
      </div>
      <Spacing size={2} />
      <Flex direction="column" align="center">
        <span className="text-T6">
          {friendInfo?.name || groupInfo?.groupName || "이름"}
        </span>
        <span className="text-C5 text-grayscale-400 truncate">
          {friendInfo?.accountId || groupInfo?.description || "아이디"}
        </span>
      </Flex>
    </Flex>
  );
}

export function AddFriendItem({ onClick }: { onClick?: () => void }) {
  return (
    <Flex direction="column" style={{ width: "fit-content", flexShrink: 0 }}>
      <div
        className="p-[6px]"
        onMouseDown={() => {
          if (onClick) {
            onClick();
          } else return;
        }}
      >
        <div className={iconWrapperStyle}>
          <PlusIcon
            width="20"
            height="20"
            color="#0A0A0A"
            className="absolute left-[17.5px] top-[17px]"
          />
        </div>
      </div>
      <Spacing size={2} />
      <Flex direction="column" align="center">
        <span className="text-T6">친구 추가</span>
        <span className="text-C5 text-grayscale-400 hidden">ㅇㅇㅇ</span>
      </Flex>
    </Flex>
  );
}

export function SeeMoreItem({ onClick }: { onClick: () => void }) {
  return (
    <Flex direction="column" style={{ width: "fit-content", flexShrink: 0 }}>
      <div className="p-[6px]" onClick={onClick}>
        <div className={iconWrapperStyle}>
          <PlusIcon
            width="20"
            height="20"
            color="#0A0A0A"
            className="absolute left-[17.5px] top-[17px]"
          />
        </div>
      </div>
      <Spacing size={2} />
      <Flex direction="column" align="center">
        <span className="text-T6">더 보기</span>
        <span className="text-C5 text-grayscale-400 hidden">ㅇㅇㅇ</span>
      </Flex>
    </Flex>
  );
}

const iconWrapperStyle =
  "relative rounded-full w-[56px] h-[56px] border-[1px] border-[#E9E9E9] cursor-pointer";
