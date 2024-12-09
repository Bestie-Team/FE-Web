import Flex from "../shared/Flex";
import LightyLogo from "../shared/icons/LightyLogo";

export default function DateItem() {
  return (
    <Flex
      direction="column"
      align="center"
      style={{ width: "32px", paddingBottom: "4px" }}
    >
      <div className={dayWrapperStyle}>월</div>
      <div className={dayNumWrapperStyle}>12</div>
      <div>
        <LightyLogo width="8" height="8" />
      </div>
    </Flex>
  );
}

const dayWrapperStyle =
  "text-B3 text-grayscale-600 pl-[9px] pr-[8px] pt-[3px] pb-[7px]";

const dayNumWrapperStyle = "text-center text-T5 w-[32px] h-[32px] py-[7px]";
