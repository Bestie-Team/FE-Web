import { ERROR_MESSAGES } from "@/constants/errorMessages";
import { FeedResponse } from "@/models/feed";
import * as lighty from "lighty-type";
import { v4 as uuidv4 } from "uuid";
import { validateAuth, validateBackendUrl } from "./shared";

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
  const backendUrl = validateBackendUrl();
  const token = validateAuth();
  const cursor = {
    createdAt: order === "DESC" ? maxDate : minDate,
    id: uuid,
  };
  const targetUrl = `${backendUrl}/feeds?order=${order}&minDate=${minDate}&maxDate=${maxDate}&cursor=${encodeURIComponent(
    JSON.stringify(cursor)
  )}&limit=${limit}`;

  const response = await fetch(targetUrl, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("피드 조회를 실패하였습니다,");
  }
  const data: FeedResponse = await response.json();

  return data;
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
  const backendUrl = validateBackendUrl();
  const token = validateAuth();
  const cursor = {
    createdAt: order === "DESC" ? maxDate : minDate,
    id: uuid,
  };
  const targetUrl = `${backendUrl}/feeds/my?order=${order}&minDate=${minDate}&maxDate=${maxDate}&cursor=${encodeURIComponent(
    JSON.stringify(cursor)
  )}&limit=${limit}`;

  const response = await fetch(targetUrl, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("내가 작성한 피드 조회를 실패하였습니다,");
  }
  const data: FeedResponse = await response.json();

  return data;
}

/** 모임 피드 사진 업로드 생성 */
export async function uploadFeedImages({ files }: { files: File[] }) {
  const backendUrl = validateBackendUrl();
  const token = validateAuth();

  const formData = new FormData();
  for (let i = 0; i < files.length; i++) {
    formData.append("files", files[i]);
  }

  const response = await makeUploadRequest(
    `${backendUrl}/feeds/images`,
    token,
    formData
  );
  const data: lighty.UploadImageListResponse = await response.json();

  if (response.ok) {
    return { ...data, message: "이미지를 성공적으로 업데이트하였습니다" };
  }

  if (!response.ok) return handleResponse(response);

  return { ...data, message: "이미지를 성공적으로 업데이트하였습니다" };
}

/** 모임 피드 생성 */
export async function postGatheringFeed({
  gatheringFeed,
}: {
  gatheringFeed: lighty.CreateGatheringFeedRequest;
}) {
  const backendUrl = validateBackendUrl();
  const token = validateAuth();

  const response = await makePostRequest(
    `${backendUrl}/feeds/gatherings`,
    token,
    gatheringFeed
  );

  if (response.ok) {
    return { message: "모임 피드를 성공적으로 작성하였습니다." };
  }

  return handleResponse(response);
}

/** 일반 피드 생성 */
export async function postFriendFeed({
  friendFeed,
}: {
  friendFeed: lighty.CreateFriendFeedRequest;
}) {
  const backendUrl = validateBackendUrl();
  const token = validateAuth();

  const response = await makePostRequest(
    `${backendUrl}/feeds/friends`,
    token,
    friendFeed
  );

  const data = await response.json();
  if (response.ok) {
    return { message: data };
  }

  return handleResponse(response);
}

/** 피드 수정 */
export async function patchFeed({
  content,
  feedId,
}: {
  content: string;
  feedId: string;
}) {
  const backendUrl = validateBackendUrl();
  const token = validateAuth();

  const response = await makePatchRequest(`${backendUrl}/${feedId}`, token, {
    content,
  });

  const data = await response.json();
  if (response.ok) {
    return { message: data };
  }

  return handleResponse(response);
}

async function makePostRequest(
  backendUrl: string,
  token: string,
  gatheringFeed:
    | lighty.CreateGatheringFeedRequest
    | lighty.CreateFriendFeedRequest
): Promise<Response> {
  const targetUrl = `${backendUrl}`;

  return fetch(targetUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(gatheringFeed),
  });
}
async function makePatchRequest(
  backendUrl: string,
  token: string,
  content: { content: string }
): Promise<Response> {
  const targetUrl = `${backendUrl}`;

  return fetch(targetUrl, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(content),
  });
}

async function makeUploadRequest(
  backendUrl: string,
  token: string,
  formData: FormData
): Promise<Response> {
  const targetUrl = `${backendUrl}`;

  return fetch(targetUrl, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });
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
