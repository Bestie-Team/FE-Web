import STORAGE_KEYS from "@/constants/storageKeys";
import * as lighty from "lighty-type";

/** 친구 요청 */
export async function postFriends({ userId }: { userId: string }) {
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
  if (!backendUrl) {
    throw new Error("백엔드 URL이 설정되지 않았습니다.");
  }
  const targetUrl = `${backendUrl}/friends`;

  const token = localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
  if (!token) {
    throw new Error("로그인이 필요합니다.");
  }

  const response = await fetch(targetUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ userId }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error("Failed to delete group member");
  }

  return data;
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

  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
  if (!backendUrl) {
    throw new Error("백엔드 URL이 설정되지 않았습니다.");
  }
  const targetUrl = `${backendUrl}/friends?cursor=${encodeURIComponent(
    JSON.stringify(cursor)
  )}&limit=${limit}`;

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

  const data: lighty.FriendListResponse = await response.json();
  if (!response.ok) {
    throw new Error("친구 목록 조회에 실패하였습니다.");
  }
  return data;
}

/** 친구 요청 수락 */
export async function postAcceptFriend({ friendId }: { friendId: string }) {
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
  if (!backendUrl) {
    throw new Error("백엔드 URL이 설정되지 않았습니다.");
  }
  const targetUrl = `${backendUrl}/friends/${friendId}/accept`;

  const token = localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
  if (!token) {
    throw new Error("로그인이 필요합니다.");
  }

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
  const data = await response.json();
  return data;
}

/** 친구 요청 거절 */
export async function postRejectFriend({ friendId }: { friendId: string }) {
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
  if (!backendUrl) {
    throw new Error("백엔드 URL이 설정되지 않았습니다.");
  }
  const targetUrl = `${backendUrl}/friends/${friendId}/reject`;

  const token = localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
  if (!token) {
    throw new Error("로그인이 필요합니다.");
  }

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
  return data;
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
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
  if (!backendUrl) {
    throw new Error("백엔드 URL이 설정되지 않았습니다.");
  }
  const targetUrl = `${backendUrl}/friends/requests/received?cursor=${encodeURIComponent(
    JSON.stringify(cursor)
  )}&limit=${limit}`;

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
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
  if (!backendUrl) {
    throw new Error("백엔드 URL이 설정되지 않았습니다.");
  }
  const targetUrl = `${backendUrl}/friends/requests/sent?cursor=${encodeURIComponent(
    JSON.stringify(cursor)
  )}&limit=${limit}`;

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
    if (search === "") return;
    const cursor = { name, accountId };

    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
    if (!backendUrl) {
      throw new Error("백엔드 URL이 설정되지 않았습니다.");
    }
    const targetUrl = `${backendUrl}/friends/search?cursor=${encodeURIComponent(
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
    alert("친구 검색에 실패했습니다.");
    console.error("Error during login:", error);
  }
}
