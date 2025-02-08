import Flex from "../shared/Flex";
import ArrowLeftIcon from "../shared/Icon/ArrowLeftIcon";
import TodayNotice from "./TodayNotice";

export default function Notice() {
  return (
    <Flex direction="column" className="h-screen bg-grayscale-50 gap-5">
      <Flex align="center" className="h-12 gap-[6px]">
        <div
          className={arrowIconContainerStyle}
          onClick={() => {
            window.history.back();
          }}
        >
          <ArrowLeftIcon />
        </div>
        <span className="text-T3">알림</span>
      </Flex>
      <TodayNotice />
    </Flex>
  );
}
const arrowIconContainerStyle =
  "w-10 h-10 py-[10px] pl-[17px] pr-[3px] cursor-pointer";
