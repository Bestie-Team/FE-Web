import STORAGE_KEYS from "@/constants/storageKeys";
import * as lighty from "lighty-type";
import { validateAuth, validateBackendUrl } from "./shared";

/** 친구 요청 */
export async function postFriends({ userId }: { userId: string }) {
  const backendUrl = validateBackendUrl();
  const token = validateAuth();

  const targetUrl = `${backendUrl}/friends`;

  const response = await fetch(targetUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ userId }),
  });

  if (response.ok) {
    return { message: "친구요청을 성공적으로 보냈습니다" };
  }
  if (!response.ok) {
    throw new Error("Failed to friend request");
  }

  return { message: "친구요청을 성공적으로 보냈습니다" };
}

/** 친구 목록 조회 */
export async function getFriends({
  name,
  accountId,
  limit,
}: {
  name: string;
  accountId: string;
  limit: number;
}) {
  const cursor = { name, accountId };
  const backendUrl = validateBackendUrl();
  const token = validateAuth();

  const targetUrl = `${backendUrl}/friends?cursor=${encodeURIComponent(
    JSON.stringify(cursor)
  )}&limit=${limit}`;

  const response = await fetch(targetUrl, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const data: lighty.FriendListResponse = await response.json();
  console.log(data);
  if (!response.ok) {
    throw new Error("친구 목록 조회에 실패하였습니다.");
  }
  return data;
}

/** 친구 요청 수락 */
export async function postAcceptFriend({ friendId }: { friendId: string }) {
  const backendUrl = validateBackendUrl();
  const token = validateAuth();

  const targetUrl = `${backendUrl}/friends/${friendId}/accept`;

  const response = await fetch(targetUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("친구 요청 수락에 실패하였습니다,");
  }
  return { message: "친구 요청을 수락하였습니다" };
}

/** 친구 요청 거절 */
export async function postRejectFriend({ friendId }: { friendId: string }) {
  const backendUrl = validateBackendUrl();
  const token = validateAuth();

  const targetUrl = `${backendUrl}/friends/${friendId}/reject`;

  const response = await fetch(targetUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error("친구 요청 거절에 실패하였습니다.");
  }
  return data || {};
}

/** 받은 친구 요청 목록 조회 */
export async function getReceivedFriendRequestsList({
  name,
  accountId,
  limit,
}: {
  name: string;
  accountId: string;
  limit: number;
}) {
  const cursor = { name, accountId };
  const backendUrl = validateBackendUrl();
  const token = validateAuth();

  const targetUrl = `${backendUrl}/friends/requests/received?cursor=${encodeURIComponent(
    JSON.stringify(cursor)
  )}&limit=${limit}`;

  const response = await fetch(targetUrl, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const data: lighty.FriendRequestListResponse = await response.json();
  if (!response.ok) {
    throw new Error("친구 요청 목록 조회에 실패하였습니다.");
  }
  return data;
}

/** 보낸 친구 요청 목록 조회 */
export async function getSentFriendRequestsList({
  name,
  accountId,
  limit,
}: {
  name: string;
  accountId: string;
  limit: number;
}) {
  const cursor = { name, accountId };
  const backendUrl = validateBackendUrl();
  const token = validateAuth();

  const targetUrl = `${backendUrl}/friends/requests/sent?cursor=${encodeURIComponent(
    JSON.stringify(cursor)
  )}&limit=${limit}`;

  const response = await fetch(targetUrl, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const data: lighty.FriendRequestListResponse = await response.json();
  if (!response.ok) {
    throw new Error("보낸 친구 요청 목록 조회에 실패하였습니다.");
  }
  return data;
}

/** 친구 검색 */
export async function getSearchFriends({
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
  try {
    const cursor = { name, accountId };

    const backendUrl = validateBackendUrl();
    const token = validateAuth();

    const targetUrl = `${backendUrl}/friends/search?cursor=${encodeURIComponent(
      JSON.stringify(cursor)
    )}&limit=${limit}&search=${search}`;

    const response = await fetch(targetUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 400) {
      alert("검색어는 2자 이상 20자 이하만 가능합니다.");
      return;
    }

    if (!response.ok) {
      console.log("친구 검색 중 에러가 발생하였습니다.");
    }

    const data: lighty.FriendListResponse = await response.json();

    return data;
  } catch (error) {
    console.error("Error during login:", error);
  }
}
