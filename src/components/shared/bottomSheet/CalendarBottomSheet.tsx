import { useRecoilValue } from "recoil";
import Button from "../buttons";
import CalendarWithTime from "../calendar/CalendarWithTime";
import Flex from "../Flex";
import Spacing from "../Spacing";
import BottomSheetWrapper from "./BottomSheetWrapper";
import {
  gatheringSelectedAmpm,
  gatheringSelectedDate,
  gatheringSelectedTime,
} from "@/atoms/gathering";

export default function CalendarBottomSheet({
  open = true,
  onClose,
}: {
  open?: boolean;
  onClose: () => void;
}) {
  const selectedDate = useRecoilValue(gatheringSelectedDate);
  const selectedAmpm = useRecoilValue(gatheringSelectedAmpm);
  const selectedTime = useRecoilValue(gatheringSelectedTime);

  return (
    <BottomSheetWrapper onClose={onClose} open={open} bar={false}>
      <Flex direction="column" className="px-[20px]" align="center">
        <CalendarWithTime />
        <Spacing size={40} />
        <Button
          className={buttonStyle}
          disabled={selectedDate == null}
          onClick={() => console.log(selectedDate, selectedAmpm, selectedTime)}
        >
          다음
        </Button>
      </Flex>
    </BottomSheetWrapper>
  );
}

const buttonStyle =
  "bg-grayscale-900 max-w-full min-w-[350px] py-[18px] text-center text-[14px] leading-[16.8px] tracking-[-0.28px] font-[600] text-base-white rounded-full";
