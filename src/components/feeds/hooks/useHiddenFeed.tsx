import useReport from "@/components/report/hooks/useReport";
import { lightyToast } from "@/utils/toast";
import useDeleteComment from "./useDeleteComment";
import useDisplayFeed from "./useDisplayFeed";
import useFeedHidden from "./useFeedHidden";
import { useQueryClient } from "@tanstack/react-query";
import { useRecoilState, useRecoilValue } from "recoil";
import { selectedFeedIdAtom } from "@/atoms/feed";
import { selectedCommentIdAtom } from "@/atoms/comment";
import { useCallback } from "react";

export default function useHiddenFeed() {
  const queryClient = useQueryClient();
  const [feedId, setFeedId] = useRecoilState(selectedFeedIdAtom);
  const commentId = useRecoilValue(selectedCommentIdAtom);

  const {
    data: hiddenFeed = [],
    loadMore,
    isFetching,
  } = useFeedHidden({ limit: 100 });

  const displaySuccessHandler = async (message: string) => {
    lightyToast.success(message);
    Promise.all([
      await queryClient.invalidateQueries({ queryKey: ["get/feeds/mine"] }),
      await queryClient.invalidateQueries({
        queryKey: ["get/feeds/hidden"],
      }),
    ]);
  };

  const { mutate: displayFeed } = useDisplayFeed({
    feedId,
    onSuccess: displaySuccessHandler,
  });

  const { mutate: deleteComment } = useDeleteComment({
    commentId,
    onSuccess: async (data: { message: string }) => {
      lightyToast.success(data.message);
      await queryClient.invalidateQueries({
        queryKey: ["get/comments", { feedId }],
      });
    },
  });

  const { mutate: reportComment } = useReport({
    onSuccess: async (data: { message: string }) => {
      lightyToast.success(data.message);
      await queryClient.invalidateQueries({
        queryKey: ["get/comments", { feedId }],
      });
    },
    onError: (e) => {
      lightyToast.error(e.message);
    },
  });

  const handleFeedSelect = useCallback(
    (feedId: string) => {
      setFeedId(feedId);
    },
    [setFeedId]
  );

  return {
    feedId,
    hiddenFeed,
    loadMore,
    isFetching,
    displayFeed,
    deleteComment,
    reportComment,
    handleFeedSelect,
  };
}
