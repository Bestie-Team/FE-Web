import STORAGE_KEYS from "@/constants/storageKeys";
import * as lighty from "lighty-type";

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

  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
  if (!backendUrl) {
    throw new Error("백엔드 URL이 설정되지 않았습니다.");
  }
  const targetUrl = `${backendUrl}/users/search?cursor=${encodeURIComponent(
    JSON.stringify(cursor)
  )}&limit=${limit}&search=${search}`;

  const token = localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
  if (!token) {
    throw new Error("로그인이 필요합니다.");
  }

  const response = await fetch(targetUrl, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const data: lighty.SearchUserResponse = await response.json();
  if (!response.ok) {
    if (response.status === 400) {
      alert("검색어는 2자 이상 20자 이하만 가능합니다.");
    }
    throw new Error("친구 검색 중 에러가 발생하였습니다.");
  }

  return data;
}
