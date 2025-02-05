import clsx from "clsx";
import Dimmed from "../Dimmed";
import Flex from "../Flex";
import Spacing from "../Spacing";
import Button from "../Button/Button";

export default function Modal({
  title = "해당 유저를 신고할까요?",
  content,
  action,
  left = "취소",
  right,
  onClose,
}: {
  title?: string;
  content?: string;
  action: () => void;
  left?: string;
  right?: string;
  onClose: () => void;
}) {
  // const [isClient, setIsClient] = useState(false);

  // useEffect(() => {
  //   setIsClient(true);
  // }, []);

  // if (!isClient) {
  //   return null;
  // }

  // const $portalRoot = document.getElementById("root-portal");
  // if ($portalRoot == null) return null;
  return (
    // createPortal(
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
              <Button
                onClick={() => {
                  onClose();
                  action();
                }}
                className={clsx(styles.button, styles.report)}
              >
                {right}
              </Button>
            </>
          ) : null}
        </Flex>
      </Flex>
    </Dimmed>
    // $portalRoot
  );
}

const styles = {
  dimmed: "flex justify-center items-center z-200",

  modalWrapper:
    "bg-base-white rounded-[20px] w-[268px] pt-[28px] pb-5 px-[30px] z-201",
  button: "w-[104px] py-[14px] rounded-full text-T6",

  content: "text-B3 text-grayscale-600 text-center max-w-[168px]",
  cancel: "text-grayscale-300 hover:bg-grayscale-50",
  report: "bg-grayscale-900 text-base-white hover:bg-grayscale-800",
};
