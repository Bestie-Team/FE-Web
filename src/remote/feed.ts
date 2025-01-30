import { ERROR_MESSAGES } from "@/constants/errorMessages";
import * as lighty from "lighty-type";
import { API_CONFIG, fetchWithAuth } from "./shared";
import { FeedResponse } from "@/models/feed";

// 응답 타입 정의
export type FeedSuccessResponse = {
  message: string;
};

/** 모든 피드 목록 조회 */
/** 첫 커서는 현재 날짜 */
export async function getFeedAll({
  order,
  minDate,
  maxDate,
  limit,
  cursor,
}: {
  order: "DESC" | "ASC";
  minDate: string;
  maxDate: string;
  limit: number;
  cursor: { createdAt: string; id: string };
}) {
  const baseUrl = API_CONFIG.getBaseUrl();
  try {
    const targetUrl = `${baseUrl}/feeds?order=${order}&minDate=${minDate}&maxDate=${maxDate}&cursor=${encodeURIComponent(
      JSON.stringify(cursor)
    )}&limit=${limit}`;

    const response = await fetchWithAuth(targetUrl, {
      method: "GET",
    });

    const data: FeedResponse = await response.json();

    return data;
  } catch (error) {
    if (error instanceof Response) {
      throw new Error("피드 조회를 실패하였습니다");
    }
    throw new Error("피드 조회를 실패하였습니다");
  }
}

/** 자신이 작성한 피드 목록 조회 */
/** 첫 커서는 현재 날짜 */
export async function getFeedMine({
  cursor,
  order,
  minDate,
  maxDate,
  limit,
}: {
  cursor: { createdAt: string; id: string };
  order: "DESC" | "ASC";
  minDate: string;
  maxDate: string;
  limit: number;
}) {
  const baseUrl = API_CONFIG.getBaseUrl();
  try {
    const targetUrl = `${baseUrl}/feeds/my?order=${order}&minDate=${minDate}&maxDate=${maxDate}&cursor=${encodeURIComponent(
      JSON.stringify(cursor)
    )}&limit=${limit}`;

    const response = await fetchWithAuth(targetUrl, {
      method: "GET",
    });
    const data: FeedResponse = await response.json();

    return data;
  } catch (error) {
    console.log(error);
    throw new Error("내가 작성한 피드 조회를 실패하였습니다");
  }
}

/** 숨긴 피드 조회 */
export async function getFeedHidden({
  cursor,
  limit,
}: {
  cursor: { createdAt: string; id: string };
  limit: number;
}) {
  const baseUrl = API_CONFIG.getBaseUrl();

  try {
    const targetUrl = `${baseUrl}/feeds/blocked?cursor=${encodeURIComponent(
      JSON.stringify(cursor)
    )}&limit=${limit}`;

    const response = await fetchWithAuth(targetUrl, {
      method: "GET",
    });
    const data: FeedResponse = await response.json();

    return data;
  } catch (error) {
    console.log(error);
    throw new Error("숨긴 피드 조회를 실패하였습니다");
  }
}

/** 약속 피드 사진 업로드 생성 */
export async function uploadFeedImages({ files }: { files: File[] }) {
  const baseUrl = API_CONFIG.getBaseUrl();
  try {
    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append("files", files[i]);
    }
    const targetUrl = `${baseUrl}/feeds/images`;
    const response = await fetchWithAuth(targetUrl, {
      method: "POST",
      body: formData,
    });

    const data: lighty.UploadImageListResponse = await response.json();
    return { ...data, message: "이미지를 성공적으로 업로드하였습니다." };
  } catch (error) {
    if (error instanceof Response) {
      handleResponse(error);
    }
    throw new Error("이미지 업로드 실패");
  }
}

/** 약속 피드 생성 */
export async function postGatheringFeed({
  gatheringFeed,
}: {
  gatheringFeed: lighty.CreateGatheringFeedRequest;
}): Promise<{ message: string } | void> {
  const baseUrl = API_CONFIG.getBaseUrl();
  const targetUrl = `${baseUrl}/feeds/gatherings`;
  try {
    await fetchWithAuth(targetUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(gatheringFeed),
    });
    return { message: "약속 피드를 성공적으로 작성하였습니다" };
  } catch (error) {
    if (error instanceof Response) {
      return handleResponse(error);
    }
  }
}

/** 일반 피드 생성 */
export async function postFriendFeed({
  friendFeed,
}: {
  friendFeed: lighty.CreateFriendFeedRequest;
}) {
  const baseUrl = API_CONFIG.getBaseUrl();
  try {
    const targetUrl = `${baseUrl}/feeds/friends`;
    await fetchWithAuth(targetUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(friendFeed),
    });

    return { message: "일반 피드를 작성하였습니다" };
  } catch (error) {
    if (error instanceof Response) {
      handleResponse(error);
    }
    throw error;
  }
}

/** 피드 수정 */
export async function patchFeed({
  content,
  feedId,
}: {
  content: string;
  feedId: string;
}) {
  const baseUrl = API_CONFIG.getBaseUrl();
  const targetUrl = `${baseUrl}/feeds/${feedId}`;
  try {
    await fetchWithAuth(targetUrl, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content }),
    });

    return { message: "피드를 수정 완료" };
  } catch (error) {
    if (error instanceof Response) {
      return handleResponse(error);
    }
    throw error;
  }
}

/** 피드 삭제 */
export async function deleteFeed({ feedId }: { feedId: string }) {
  const baseUrl = API_CONFIG.getBaseUrl();
  const targetUrl = `${baseUrl}/feeds/${feedId}`;
  try {
    await fetchWithAuth(targetUrl, {
      method: "DELETE",
    });

    return { message: "피드를 성공적으로 삭제하였습니다" };
  } catch (error) {
    console.log(error);
    throw new Error("피드를 삭제하지 못하였습니다");
  }
}

/** 피드 숨김 */
export async function hideFeed({ feedId }: { feedId: string }) {
  const baseUrl = API_CONFIG.getBaseUrl();
  const targetUrl = `${baseUrl}/feeds/${feedId}/block`;
  try {
    await fetchWithAuth(targetUrl, {
      method: "POST",
    });

    return { message: "피드를 성공적으로 숨겼어요" };
  } catch (error) {
    console.log(error);
    throw new Error("피드를 숨기지 못하였습니다");
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
