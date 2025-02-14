import Image from "next/image";
import Flex from "../shared/Flex";
import Spacing from "../shared/Spacing";
import Options from "../shared/Options";
import * as lighty from "lighty-type";
import GroupMemberImages from "../shared/GroupMemberImages";
import { useAuth } from "../shared/providers/AuthProvider";
import { Feed } from "@/models/feed";
const DEFAULT_IMAGE = "https://cdn.lighty.today/lighty_square.png";

export default function InfoBar({
  memberImageUrls,
  feed,
}: {
  memberImageUrls?: (string | null)[];
  feed: Feed;
}) {
  const { userInfo } = useAuth();
  const isMine = feed.writer.accountId === userInfo?.accountId;
  // console.log(feed.writer.accountId, userInfo?.accountId);
  return (
    <Flex align="center" className="px-5">
      <WriterInfo writer={feed.writer} />
      <div style={{ flexGrow: 1 }} />
      {memberImageUrls && memberImageUrls.length > 0 && (
        <TogetherInfo memberImageUrls={memberImageUrls} />
      )}
      <Spacing direction="horizontal" size={12} />
      <Options type={isMine ? "default" : "feed"} feed={feed} isMine={isMine} />
    </Flex>
  );
}

function WriterInfo({ writer }: { writer: lighty.User }) {
  return (
    <Flex className="gap-[6px]">
      <Image
        layout="fixed"
        src={writer.profileImageUrl || DEFAULT_IMAGE}
        width={36}
        height={36}
        className="w-9 h-9 object-cover rounded-full overflow-hidden"
        alt="writer"
      />
      <Flex style={{ width: "full", gap: "2px" }} direction="column">
        <div className="text-T5 flex-none">{writer.name}</div>
        <div className="text-C2 text-grayscale-400">{writer.accountId}</div>
      </Flex>
    </Flex>
  );
}

export function TogetherInfo({
  members,
  memberImageUrls,
}: {
  members?: lighty.User[];
  memberImageUrls?: (string | null)[];
}) {
  if (!members && !memberImageUrls) return;
  return (
    <Flex
      align="center"
      className="rounded-[90px] bg-[#F4F4F4] py-[6px] px-[10px] gap-1"
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
