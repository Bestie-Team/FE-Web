import clsx from "clsx";
import Button from "../buttons/Button";
import Dimmed from "../Dimmed";
import Flex from "../Flex";
import Spacing from "../Spacing";

export default function Modal({
  title = "해당 유저를 신고할까요?",
  content = "신고 시, 친구 목록에서 삭제 되며 상대는 친구 요청을 다시 보낼 수 없어요.",
  onClose,
}: {
  title?: string;
  content?: string;
  onClose: () => void;
}) {
  return (
    <Dimmed className="flex justify-center items-center">
      <Flex align="center" direction="column" className={modalWrapperStyle}>
        <div className="text-T3 text-center">{title}</div>
        <Spacing size={12} />
        <div className="text-B3 text-grayscale-600 text-center">{content}</div>
        <Spacing size={24} />
        <Flex className="w-full text-T6">
          <Button
            onClick={onClose}
            className={clsx(
              buttonStyle,
              "text-grayscale-300 hover:bg-grayscale-50"
            )}
          >
            취소
          </Button>
          <Spacing size={12} direction="horizontal" />
          <Button
            className={clsx(
              buttonStyle,
              "bg-grayscale-900 text-base-white hover:bg-grayscale-800"
            )}
          >
            신고하기
          </Button>
        </Flex>
      </Flex>
    </Dimmed>
  );
}

const modalWrapperStyle =
  "bg-base-white rounded-[20px] w-[268px] pt-[28px] pb-[20px] px-[30px]";

const buttonStyle = "w-[104px] py-[14px] rounded-full";
