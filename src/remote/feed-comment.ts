import { ERROR_MESSAGES } from "@/constants/errorMessages";
import { FeedCommentResponse } from "@/models/feed";
import { API_CONFIG, fetchWithAuth } from "./shared";
interface CommentResponse {
  message: string;
}
/** 피드 댓글 조회 */
export async function getFeedComments({ feedId }: { feedId: string }) {
  const baseUrl = API_CONFIG.getBaseUrl();

  try {
    const targetUrl = `${baseUrl}/feed-comments?feedId=${feedId}`;
    const response = await fetchWithAuth(targetUrl, {
      method: "GET",
    });
    if (!response) {
      throw new Error("Response is undefined");
    }
    const data: FeedCommentResponse[] = await response.json();
    return data;
  } catch (error) {
    console.log(error);
    throw new Error("피드 댓글 조회를 실패하였습니다");
  }
}

/** 피드 댓글 작성*/
export async function postMakeComment({
  feedId,
  content,
  mentionedUserId,
}: {
  feedId: string;
  content: string;
  mentionedUserId?: string;
}): Promise<CommentResponse | undefined> {
  const baseUrl = API_CONFIG.getBaseUrl();
  try {
    if (!feedId || !content.trim()) {
      throw new Error("feedId와 content는 필수값입니다.");
    }
    const targetUrl = `${baseUrl}/feed-comments`;
    const response = await fetchWithAuth(targetUrl, {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify({ feedId, content, mentionedUserId }),
    });
    console.log(response);
    return { message: "피드 댓글을 성공적으로 작성하였습니다" };
  } catch (error) {
    if (error instanceof Response) {
      handleResponse(error);
    }
  }
}

/** 댓글 삭제하기  */
export async function deleteFeedComment({ commentId }: { commentId: string }) {
  const baseUrl = API_CONFIG.getBaseUrl();

  try {
    const targetUrl = `${baseUrl}/feed-comments/${commentId}`;
    const response = await fetchWithAuth(targetUrl, {
      method: "DELETE",
    });
    console.log(response);
    return { message: "댓글을 성공적으로 삭제하였습니다" };
  } catch (error) {
    console.log(error);
    throw new Error("댓글 삭제에 실패하였습니다");
  }
}

async function handleResponse(response: Response) {
  const errorMap: Record<number, string> = {
    404: ERROR_MESSAGES.NOT_FOUND,
    409: ERROR_MESSAGES.CONFLICT,
    422: ERROR_MESSAGES.INVALID_STATE,
  };

  const errorMessage = errorMap[response.status] || ERROR_MESSAGES.DEFAULT;
  console.error(`피드 생성 오류: ${errorMessage}`);
  throw new Error(errorMessage);
}
