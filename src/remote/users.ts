import * as lighty from "lighty-type";
import { API_CONFIG, fetchWithAuth } from "./shared";

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
      throw new Error("검색어는 2자 이상 20자 이하만 가능합니다.");
    }
    throw new Error("친구 검색 중 에러가 발생했습니다.");
  }
}
