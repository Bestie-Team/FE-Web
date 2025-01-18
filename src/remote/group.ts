import { ERROR_MESSAGES } from "@/constants/errorMessages";
import STORAGE_KEYS from "@/constants/storageKeys";
import * as lighty from "lighty-type";

export async function postGroupCoverImage({ file }: { file: File }) {
  const backendUrl = validateBackendUrl();
  const token = validateAuth();

  const targetUrl = `${backendUrl}/groups/cover/image`;

  const formData = new FormData();
  formData.append("file", file);

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

  return {
    url: data.imageUrl,
    message: "그룹이미지를 성공적으로 업로드하였습니다.",
  };
}

/** 그룹 생성 */
export async function postGroup({
  group,
}: {
  group: lighty.CreateGroupRequest;
}) {
  const backendUrl = validateBackendUrl();
  const token = validateAuth();

  const targetUrl = `${backendUrl}/groups`;
  const response = await makePostRequest(targetUrl, token, group);

  if (response.status === 201) {
    return { message: "그룹 생성 성공" };
  }
  if (response.status === 400) {
    throw new Error("친구가 아닌 회원이 존재합니다.");
  }

  if (!response.ok) {
    throw new Error("그룹 생성에 실패하였습니다.");
  }
  const data = await response.json();
  return { message: "그룹 생성 성공", data };
}

/** 참여 그룹 목록 조회 */
/** 첫 커서는 현재 날짜 */
export async function getGroups({
  cursor,
  limit,
}: {
  cursor: string | null;
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
  const response = await makeGetRequest(targetUrl, token);

  if (!response.ok) {
    throw new Error("참여한 그룹 목록 조회를 실패하였습니다,");
  }
  const data: lighty.GroupListResponse = await response.json();

  return data;
}

/** 그룹원 추가 */
export async function postGroupMember({
  groupId,
  userIds,
}: {
  groupId: string;
  userIds: string[];
}) {
  const backendUrl = validateBackendUrl();
  const token = validateAuth();

  const targetUrl = `${backendUrl}/groups/${groupId}/members`;

  const response = await makePostRequest(targetUrl, token, { userIds });

  if (response.ok) {
    return {
      message: "그룹원을 성공적으로 추가하였습니다",
    };
  }
  if (!response.ok) {
    throw new Error("그룹원 추가에 실패하였습니다.");
  }
  return {
    message: "그룹원을 성공적으로 추가하였습니다",
  };
}

/** 그룹 나가기 */
export async function deleteGroupMember({ groupId }: { groupId: string }) {
  const backendUrl = validateBackendUrl();
  const token = validateAuth();

  const targetUrl = `${backendUrl}/groups/${groupId}/members`;

  const response = await fetch(targetUrl, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (response.ok) {
    return { message: "그룹에 성공적으로 나갔습니다." };
  }
  if (!response.ok) {
    throw new Error("그룹 나기기에 실패하였습니다.");
  }
  return { message: "그룹에서 성공적으로 나갔습니다." };
}

/** 그룹 삭제 (그룹장) */
export async function deleteGroup({ groupId }: { groupId: string }) {
  const backendUrl = validateBackendUrl();
  const token = validateAuth();

  const targetUrl = `${backendUrl}/groups/${groupId}`;

  const response = await fetch(targetUrl, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (response.ok) {
    return {
      message: "그룹을 성공적으로 삭제하였습니다.",
    };
  }
  if (!response.ok) {
    throw new Error("그룹 삭제에 실패하였습니다");
  }
  return {
    message: "그룹을 성공적으로 삭제하였습니다.",
  };
}

function validateBackendUrl(): string {
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
  if (!backendUrl) {
    throw new Error(ERROR_MESSAGES.NO_BACKEND_URL);
  }
  return backendUrl;
}

function validateAuth(): string {
  const token = localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
  if (!token) {
    throw new Error(ERROR_MESSAGES.NO_AUTH);
  }
  return token;
}

async function makePostRequest(
  backendUrl: string,
  token: string,
  body:
    | {
        groupId: string;
        userIds: string[];
      }
    | { userIds: string[] }
    | lighty.CreateGroupRequest
    | {
        cursor: string;
        limit: number;
        minDate: string;
        maxDate: string;
      }
): Promise<Response> {
  const targetUrl = `${backendUrl}`;

  return fetch(targetUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  });
}

async function makeGetRequest(
  backendUrl: string,
  token: string
): Promise<Response> {
  const targetUrl = `${backendUrl}`;

  return fetch(targetUrl, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
}
