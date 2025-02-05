import * as lighty from "lighty-type";
import { API_CONFIG, fetchWithAuth } from "./shared";

/** 친구 요청 */
export async function postFriends({ userId }: { userId: string }) {
  const baseUrl = API_CONFIG.getBaseUrl();
  try {
    const targetUrl = `${baseUrl}/friends`;
    const response = await fetchWithAuth(targetUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId }),
    });
    console.log(response);
    return { message: "친구 요청을 성공적으로 보냈습니다" };
  } catch (error) {
    console.log(error);
    throw new Error("Failed to friend request");
  }
}

/** 친구 요청 */
export async function deleteFriend({ friendId }: { friendId: string }) {
  const baseUrl = API_CONFIG.getBaseUrl();
  try {
    const targetUrl = `${baseUrl}/friends?userId=${friendId}`;
    const response = await fetchWithAuth(targetUrl, {
      method: "DELETE",
    });
    console.log(response);
    return { message: "친구를 삭제했어요" };
  } catch (error) {
    console.log(error);
    throw new Error("Failed to delete friend");
  }
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
  const baseUrl = API_CONFIG.getBaseUrl();
  const targetUrl = `${baseUrl}/friends?cursor=${encodeURIComponent(
    JSON.stringify(cursor)
  )}&limit=${limit}`;

  try {
    const response = await fetchWithAuth(targetUrl, {
      method: "GET",
    });
    const data: lighty.FriendListResponse = await response.json();
    return data;
  } catch (error) {
    console.log(error);
    throw new Error("친구 목록 조회에 실패하였습니다");
  }
}

/** 친구 요청 수락 */
export async function postAcceptFriend({ friendId }: { friendId: string }) {
  const baseUrl = API_CONFIG.getBaseUrl();
  const targetUrl = `${baseUrl}/friends/${friendId}/accept`;

  try {
    const response = await fetchWithAuth(targetUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(response);
    return { message: "친구 요청을 수락하였습니다" };
  } catch (error) {
    console.log(error);
    throw new Error("친구 요청 수락에 실패하였습니다");
  }
}

/** 친구 요청 거절 */
export async function postRejectFriend({ friendId }: { friendId: string }) {
  const baseUrl = API_CONFIG.getBaseUrl();
  try {
    const targetUrl = `${baseUrl}/friends/${friendId}/reject`;

    await fetchWithAuth(targetUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    return { message: "친구 요청을 성공적으로 거절했습니다" };
  } catch (error) {
    console.log(error);
    throw new Error("친구 요청 거절에 실패하였습니다");
  }
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
  const baseUrl = API_CONFIG.getBaseUrl();

  try {
    const targetUrl = `${baseUrl}/friends/requests/received?cursor=${encodeURIComponent(
      JSON.stringify(cursor)
    )}&limit=${limit}`;

    const response = await fetchWithAuth(targetUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data: lighty.FriendRequestListResponse = await response.json();

    return data;
  } catch (error) {
    console.log(error);
    throw new Error("친구 요청 목록 조회에 실패하였습니다");
  }
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
  const baseUrl = API_CONFIG.getBaseUrl();

  try {
    const targetUrl = `${baseUrl}/friends/requests/sent?cursor=${encodeURIComponent(
      JSON.stringify(cursor)
    )}&limit=${limit}`;

    const response = await fetchWithAuth(targetUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data: lighty.FriendRequestListResponse = await response.json();
    return data;
  } catch (error) {
    console.log(error);
    throw new Error("보낸 친구 요청 목록 조회에 실패하였습니다");
  }
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
  const cursor = { name, accountId };
  const baseUrl = API_CONFIG.getBaseUrl();
  try {
    const targetUrl = `${baseUrl}/friends/search?cursor=${encodeURIComponent(
      JSON.stringify(cursor)
    )}&limit=${limit}&search=${search}`;

    const response = await fetchWithAuth(targetUrl, {
      method: "GET",
    });

    const data: lighty.FriendListResponse = await response.json();
    return data;
  } catch (error) {
    if (error instanceof Response && error.status === 400) {
      throw new Error("검색어는 2자 이상 20자 이하만 가능합니다");
    }
    throw new Error("친구 검색 중 에러가 발생하였습니다");
  }
}
