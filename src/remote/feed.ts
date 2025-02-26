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
    throw new Error(error instanceof Error ? error.message : String(error));
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
    throw new Error(error instanceof Error ? error.message : String(error));
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
    throw new Error(error instanceof Error ? error.message : String(error));
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
    throw new Error(error instanceof Error ? error.message : String(error));
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
    return { message: "약속 피드 작성 완료" };
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : String(error));
  }
}

/** 친구 피드 생성 */
export async function postFriendsFeed({
  friendsFeed,
}: {
  friendsFeed: lighty.CreateFriendFeedRequest;
}): Promise<{ message: string } | void> {
  const baseUrl = API_CONFIG.getBaseUrl();
  const targetUrl = `${baseUrl}/feeds/friends`;
  try {
    await fetchWithAuth(targetUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(friendsFeed),
    });
    return { message: "친구 피드를 성공적으로 작성하였습니다" };
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : String(error));
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

    return { message: "피드 수정 완료" };
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : String(error));
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
    throw new Error(error instanceof Error ? error.message : String(error));
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
    throw new Error(error instanceof Error ? error.message : String(error));
  }
}

/** 피드 숨김 해제 */
export async function displayFeed({ feedId }: { feedId: string }) {
  const baseUrl = API_CONFIG.getBaseUrl();
  const targetUrl = `${baseUrl}/feeds/${feedId}/block`;
  try {
    await fetchWithAuth(targetUrl, {
      method: "DELETE",
    });

    return { message: "피드 숨김을 해제했어요" };
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : String(error));
  }
}
