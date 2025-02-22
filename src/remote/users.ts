import * as lighty from "lighty-type";
import { API_CONFIG, fetchWithAuth } from "./shared";
import { SearchFriendResponse } from "@/models/user";

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
    const data: SearchFriendResponse = await response.json();
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
