"use client";
import useGatheringDetail from "@/components/gathering/hooks/useGatheringDetail";
import { useEffect, useState } from "react";
import useDeleteGathering from "@/components/gathering/hooks/useDeleteGathering";
import { lightyToast } from "@/utils/toast";
import { useRouter } from "next/navigation";
import DotSpinner from "@/components/shared/Spinner/DotSpinner";
import getHeader from "@/utils/getHeader";
import GatheringDetail from "@/components/gathering/GatheringDetail";
import Modal from "@/components/shared/Modal/Modal";
import { gatheringDeleteModalAtom } from "@/atoms/modal";
import { useRecoilState } from "recoil";
import ErrorPage from "@/components/shared/ErrorPage";

export default function GatheringDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const header = getHeader("/gathering/1234");
  const router = useRouter();
  const [deleteModalOpen, setDeleteModalOpen] = useRecoilState(
    gatheringDeleteModalAtom
  );
  const [isClient, setIsClient] = useState(false);

  const id = params.id;
  const {
    data: selectedGathering,
    isPending,
    isError,
  } = useGatheringDetail({
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

  useEffect(() => {
    if (!isClient) setIsClient(true);
  }, [isClient]);

  if (!isClient || isPending) return <DotSpinner />;

  if (isError || !selectedGathering) {
    return <ErrorPage />;
  }

  return (
    <div className="min-h-dvh">
      {header}
      <GatheringDetail selectedGathering={selectedGathering} />
      {deleteModalOpen && (
        <Modal
          title="약속을 삭제하시겠어요?"
          content="약속 관련 정보가 전부 삭제되며 이는 복구할 수 없어요."
          left="취소"
          right="삭제하기"
          action={() => deleteGathering()}
          onClose={() => setDeleteModalOpen(false)}
        />
      )}
    </div>
  );
}
