import type React from "react";
import { useCallback } from "react";
import { useRecoilState } from "recoil";
import { modalStateAtom, reportInfoAtom, reportModalAtom } from "@/atoms/modal";
import type { ReportContentTypes } from "@/components/report/hooks/useReport";
import MODAL_CONFIGS from "@/constants/modal-configs";
import dynamic from "next/dynamic";

const Modal = dynamic(() => import("@/components/shared/Modal/Modal"), {
  ssr: false,
});

const Report = dynamic(
  () => import("@/components/shared/Modal/Report/Report"),
  {
    ssr: false,
  }
);

interface FeedModalsProps {
  onDeleteFeed: () => void;
  onDeleteComment: () => void;
  onHideFeed: () => void;
  onReportFeed: (reason: ReportContentTypes) => void;
}

export const FeedModals: React.FC<FeedModalsProps> = ({
  onDeleteFeed,
  onDeleteComment,
  onHideFeed,
  onReportFeed,
}) => {
  const [report, setReport] = useRecoilState(reportInfoAtom);
  const [reportModal, setReportModal] = useRecoilState(reportModalAtom);
  const [modalState, setModalState] = useRecoilState(modalStateAtom);

  const closeModal = () => {
    setModalState({
      type: null,
      isOpen: false,
    });
  };

  const handleReport = useCallback(() => {
    onReportFeed({ ...report });
    setReportModal({ type: null, isOpen: false });
  }, [report, onReportFeed, setReportModal]);

  const modalAction =
    modalState.type === "deleteFeed"
      ? onDeleteFeed
      : modalState.type === "hideFeed"
      ? onHideFeed
      : onDeleteComment;

  return (
    <>
      {modalState.isOpen && modalState.type && (
        <Modal
          title={MODAL_CONFIGS[modalState.type].title}
          content={MODAL_CONFIGS[modalState.type].content}
          left={MODAL_CONFIGS[modalState.type].leftButton}
          right={MODAL_CONFIGS[modalState.type].rightButton}
          action={modalAction}
          onClose={closeModal}
        />
      )}
      {reportModal.isOpen && (
        <Report
          report={report}
          setReport={setReport}
          handleReport={handleReport}
          onClose={() => setReportModal({ type: null, isOpen: false })}
        />
      )}
    </>
  );
};
