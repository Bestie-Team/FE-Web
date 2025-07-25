import MODAL_CONFIGS from "@/constants/modal-configs";
import dynamic from "next/dynamic";

const Modal = dynamic(() => import("@/components/shared/Modal/Modal"), {
  ssr: false,
});

const Report = dynamic(() => import("@/components/shared/Modal/Report/Report"));

interface Props {
  onReport: (r: any) => void;
  deleteComment?: () => void;
  modalState?: any;
  reportModalOpen?: any;
  reportContent?: any;
  setModalState?: (v: any) => void;
  setReportContent?: (v: any) => void;
  setReportModalOpen?: (v: any) => void;
  displayFeed?: () => void;
  deleteFeed?: () => void;
  deleteFriend?: () => void;
  hideFeed?: () => void;
  deleteGroup?: () => void;
  exitGroup?: () => void;
}

export default function ModalWithReport({
  onReport,
  deleteComment,
  modalState,
  reportModalOpen,
  reportContent,
  setModalState,
  setReportContent,
  setReportModalOpen,
  displayFeed,
  deleteFeed,
  deleteFriend,
  hideFeed,
  deleteGroup,
  exitGroup,
}: Props) {
  const modalAction =
    modalState?.type === "deleteGroup"
      ? deleteGroup
      : modalState?.type === "exitGroup"
      ? exitGroup
      : modalState?.type === "deleteFriend"
      ? deleteFriend
      : modalState?.type === "deleteFeed"
      ? deleteFeed
      : modalState?.type === "hideFeed"
      ? hideFeed
      : modalState?.type === "displayFeed"
      ? displayFeed
      : deleteComment;

  const closeModal = () => {
    if (setModalState)
      setModalState({
        type: null,
        isOpen: false,
      });
  };

  return (
    <>
      {modalState?.isOpen && modalState.type && (
        <Modal
          title={MODAL_CONFIGS[modalState.type].title}
          content={MODAL_CONFIGS[modalState.type].content}
          left={MODAL_CONFIGS[modalState.type].leftButton}
          right={MODAL_CONFIGS[modalState.type].rightButton}
          action={modalAction}
          onClose={closeModal}
        />
      )}
      {reportModalOpen?.isOpen && setReportContent && setReportModalOpen && (
        <Report
          type={reportModalOpen.type}
          report={reportContent}
          setReport={setReportContent}
          handleReport={() => {
            onReport(reportContent);
            setReportModalOpen((prev: any) => ({
              ...prev,
              type: null,
              isOpen: false,
            }));
          }}
          onClose={() =>
            setReportModalOpen((prev: any) => ({
              ...prev,
              type: null,
              isOpen: false,
            }))
          }
        />
      )}
    </>
  );
}
