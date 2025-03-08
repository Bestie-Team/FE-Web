"use client";
import useGatheringDetail from "@/components/gathering/hooks/useGatheringDetail";
import useDeleteGathering from "@/components/gathering/hooks/useDeleteGathering";
import { lightyToast } from "@/utils/toast";
import { useRouter } from "next/navigation";
import DotSpinner from "@/components/shared/Spinner/DotSpinner";
import getHeader from "@/utils/getHeader";
import GatheringDetail from "@/components/gathering/GatheringDetail";
import Modal from "@/components/shared/Modal/Modal";
import { useRecoilState } from "recoil";
import ErrorPage from "@/components/shared/ErrorPage";
import { modalStateAtom } from "@/atoms/modal";

export default function GatheringDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const header = getHeader("/gathering/1234");
  const router = useRouter();
  const [modalState, setModalState] = useRecoilState(modalStateAtom);

  const id = params.id;
  const { data: selectedGathering, isPending } = useGatheringDetail({
    id,
    enabled: !!id,
  });

  const { mutate: deleteGathering } = useDeleteGathering({
    id,
    onSuccess: (data) => {
      lightyToast.success(data.message);
      router.replace("/gathering");
    },
    onError: (error) => lightyToast.error(error.message),
  });

  const isClient = typeof window !== "undefined";

  if (!isClient || !selectedGathering) {
    return <ErrorPage />;
  }
  const MODAL_CONFIGS = {
    deleteGathering: {
      title: "약속을 삭제하시겠어요?",
      content: "약속 관련 정보가 전부 삭제되며 이는 복구할 수 없어요.",
      leftButton: "취소",
      rightButton: "삭제하기",
      action: () => deleteGathering(),
    },
  };

  const closeModal = () => {
    setModalState({
      type: null,
      isOpen: false,
    });
  };

  return (
    <div className="min-h-dvh">
      {header}
      <GatheringDetail selectedGathering={selectedGathering} />
      {isPending && <DotSpinner />}
      {modalState.isOpen && modalState.type && (
        <Modal
          title={MODAL_CONFIGS[modalState.type].title}
          content={MODAL_CONFIGS[modalState.type].content}
          left={MODAL_CONFIGS[modalState.type].leftButton}
          right={MODAL_CONFIGS[modalState.type].rightButton}
          action={MODAL_CONFIGS[modalState.type].action}
          onClose={closeModal}
        />
      )}
    </div>
  );
}
