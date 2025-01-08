import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import Button from "../buttons/Button";
import CalendarWithTime from "../calendar/CalendarWithTime";
import Flex from "../Flex";
import Spacing from "../Spacing";
import BottomSheetWrapper from "./shared/BottomSheetWrapper";
import {
  gatheringSelectedAmpmAtom,
  gatheringSelectedDateAtom,
  gatheringSelectedTimeAtom,
  newGatheringInfo,
} from "@/atoms/gathering";
import { formatISO } from "date-fns";

export default function CalendarBottomSheet({
  open = true,
  onClose,
}: {
  open?: boolean;
  onClose: () => void;
}) {
  const selectedDate = useRecoilValue(gatheringSelectedDateAtom);
  const setGatheringInfo = useSetRecoilState(newGatheringInfo);
  const [ampm, setAmpm] = useRecoilState<"오전" | "오후">(
    gatheringSelectedAmpmAtom
  );
  const [selectedTime, setSelectedTime] = useRecoilState<string>(
    gatheringSelectedTimeAtom
  );

  return (
    <BottomSheetWrapper onClose={onClose} open={open} bar={false}>
      <Flex direction="column" className="px-[20px]" align="center">
        <CalendarWithTime
          ampm={ampm}
          selectedTime={selectedTime}
          setAmpm={setAmpm}
          setSelectedTime={setSelectedTime}
        />
        <Spacing size={40} />
        <Button
          className={buttonStyle}
          disabled={selectedDate == null}
          onClick={() => {
            if (selectedDate !== null) {
              setGatheringInfo((prev) => ({
                ...prev,
                date: formatISO(selectedDate as Date),
                ampm: ampm,
                time: selectedTime,
              }));
            }
            onClose();
          }}
        >
          다음
        </Button>
      </Flex>
    </BottomSheetWrapper>
  );
}

const buttonStyle =
  "bg-grayscale-900 w-full py-[18px] text-center text-[14px] leading-[16.8px] tracking-[-0.28px] font-[600] text-base-white rounded-full";
