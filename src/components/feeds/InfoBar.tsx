import Image from "next/image";
import Flex from "../shared/Flex";
import Spacing from "../shared/Spacing";
import * as lighty from "lighty-type";
import GroupMemberImages from "../shared/GroupMemberImages";
import { useAuth } from "../shared/providers/AuthProvider";
import { Feed } from "@/models/feed";
import { usePathname } from "next/navigation";
import LightyIcon from "../shared/Icon/LightyIcon";
import { Lighty } from "@/constants/images";
import clsx from "clsx";
import FeedOption from "./FeedOption";
import { Dispatch, SetStateAction } from "react";

interface FriendInfo {
  name: string;
  imageUrl: string | null;
}
export default function InfoBar({
  isOpen,
  setIsOpen,
  friendInfo,
  feed,
}: {
  isOpen?: boolean;
  setIsOpen?: Dispatch<SetStateAction<boolean>>;
  friendInfo?: FriendInfo[];
  feed: Feed;
}) {
  const pathname = usePathname();
  const { userInfo } = useAuth();

  const isMine = feed.writer.accountId === userInfo?.accountId;
  const feedType = pathname.endsWith("/hidden")
    ? "hidden"
    : isMine
    ? "feed_mine"
    : "feed";

  return (
    <Flex align="center" className="px-5">
      <WriterInfo writer={feed.writer} />
      <div style={{ flexGrow: 1 }} />
      {friendInfo && friendInfo.length > 0 && (
        <div
          className="relative"
          onClick={() => {
            if (!isOpen && setIsOpen) {
              setIsOpen(true);
            }
          }}
        >
          <TogetherInfo clickable={true} friendInfo={friendInfo} />
          {friendInfo && isOpen && (
            <FriendsInfoContainer friendInfo={friendInfo} isOpen={isOpen} />
          )}
        </div>
      )}
      <Spacing direction="horizontal" size={12} />
      <FeedOption type={feedType} feed={feed} />
    </Flex>
  );
}

function WriterInfo({ writer }: { writer: lighty.User }) {
  return (
    <Flex className="gap-[6px]">
      {!!writer.profileImageUrl ? (
        <Image
          src={writer.profileImageUrl}
          width={36}
          height={36}
          className="w-9 h-9 object-cover rounded-full overflow-hidden"
          alt="writer"
        />
      ) : (
        <div className="flex justify-center items-center w-9 h-9 rounded-full bg-grayscale-100">
          <LightyIcon width="4" height="4" />
        </div>
      )}
      <Flex style={{ width: "full", gap: "2px" }} direction="column">
        <div className="text-T5 flex-none">{writer.name}</div>
        <div className="text-C2 text-grayscale-400">{writer.accountId}</div>
      </Flex>
    </Flex>
  );
}

export function TogetherInfo({
  clickable,
  members,
  friendInfo,
}: {
  clickable: boolean;
  members?: lighty.User[];
  friendInfo?: FriendInfo[];
}) {
  if (!members && !friendInfo) return;
  const memberImageUrls = friendInfo?.map((info) => info.imageUrl);
  return (
    <Flex
      align="center"
      className={clsx(
        "rounded-[90px] bg-[#F4F4F4] py-[6px] px-[10px] gap-1",
        clickable && "cursor-pointer active:bg-grayscale-200"
      )}
    >
      <span className="text-C2">with</span>
      <GroupMemberImages
        gap={8}
        members={members}
        memberImageUrls={memberImageUrls}
      />
    </Flex>
  );
}

function FriendsInfoContainer({
  friendInfo,
  isOpen,
}: {
  friendInfo: FriendInfo[];
  isOpen: boolean;
}) {
  return (
    <Flex
      className={clsx(
        isOpen == true ? "animate-selectOpen" : "animate-selectClose",
        "",
        friendsContainer
      )}
      direction="column"
    >
      {friendInfo.map((info, i) => (
        <Flex align="center" className="gap-[2px]" key={info.name}>
          <Image
            src={info.imageUrl || Lighty}
            alt={`friend${i}`}
            width={24}
            height={24}
            className="w-6 h-6 object-cover rounded-full"
          />
          <span className="flex-none text-C2 text-grayscale-600">
            {info.name}
          </span>
        </Flex>
      ))}
    </Flex>
  );
}

const friendsContainer =
  "bg-base-white z-30 absolute right-0 mt-[5px] rounded-xl w-[117px] py-[14px] pl-[16px] pr-11 gap-3 border border-grayscale-100 shadow-[0px_0px_16px_0px_rgba(0,0,0,0.12)]";
