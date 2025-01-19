import { ERROR_MESSAGES } from "@/constants/errorMessages";
import { FeedResponse } from "@/models/feed";
import * as lighty from "lighty-type";
import { v4 as uuidv4 } from "uuid";
import { API_CONFIG, fetchWithAuth } from "./shared";

const uuid = uuidv4();

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
}: {
  order: "DESC" | "ASC";
  minDate: string;
  maxDate: string;
  limit: number;
}) {
  const cursor = {
    createdAt: order === "DESC" ? maxDate : minDate,
    id: uuid,
  };
  const baseUrl = API_CONFIG.getBaseUrl();
  try {
    const targetUrl = `${baseUrl}/feeds?order=${order}&minDate=${minDate}&maxDate=${maxDate}&cursor=${encodeURIComponent(
      JSON.stringify(cursor)
    )}&limit=${limit}`;

    const response = await fetch(targetUrl, {
      method: "GET",
    });

    const data: FeedResponse = await response.json();

    return data;
  } catch (error) {
    if (error instanceof Response) {
      throw new Error("피드 조회를 실패하였습니다,");
    }
    throw new Error("피드 조회를 실패하였습니다,");
  }
}

/** 자신이 작성한 피드 목록 조회 */
/** 첫 커서는 현재 날짜 */
export async function getFeedMine({
  order,
  minDate,
  maxDate,
  limit,
}: {
  order: "DESC" | "ASC";
  minDate: string;
  maxDate: string;
  limit: number;
}) {
  const baseUrl = API_CONFIG.getBaseUrl();
  const cursor = {
    createdAt: order === "DESC" ? maxDate : minDate,
    id: uuid,
  };
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
    throw new Error("내가 작성한 피드 조회를 실패하였습니다,");
  }
}

/** 모임 피드 사진 업로드 생성 */
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

/** 모임 피드 생성 */
export async function postGatheringFeed({
  gatheringFeed,
}: {
  gatheringFeed: lighty.CreateGatheringFeedRequest;
}) {
  const baseUrl = API_CONFIG.getBaseUrl();
  const targetUrl = `${baseUrl}/feeds/gatherings`;
  try {
    const response = await fetchWithAuth(targetUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(gatheringFeed),
    });

    return { message: "모임 피드를 성공적으로 작성하였습니다." };
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
    const response = await fetchWithAuth(targetUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(friendFeed),
    });

    const data = await response.json();

    return { message: data };
  } catch (error) {
    if (error instanceof Response) {
      handleResponse(error);
    }
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
  const targetUrl = `${baseUrl}/${feedId}`;
  try {
    const response = await fetchWithAuth(targetUrl, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(content),
    });

    const data = await response.json();
    return { message: data };
  } catch (error) {
    if (error instanceof Response) {
      return handleResponse(error);
    }
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
