import Flex from "./Flex";
import CloseIcon from "./Icon/CloseIcon";
import PencilIcon from "./Icon/PencilIcon";
import Spacing from "./Spacing";

export default function Message() {
  return (
    <Flex className={styles.messageContainer}>
      <PencilIcon color="#0A0A0A" />
      <Spacing direction="horizontal" size={8} />
      <span className={styles.text}>기록으로 약속의 추억을 간직해보세요!</span>
      <Spacing direction="horizontal" size={8} />
      <CloseIcon onClick={() => {}} color="#AEAEAE" />
    </Flex>
  );
}

const styles = {
  messageContainer:
    "px-4 py-[14px] rounded-[10px] bg-grayscale-50 items-center mb-5",

  text: "flex-grow text-B3",
};
