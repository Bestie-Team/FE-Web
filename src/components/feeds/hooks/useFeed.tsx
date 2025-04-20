import useNotification from "@/components/notice/hooks/useNotification";
import { useMemo } from "react";
import useFeedAll from "./useFeedAll";
import useDeleteFeed from "./useDeleteFeed";
import useDeleteComment from "./useDeleteComment";
import useHideFeed from "./useHideFeed";
import useReport from "@/components/report/hooks/useReport";
import { lightyToast } from "@/utils/toast";
import { useQueryClient } from "@tanstack/react-query";
import { maxDate, minDate } from "@/constants/time";
import { useAuth } from "@/components/shared/providers/AuthProvider";
import useFeedMine from "./useFeedMine";
import { useRecoilState, useRecoilValue, useResetRecoilState } from "recoil";
import { selectedFeedIdAtom } from "@/atoms/feed";
import { selectedCommentIdAtom } from "@/atoms/comment";
import { reportInfoAtom } from "@/atoms/modal";

export default function useFeed() {
  const resetReportInfo = useResetRecoilState(reportInfoAtom);
  const [feedId, setFeedId] = useRecoilState(selectedFeedIdAtom);
  const commentId = useRecoilValue(selectedCommentIdAtom);
  const { token, userInfo } = useAuth();
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

  const handleRefreshAll = async () => {
    try {
      await queryClient.invalidateQueries({
        queryKey: ["get/feeds/all"],
      });
      return true;
    } catch (error) {
      console.error("Refresh failed:", error);
      lightyToast.error("새로고침에 실패했어요");
      return false;
    }
  };

  const handleRefreshMine = async () => {
    try {
      await queryClient.invalidateQueries({
        queryKey: ["get/feeds/mine"],
      });
      return true;
    } catch (error) {
      console.error("Refresh failed:", error);
      lightyToast.error("새로고침에 실패했어요");
      return false;
    }
  };

  const handleDeleteCommentSuccess = async () => {
    lightyToast.success("댓글을 삭제했습니다");
    await Promise.all([
      await queryClient.invalidateQueries({
        queryKey: ["get/comments", { feedId }],
      }),
      await queryClient.invalidateQueries({
        queryKey: ["feed/detail", feedId],
      }),
    ]);
  };

  const handleHideFeedSuccess = async () => {
    lightyToast.success("피드를 숨겼어요");
    await Promise.all([
      await queryClient.invalidateQueries({
        queryKey: ["get/feeds/hidden"],
      }),
      await queryClient.invalidateQueries({
        queryKey: ["get/feeds/mine"],
      }),
      await queryClient.invalidateQueries({
        queryKey: ["get/feeds/all"],
      }),
    ]);
  };

  const handleReportSuccess = async (feedId: string) => {
    lightyToast.success("신고가 접수되었어요!");
    resetReportInfo();
    await Promise.all([
      await queryClient.invalidateQueries({
        queryKey: ["get/feeds/all"],
      }),
      await queryClient.invalidateQueries({
        queryKey: ["get/comments", { feedId }],
      }),
      await queryClient.invalidateQueries({
        queryKey: ["feed/detail", feedId],
      }),
    ]);
  };

  const handleDeleteFeedSuccess = async (data: { message: string }) => {
    lightyToast.success(data.message);
    await Promise.all([
      await queryClient.invalidateQueries({
        queryKey: ["get/feeds/mine"],
      }),
      await queryClient.invalidateQueries({
        queryKey: ["get/feeds/all"],
      }),
    ]);
  };

  const {
    data: feedAll,
    loadMore,
    isFetching,
  } = useFeedAll({ ...queryParams, enabled: !!token });

  const {
    data: feedMine,
    loadMore: loadMore_mine,
    isFetching: isFetching_mine,
  } = useFeedMine({ ...queryParams, enabled: !!token });

  const { data: noti = [] } = useNotification();

  const isNewNotification = noti.filter((n) => n.readAt == null);

  const mailCount = isNewNotification.filter(
    (notification) => notification.type === "GATHERING_INVITATION_RECEIVED"
  );

  const { mutate: deleteFeed } = useDeleteFeed({
    feedId: feedId,
    onSuccess: handleDeleteFeedSuccess,
  });

  const { mutate: deleteComment } = useDeleteComment({
    commentId: commentId,
    onSuccess: handleDeleteCommentSuccess,
  });

  const { mutate: hideFeed } = useHideFeed({
    feedId: feedId,
    onSuccess: handleHideFeedSuccess,
    onError: () => {
      lightyToast.error("피드를 숨기지 못했어요");
    },
  });

  const { mutate: report } = useReport({
    onSuccess: () => handleReportSuccess(feedId),
    onError: () => {
      lightyToast.error("신고 실패");
    },
  });
  return {
    feedId,
    setFeedId,

    feedAll,
    feedMine,

    isFetching,
    isFetching_mine,

    loadMore,
    loadMore_mine,

    handleRefreshAll,
    handleRefreshMine,

    deleteFeed,
    deleteComment,
    hideFeed,
    report,

    noti,
    isNewNotification,
    mailCount,

    userInfo,
  };
}
