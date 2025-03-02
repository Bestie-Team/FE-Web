import Flex from "../shared/Flex";
import PencilIcon from "../shared/Icon/PencilIcon";
import ThinLightyLogo from "../shared/Icon/ThinLightyLogo";
import Spacing from "../shared/Spacing";

type NoGatheringType = "ENDED" | "EXPECTING";

export default function NoGathering({ type }: { type: NoGatheringType }) {
  return (
    <Flex
      direction="column"
      align="center"
      justify="center"
      className="h-screen gap-[13px]"
    >
      <div className="w-10 h-10 p-[5px]">
        <ThinLightyLogo />
      </div>
      <span className="text-T4 text-grayscale-300">
        {type === "EXPECTING"
          ? "아직 예정된 약속이 없어요"
          : "완료된 약속이 없어요"}
      </span>
    </Flex>
  );
}

export function NoGatheringHome({ type }: { type?: "slider" }) {
  return (
    <div className="pt-3 grid grid-cols-2 gap-4">
      <div className="bg-grayscale-10 h-[168px] w-[168px] flex flex-col justify-center items-center rounded-[20px] border border-grayscale-200 border-dashed">
        <PencilIcon width="20" height="20" color="#D8D8D8" />
        <Spacing size={6} />
        <span className="text-C1 text-grayscale-300">
          {type == "slider" ? "예정된 약속이 없어요" : "기록할 모임이 없어요"}
        </span>
      </div>
    </div>
  );
}

export function NoGatheringToRecord() {
  return (
    <Flex
      direction="column"
      align="center"
      justify="center"
      className="bg-grayscale-10 w-[270px] h-[320px] border-[1px] border-dashed rounded-[20px] border-grayscale-200 gap-2"
    >
      <ThinLightyLogo width="24" height="24" />
      <span className="text-B4 text-grayscale-400">
        기록할 라이티 약속이 없어요!
      </span>
    </Flex>
  );
}
