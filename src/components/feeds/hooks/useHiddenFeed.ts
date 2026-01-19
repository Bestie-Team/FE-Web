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
import { queryKeys } from "@/lib/queryKeys";
import type { Feed } from "@/models/feed";

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
    await Promise.all([
      queryClient.invalidateQueries({ queryKey: queryKeys.feed.mine() }),
      queryClient.invalidateQueries({ queryKey: queryKeys.feed.all() }),
      queryClient.invalidateQueries({
        queryKey: queryKeys.feed.hidden(),
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
        queryKey: queryKeys.feed.comments(feedId),
      });
    },
  });

  const { mutate: reportComment } = useReport({
    onSuccess: async (data: { message: string }) => {
      lightyToast.success(data.message);
      await queryClient.invalidateQueries({
        queryKey: queryKeys.feed.comments(feedId),
      });
    },
    onError: (e) => {
      lightyToast.error(e.message);
    },
  });

  const handleFeedSelect = useCallback(
    (feed: Feed) => {
      setFeedId(feed.id);
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
