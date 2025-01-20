import { feedDeleteAskModalAtom } from "@/atoms/modal";
import MemoryCard from "@/components/feed/MemoryCard";
import NoFeed from "@/components/feed/NoFeed";
import Flex from "@/components/shared/Flex";
import { Feed } from "@/models/feed";
import { Dispatch, SetStateAction } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import Modal from "../shared/Modal/Modal";
import useDeleteFeed from "../feeds/hooks/useDeleteFeed";
import { selectedFeedIdAtom } from "@/atoms/feed";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";
import { maxDate, minDate } from "@/constants/time";

export type FeedType = "나의피드" | "전체";
export default function MyFeed({
  feeds,
  onClickFeed,
}: {
  feeds: Feed[] | null;
  onClickFeed: Dispatch<SetStateAction<string>>;
}) {
  const [deleteModalOpen, setDeleteModalOpen] = useRecoilState(
    feedDeleteAskModalAtom
  );
  if (!feeds) return;
  const selectedFeedId = useRecoilValue(selectedFeedIdAtom);
  const queryClient = useQueryClient();

  const { mutate: deleteFeed } = useDeleteFeed({
    feedId: selectedFeedId,
    onSuccess: async (data) => {
      toast.success(data.message);
      await queryClient.invalidateQueries({
        queryKey: [
          "get/feeds/mine",
          {
            order: "DESC",
            minDate: minDate.slice(0, 10),
            maxDate: maxDate.slice(0, 10),
            limit: 10,
          },
        ],
      });
    },
  });

  return (
    <div className="pt-[107px] pb-[111px] animate-fadeIn">
      <Flex direction="column">
        {feeds?.length > 0 ? (
          feeds.map((feed) => (
            <MemoryCard key={feed.id} feed={feed} onClick={onClickFeed} />
          ))
        ) : (
          <NoFeed />
        )}
      </Flex>
      {deleteModalOpen ? (
        <Modal
          title="피드를 삭제하시겠어요?"
          content="피드 정보가 전부 삭제되며 이는 복구할 수 없어요."
          left="취소"
          right="삭제하기"
          action={() => deleteFeed()}
          onClose={() => setDeleteModalOpen(false)}
        />
      ) : null}
    </div>
  );
}
