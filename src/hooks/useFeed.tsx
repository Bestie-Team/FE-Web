import { useMemo } from "react";
import { useRecoilState, useRecoilValue, useResetRecoilState } from "recoil";
import { useQueryClient } from "@tanstack/react-query";

import useNotification from "@/components/notice/hooks/useNotification";
import useReport from "@/components/report/hooks/useReport";

import { selectedFeedIdAtom } from "@/atoms/feed";
import { selectedCommentIdAtom } from "@/atoms/comment";
import { reportInfoAtom } from "@/atoms/modal";

import { useAuth } from "@/components/shared/providers/AuthProvider";
import { minDate, maxDate } from "@/constants/time";
import useFeedAll from "@/components/feeds/hooks/useFeedAll";
import useFeedMine from "@/components/feeds/hooks/useFeedMine";
import useDeleteFeed from "@/components/feeds/hooks/useDeleteFeed";
import useDeleteComment from "@/components/feeds/hooks/useDeleteComment";
import useHideFeed from "@/components/feeds/hooks/useHideFeed";

import { errorToast, handleRefresh } from "@/utils/feedUtils";

import {
  handleDeleteCommentSuccess,
  handleDeleteFeedSuccess,
  handleHideFeedSuccess,
  handleReportSuccess,
} from "@/utils/feedHandlers";

export default function useFeed() {
  const resetReportInfo = useResetRecoilState(reportInfoAtom);
  const [feedId, setFeedId] = useRecoilState(selectedFeedIdAtom);
  const commentId = useRecoilValue(selectedCommentIdAtom);
  const { userInfo, isAuthenticated } = useAuth();
  const queryClient = useQueryClient();

  const queryParams = useMemo(
    () => ({
      order: "DESC" as const,
      minDate: minDate(),
      maxDate: maxDate(),
      limit: 8,
    }),
    []
  );

  // Feed 데이터
  const {
    data: feedAll,
    loadMore,
    isFetching,
  } = useFeedAll({ ...queryParams, enabled: !!isAuthenticated });
  const {
    data: feedMine,
    loadMore: loadMoreMine,
    isFetching: isFetchingMine,
  } = useFeedMine({
    ...queryParams,
    enabled: !!isAuthenticated,
  });

  // Notifications
  const { data: notifications = [] } = useNotification();
  const isNewNotification = notifications.filter((n) => n.readAt == null);
  const mailCount = isNewNotification.filter(
    (n) => n.type === "GATHERING_INVITATION_RECEIVED"
  );

  // Mutations
  const { mutate: deleteFeed } = useDeleteFeed({
    feedId,
    onSuccess: handleDeleteFeedSuccess(queryClient),
  });
  const { mutate: deleteComment } = useDeleteComment({
    commentId,
    onSuccess: handleDeleteCommentSuccess(queryClient, feedId),
  });
  const { mutate: hideFeed } = useHideFeed({
    feedId,
    onSuccess: handleHideFeedSuccess(queryClient),
    onError: () => errorToast("피드를 숨기지 못했어요"),
  });

  const { mutate: report } = useReport({
    onSuccess: () => handleReportSuccess(queryClient, resetReportInfo, feedId),
    onError: () => errorToast("신고 실패"),
  });

  return {
    feedId,
    setFeedId,

    feedAll,
    feedMine,

    isFetching,
    isFetchingMine,

    loadMore,
    loadMoreMine,

    handleRefreshAll: () => handleRefresh(queryClient, ["get/feeds/all"]),
    handleRefreshMine: () => handleRefresh(queryClient, ["get/feeds/mine"]),

    deleteFeed,
    deleteComment,
    hideFeed,
    report,

    notifications,
    isNewNotification,
    mailCount,

    userInfo,
  };
}
