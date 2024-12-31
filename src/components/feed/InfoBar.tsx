import Image from "next/image";
import Flex from "../shared/Flex";
import Spacing from "../shared/Spacing";
import Options from "../shared/icons/Options";
import GroupImages from "../shared/GroupImages";
import { GroupInfoResponse } from "@/models/group";
import { MemberInfo } from "@/constants/members";

export default function InfoBar({ group }: { group: GroupInfoResponse }) {
  return (
    <Flex align="center" className="px-[20px]">
      <WriterInfo />
      <div style={{ flexGrow: 1 }} />
      <TogetherInfo members={group.members} />
      <Spacing direction="horizontal" size={12} />
      <Options type="default" />
    </Flex>
  );
}

function WriterInfo() {
  return (
    <Flex>
      <Image
        src="https://cdn.lighty.today/anton.PNG"
        width={36}
        height={36}
        className="w-[36px] h-[36px] rounded-full overflow-hidden"
        alt="writerImage"
      />
      <Spacing direction="horizontal" size={6} />
      <Flex style={{ width: "full" }} direction="column">
        <div className="text-T5 flex-none">최은재</div>
        <Spacing size={2} />
        <div className="text-C2 text-grayscale-400">eun2763</div>
      </Flex>
    </Flex>
  );
}

export function TogetherInfo({ members }: { members: MemberInfo[] }) {
  return (
    <Flex
      align="center"
      className="rounded-[90px] bg-[#F4F4F4] py-[6px] px-[10px]"
    >
      <span className="text-C2">with</span>
      <Spacing direction="horizontal" size={4} />
      <GroupImages gap={8} members={members} />
    </Flex>
  );
}
