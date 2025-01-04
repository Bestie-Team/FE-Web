import clsx from "clsx";
import Button from "../buttons/Button";
import Dimmed from "../Dimmed";
import Flex from "../Flex";
import Spacing from "../Spacing";

export default function Modal({
  title = "해당 유저를 신고할까요?",
  content = "신고 시, 친구 목록에서 삭제 되며 상대는 친구 요청을 다시 보낼 수 없어요.",
  left = "취소",
  right,
  onClose,
}: {
  title?: string;
  content?: string;
  left?: string;
  right?: string;
  onClose: () => void;
}) {
  return (
    <Dimmed className={styles.dimmed}>
      <Flex align="center" direction="column" className={styles.modalWrapper}>
        <div className="text-T3 text-center">{title}</div>
        <Spacing size={12} />
        <div className={styles.content}>{content}</div>
        <Spacing size={24} />
        <Flex className="w-full" justify="center">
          {left ? (
            <Button
              onClick={onClose}
              className={clsx(styles.button, styles.cancel)}
            >
              {left}
            </Button>
          ) : null}
          {right ? (
            <>
              <Spacing size={12} direction="horizontal" />
              <Button className={clsx(styles.button, styles.report)}>
                {right}
              </Button>
            </>
          ) : null}
        </Flex>
      </Flex>
    </Dimmed>
  );
}

const styles = {
  dimmed: "flex justify-center items-center",

  modalWrapper:
    "bg-base-white rounded-[20px] w-[268px] pt-[28px] pb-[20px] px-[30px]",
  button: "w-[104px] py-[14px] rounded-full text-T6",

  content: "text-B3 text-grayscale-600 text-center",
  cancel: "text-grayscale-300 hover:bg-grayscale-50",
  report: "bg-grayscale-900 text-base-white hover:bg-grayscale-800",
};
