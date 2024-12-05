import Image from "next/image";
import Flex from "../shared/Flex";
import Spacing from "../shared/Spacing";
import Options from "../shared/icons/Options";
import GroupImages from "./GroupImages";

export default function InfoBar() {
  return (
    <Flex align="center" style={{ paddingLeft: "20px", paddingRight: "20px" }}>
      <WriterInfo />
      <Spacing direction="horizontal" size={12} />
      <TogetherInfo />
      <Spacing direction="horizontal" size={12} />
      <Options />
    </Flex>
  );
}

function WriterInfo() {
  return (
    <Flex style={{ flexGrow: 1 }}>
      <Image
        src="/images/anton.png"
        width={36}
        height={36}
        className="rounded-full overflow-hidden"
        alt="writerImage"
      />
      <Spacing direction="horizontal" size={6} />
      <Flex direction="column">
        <div className="text-T5">최은재</div>
        <Spacing size={2} />
        <div className="text-C2 text-grayscale-400">eun2763</div>
      </Flex>
    </Flex>
  );
}

function TogetherInfo() {
  return (
    <Flex
      align="center"
      style={{
        width: "full",
        borderRadius: "90px",
        backgroundColor: "#F4F4F4",
        paddingTop: "6px",
        paddingBottom: "6px",
        paddingLeft: "10px",
        paddingRight: "10px",
      }}
    >
      <span className="text-C2">with</span>
      <Spacing direction="horizontal" size={4} />
      <GroupImages />
    </Flex>
  );
}
