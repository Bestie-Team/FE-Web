/**첫 번째 커서: { createdAt: 현재 날짜, id: uuid 아무 값이나 } */
import { API_CONFIG, fetchWithAuth } from "./shared";
import * as lighty from "lighty-type";

export async function getNotification({
  cursor,
  limit,
}: lighty.NotificationListRequest) {
  const baseUrl = API_CONFIG.getBaseUrl();
  const targetUrl = `${baseUrl}/notifications?cursor=${encodeURIComponent(
    JSON.stringify(cursor)
  )}&limit=${limit}`;
  try {
    const response = await fetchWithAuth(targetUrl, {
      method: "GET",
    });
    const data: lighty.NotificationListResponse = await response.json();
    return data;
  } catch (e) {
    console.log(e);
    throw new Error("알림 조회를 실패하였습니다");
  }
}

/** 알림 읽음 처리 */
export async function patchNotification() {
  const baseUrl = API_CONFIG.getBaseUrl();
  const targetUrl = `${baseUrl}/notifications/read`;

  try {
    await fetchWithAuth(targetUrl, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
    });

    return { message: "읽음 처리 완료" };
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : String(error));
  }
}

/** 알림 삭제  */
export async function deleteNotification({
  notificationId,
}: {
  notificationId: string;
}) {
  const baseUrl = API_CONFIG.getBaseUrl();
  try {
    const targetUrl = `${baseUrl}/notifications/${notificationId}`;
    await fetchWithAuth(targetUrl, { method: "DELETE" });
    return {
      message: "알림을 성공적으로 삭제하였습니다",
    };
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : String(error));
  }
}

/** 알림 전체 삭제  */
export async function deleteNotificationAll() {
  const baseUrl = API_CONFIG.getBaseUrl();
  try {
    const targetUrl = `${baseUrl}/notifications/all`;
    await fetchWithAuth(targetUrl, { method: "DELETE" });
    return {
      message: "알림 전체를 성공적으로 삭제하였습니다",
    };
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : String(error));
  }
}
