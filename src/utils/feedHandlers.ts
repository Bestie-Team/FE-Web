import { QueryClient } from "@tanstack/react-query";
import { lightyToast } from "@/utils/toast";

export const successToast = (msg: string) => lightyToast.success(msg);
export const errorToast = (msg: string) => lightyToast.error(msg);

// 댓글 삭제 후 처리
export const handleDeleteCommentSuccess =
  (queryClient: QueryClient, feedId: string) => async () => {
    successToast("댓글을 삭제했습니다");
    await Promise.all([
      queryClient.invalidateQueries({ queryKey: ["get/comments", { feedId }] }),
      queryClient.invalidateQueries({ queryKey: ["feed/detail", feedId] }),
    ]);
  };

// 피드 숨김 후 처리
export const handleHideFeedSuccess = (queryClient: QueryClient) => async () => {
  successToast("피드를 숨겼어요");
  await Promise.all([
    queryClient.invalidateQueries({ queryKey: ["get/feeds/hidden"] }),
    queryClient.invalidateQueries({ queryKey: ["get/feeds/mine"] }),
    queryClient.invalidateQueries({ queryKey: ["get/feeds/all"] }),
  ]);
};

// 피드 신고 성공 후 처리
export const handleReportSuccess =
  (queryClient: QueryClient, resetReportInfo: () => void, feedId: string) =>
  async () => {
    successToast("신고가 접수되었어요!");
    resetReportInfo();
    await Promise.all([
      queryClient.invalidateQueries({ queryKey: ["get/feeds/all"] }),
      queryClient.invalidateQueries({ queryKey: ["get/comments", { feedId }] }),
      queryClient.invalidateQueries({ queryKey: ["feed/detail", feedId] }),
    ]);
  };

// 피드 삭제 성공 후 처리
export const handleDeleteFeedSuccess =
  (queryClient: QueryClient) => async (data: { message: string }) => {
    successToast(data.message);
    await Promise.all([
      queryClient.invalidateQueries({ queryKey: ["get/feeds/mine"] }),
      queryClient.invalidateQueries({ queryKey: ["get/feeds/all"] }),
    ]);
  };
