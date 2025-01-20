import Image from "next/image";
import Flex from "../shared/Flex";
import Spacing from "../shared/Spacing";
import Options from "../shared/Options";
import * as lighty from "lighty-type";
import GroupMemberImages from "../shared/GroupMemberImages";

export default function InfoBar({
  writer,
  memberImageUrls,
  selectedId,
}: {
  writer: lighty.User;
  memberImageUrls: (string | null)[];
  selectedId: string;
}) {
  return (
    <Flex align="center" className="px-[20px]">
      <WriterInfo writer={writer} />
      <div style={{ flexGrow: 1 }} />
      <TogetherInfo memberImageUrls={memberImageUrls} />
      <Spacing direction="horizontal" size={12} />
      <Options type="default" selectedId={selectedId} />
    </Flex>
  );
}

function WriterInfo({ writer }: { writer: lighty.User }) {
  console.log(writer);
  return (
    <Flex>
      <Image
        src={writer.profileImageUrl || "https://cdn.lighty.today/anton.PNG"}
        width={36}
        height={36}
        className="w-[36px] h-[36px] rounded-full overflow-hidden"
        alt="writer"
      />
      <Spacing direction="horizontal" size={6} />
      <Flex style={{ width: "full" }} direction="column">
        <div className="text-T5 flex-none">{writer.name}</div>
        <Spacing size={2} />
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
      className="rounded-[90px] bg-[#F4F4F4] py-[6px] px-[10px]"
    >
      <span className="text-C2">with</span>
      <Spacing direction="horizontal" size={4} />
      <GroupMemberImages
        gap={8}
        members={members}
        memberImageUrls={memberImageUrls}
      />
    </Flex>
  );
}
