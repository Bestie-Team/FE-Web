import { useState } from "react";
import Dimmed from "../../Dimmed";
import Flex from "../../Flex";
import Spacing from "../../Spacing";
import Button from "../../Button/Button";
import clsx from "clsx";

export default function Report({
  title = "해당 피드/댓글을 신고하시겠어요?",
  action,
  onClose,
}: {
  title?: string;
  action: (reason: { reason: string }) => void;
  onClose: () => void;
}) {
  const [reason, setReason] = useState("");
  const [step, setStep] = useState(1);
  const handleReport = () => {
    onClose();
    action({ reason });
  };
  return (
    <Dimmed className={styles.dimmed}>
      <Flex align="center" direction="column" className={styles.modalWrapper}>
        {step === 1 ? (
          <>
            <div className="text-T3 text-center">{title}</div>
            <Spacing size={12} />
          </>
        ) : (
          <>
            <div className="text-T3 text-center">신고 사유를 입력해 주세요</div>
            <Spacing size={12} />
            <textarea
              className={styles.reportTextarea}
              value={reason}
              onChange={(e) => setReason(e.target.value)}
            />
            <Spacing size={24} />
          </>
        )}
        <Flex className="w-full gap-3" justify="center">
          <Button
            onClick={onClose}
            className={clsx(styles.button, styles.cancel)}
          >
            취소
          </Button>
          <Button
            onClick={() => {
              if (step === 1) {
                setStep(2);
              } else handleReport();
            }}
            className={clsx(styles.button, styles.report)}
          >
            신고하기
          </Button>
        </Flex>
      </Flex>
    </Dimmed>
  );
}

const styles = {
  dimmed: "flex justify-center items-center z-200",

  modalWrapper:
    "bg-base-white rounded-[20px] w-[268px] pt-[28px] pb-5 px-[30px] z-201",
  button: "w-[104px] py-[14px] rounded-full text-T6",

  content: "text-B3 text-grayscale-600 text-center max-w-[168px]",
  cancel: "text-grayscale-300 active:bg-grayscale-50",
  report: "bg-grayscale-900 text-base-white active:bg-grayscale-800",
  reportTextarea:
    "h-20 p-2 border-grayscale-200 border-[1px] rounded-md leading-[22.86px] w-full tracking-[-0.48px] text-grayscale-900 placeholder:text-grayscale-400 resize-none focus:outline-none",
};
