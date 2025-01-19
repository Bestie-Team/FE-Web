import STORAGE_KEYS from "@/constants/storageKeys";
import * as lighty from "lighty-type";
import { validateAuth, validateBackendUrl } from "./shared";

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

  const backendUrl = validateBackendUrl();
  const token = validateAuth();

  const targetUrl = `${backendUrl}/users/search?cursor=${encodeURIComponent(
    JSON.stringify(cursor)
  )}&limit=${limit}&search=${search}`;

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
