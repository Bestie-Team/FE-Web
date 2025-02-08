import { useRecoilValue, useSetRecoilState } from "recoil";
import Button from "../Button/Button";
import CalendarWithTime from "../Calender/CalendarWithTime";
import * as lighty from "lighty-type";
import Flex from "../Flex";
import Spacing from "../Spacing";
import { gatheringSelectedDateAtom, newGatheringInfo } from "@/atoms/gathering";
import { format } from "date-fns";
import makeUTC from "@/utils/makeUTC";
import { useState } from "react";
import BottomSheetWrapper from "./shared/BottomSheetWrapper";

export default function CalendarBottomSheet({
  setGatheringToEdit,
  open = true,
  onClose,
}: {
  setGatheringToEdit?: React.Dispatch<
    React.SetStateAction<Partial<lighty.CreateGatheringRequest>>
  >;
  open?: boolean;
  onClose: () => void;
}) {
  const selectedDate = useRecoilValue(gatheringSelectedDateAtom);
  const setGatheringInfo = useSetRecoilState(newGatheringInfo);
  const [ampm, setAmpm] = useState<"오전" | "오후">("오전");
  const [selectedTime, setSelectedTime] = useState<string>("12:00");

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
              console.log("selectedDate", selectedDate);
              const converted = makeUTC({
                ampm,
                date: format(selectedDate.toString(), "yyyy-MM-dd"),
                time: selectedTime,
              });
              if (setGatheringToEdit) {
                setGatheringToEdit((prev) => ({
                  ...prev,
                  gatheringDate: converted,
                }));
              } else {
                setGatheringInfo((prev) => ({
                  ...prev,
                  gatheringDate: converted,
                }));
              }

              console.log(converted, "ISOtime");
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
