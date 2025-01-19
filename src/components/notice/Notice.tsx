import Flex from "../shared/Flex";
import ArrowLeftIcon from "../shared/Icon/ArrowLeftIcon";
import Spacing from "../shared/Spacing";
import TodayNotice from "./TodayNotice";

export default function Notice() {
  return (
    <Flex direction="column" className="h-screen bg-grayscale-50">
      <Flex align="center" className="h-[48px]">
        <div
          className={arrowIconContainerStyle}
          onClick={() => {
            window.history.back();
          }}
        >
          <ArrowLeftIcon />
        </div>
        <Spacing size={6} direction="horizontal" />
        <span className="text-T3">알림</span>
      </Flex>
      <Spacing size={20} />
      <TodayNotice />
    </Flex>
  );
}
const arrowIconContainerStyle =
  "w-[40px] h-[40px] py-[10px] pl-[17px] pr-[3px] cursor-pointer";
