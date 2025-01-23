import Flex from "../shared/Flex";
import LightyLogoForNavBar from "../shared/Icon/LightyLogoForNavBar";
import Spacing from "../shared/Spacing";

export default function NoGathering() {
  return (
    <Flex
      direction="column"
      align="center"
      className="pt-[200px] bg-grayscale-10"
    >
      <div className="w-[40px] h-[40px] p-[5px]">
        <LightyLogoForNavBar width="30" height="30" color="#D8D8D8" />
      </div>
      <Spacing size={13} />
      <span className="text-T4 text-grayscale-300">
        아직 예정된 약속이 없어요
      </span>
    </Flex>
  );
}
