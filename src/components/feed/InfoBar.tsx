import Image from "next/image";
import Flex from "../shared/Flex";
import Spacing from "../shared/Spacing";
import Options from "../shared/icons/Options";
import GroupImages from "../shared/GroupImages";

export default function InfoBar() {
  return (
    <Flex align="center" className="px-[20px]">
      <WriterInfo />
      <div style={{ flexGrow: 1 }} />
      <TogetherInfo />
      <Spacing direction="horizontal" size={12} />
      <Options type="default" />
    </Flex>
  );
}

function WriterInfo() {
  return (
    <Flex>
      <Image
        src="https://d20j4cey9ep9gv.cloudfront.net/anton.PNG"
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

export function TogetherInfo() {
  return (
    <Flex
      align="center"
      className="rounded-[90px] bg-[#F4F4F4] py-[6px] px-[10px]"
    >
      <span className="text-C2">with</span>
      <Spacing direction="horizontal" size={4} />
      <GroupImages gap={8} />
    </Flex>
  );
}
