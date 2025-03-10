import * as lighty from "lighty-type";
import { API_CONFIG, fetchWithAuth } from "./shared";
import STORAGE_KEYS from "@/constants/storageKeys";

/** 유저 검색 */
export async function getSearchUsers({
  name,
  accountId,
  limit,
  search,
}: {
  name: string;
  accountId: string;
  limit: number;
  search: string;
}) {
  const cursor = { name, accountId };
  const baseUrl = API_CONFIG.getBaseUrl();
  try {
    const targetUrl = `${baseUrl}/users/search?cursor=${encodeURIComponent(
      JSON.stringify(cursor)
    )}&limit=${limit}&search=${search}`;

    const response = await fetchWithAuth(targetUrl, {
      method: "GET",
    });
    const data: lighty.SearchUserResponse = await response.json();
    return data;
  } catch (error) {
    if (error instanceof Response && error.status === 400) {
      throw new Error("검색어는 2자 이상 20자 이하만 가능합니다");
    }

    throw new Error("친구 검색 중 에러가 발생했습니다");
  }
}
/** 회원 상세 조회 */
export async function getUserDetail() {
  const baseUrl = API_CONFIG.getBaseUrl();
  try {
    const targetUrl = `${baseUrl}/users/my`;
    const response = await fetchWithAuth(targetUrl, {
      method: "GET",
    });
    const data: lighty.UserDetailResponse = await response.json();
    return data;
  } catch (error) {
    console.log(error);
    throw new Error("유저 정보 검색 중 에러가 발생했습니다");
  }
}

/** 회원 프로필 조회 */
export async function getUserProfile() {
  const baseUrl = API_CONFIG.getBaseUrl();
  try {
    const targetUrl = `${baseUrl}/users/profile`;
    const response = await fetchWithAuth(targetUrl, {
      method: "GET",
    });
    const data: lighty.UserProfileResponse = await response.json();
    return data;
  } catch (error) {
    console.log(error);
    throw new Error("유저 프로필 검색 중 에러가 발생했습니다");
  }
}

export async function getIdAvailability({ accountId }: { accountId: string }) {
  const baseUrl = API_CONFIG.getBaseUrl();

  const targetUrl = `${baseUrl}/users/availability?accountId=${accountId}`;
  const response = await fetch(targetUrl, {
    method: "GET",
  });
  return response;
}

export async function patchNotificationToken(
  body: lighty.UpdateNotificationTokenRequest
) {
  const baseUrl = API_CONFIG.getBaseUrl();
  try {
    const targetUrl = `${baseUrl}/users/notification-token`;
    await fetchWithAuth(targetUrl, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
  } catch (error) {
    console.log(error);
    throw new Error("토큰 업로드 실패");
  }
}

export async function deleteUser() {
  const baseUrl = API_CONFIG.getBaseUrl();
  try {
    const targetUrl = `${baseUrl}/users`;
    const response = await fetchWithAuth(targetUrl, {
      method: "DELETE",
    });
    const data = await response.json();
    if (data) {
      localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
      localStorage.removeItem(STORAGE_KEYS.DEVICE_ID);
      sessionStorage.removeItem(STORAGE_KEYS.USER_INFO);
    }
    return data;
  } catch (error) {
    console.log(error);
    throw new Error("탈퇴 실패");
  }
}
