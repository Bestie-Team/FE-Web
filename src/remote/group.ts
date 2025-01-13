import STORAGE_KEYS from "@/constants/storageKeys";
import * as lighty from "lighty-type";

export async function postGroupCoverImage({ file }: { file: string }) {
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
  if (!backendUrl) {
    throw new Error("백엔드 URL이 설정되지 않았습니다.");
  }
  const targetUrl = `${backendUrl}/groups/cover/image`;

  const formData = new FormData();
  formData.append("file", file);

  const token = localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
  if (!token) {
    throw new Error("로그인이 필요합니다.");
  }

  const response = await fetch(targetUrl, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  const data: { imageUrl: string } = await response.json();

  if (response.status === 400) {
    throw new Error("지원하지 않는 파일 형식입니다.");
  }

  if (response.status === 413) {
    throw new Error("업로드 가능한 파일 사이즈를 초과하였습니다.");
  }

  if (!response.ok) {
    throw new Error("Failed to delete group member");
  }

  return data.imageUrl;
}

/** 그룹 생성 */
export async function postGroup({
  group,
}: {
  group: lighty.CreateGroupRequest;
}) {
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
  if (!backendUrl) {
    throw new Error("백엔드 URL이 설정되지 않았습니다.");
  }
  const targetUrl = `${backendUrl}/groups`;

  const token = localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
  if (!token) {
    throw new Error("로그인이 필요합니다.");
  }

  const response = await fetch(targetUrl, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(group),
  });
  if (response.status === 400) {
    throw new Error("친구가 아닌 회원이 존재합니다.");
  }

  if (!response.ok) {
    throw new Error("그룹 생성에 실패하였습니다.");
  }

  const data = await response.json();
  return data;
}

/** 참여 그룹 목록 조회 */
/** 첫 커서는 현재 날짜 */
export async function getGroups({
  cursor,
  limit,
}: {
  cursor: string;
  limit: number;
}) {
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
  if (!backendUrl) {
    throw new Error("백엔드 URL이 설정되지 않았습니다.");
  }
  const targetUrl = `${backendUrl}/groups?cursor=${cursor}&limit=${limit}`;

  const token = localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
  if (!token) {
    throw new Error("로그인이 필요합니다.");
  }

  const response = await fetch(targetUrl, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("참여한 그룹 목록 조회를 실패하였습니다,");
  }
  const data: lighty.GroupListResponse = await response.json();

  return data;
}

/** 그룹원 추가 */
export async function postGroupMember({ groupId }: { groupId: string }) {
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
  if (!backendUrl) {
    throw new Error("백엔드 URL이 설정되지 않았습니다.");
  }
  const targetUrl = `${backendUrl}/groups/${groupId}/members`;

  const token = localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
  if (!token) {
    throw new Error("로그인이 필요합니다.");
  }

  const response = await fetch(targetUrl, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ groupId }),
  });

  const data: { userId: string } = await response.json();
  if (!response.ok) {
    throw new Error("그룹원 추가에 실패하였습니다.");
  }
  return data;
}

/** 그룹 나가기 */
export async function deleteGroupMember({ groupId }: { groupId: string }) {
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
  if (!backendUrl) {
    throw new Error("백엔드 URL이 설정되지 않았습니다.");
  }
  const targetUrl = `${backendUrl}/groups/${groupId}/members`;

  const token = localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
  if (!token) {
    throw new Error("로그인이 필요합니다.");
  }

  const response = await fetch(targetUrl, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    throw new Error("그룹 나기기에 실패하였습니다.");
  }
  return response.json();
}

/** 그룹 삭제 (그룹장) */
export async function deleteGroup({ groupId }: { groupId: string }) {
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
  if (!backendUrl) {
    throw new Error("백엔드 URL이 설정되지 않았습니다.");
  }
  const targetUrl = `${backendUrl}/groups/${groupId}`;

  const token = localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
  if (!token) {
    throw new Error("로그인이 필요합니다.");
  }

  const response = await fetch(targetUrl, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("그룹 삭제에 실패하였습니다");
  }
  return response.json();
}
