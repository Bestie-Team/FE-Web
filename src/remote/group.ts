import * as lighty from "lighty-type";
import { API_CONFIG, fetchWithAuth } from "./shared";
import { CreateGroupRequest } from "@/models/group";

export async function postGroupCoverImage({ file }: { file: File }) {
  const baseUrl = API_CONFIG.getBaseUrl();
  try {
    const targetUrl = `${baseUrl}/groups/cover/image`;
    const formData = new FormData();
    formData.append("file", file);

    const response = await fetchWithAuth(targetUrl, {
      method: "POST",
      body: formData,
    });
    if (response.ok) {
      const data: { imageUrl: string } = await response.json();
      return {
        url: data.imageUrl,
        message: "그룹이미지를 성공적으로 업로드하였습니다",
      };
    }
  } catch (error) {
    if (error instanceof Response && error.status === 400) {
      throw new Error("지원하지 않는 파일 형식입니다");
    }
    if (error instanceof Response && error.status === 413) {
      throw new Error("업로드 가능한 파일 사이즈를 초과하였습니다");
    }
    throw new Error("Failed to upload group cover Image");
  }
}

/** 그룹 생성 */
export async function postGroup({ group }: { group: CreateGroupRequest }) {
  const baseUrl = API_CONFIG.getBaseUrl();
  const targetUrl = `${baseUrl}/groups`;
  try {
    await fetchWithAuth(targetUrl, {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify(group),
    });
    return { message: "그룹을 성공적으로 만들었어요" };
  } catch (error) {
    if (error instanceof Response && error.status === 400) {
      throw new Error("친구가 아닌 회원이 존재합니다");
    }
    throw new Error("그룹 생성에 실패하였습니다");
  }
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
  const baseUrl = API_CONFIG.getBaseUrl();
  const targetUrl = `${baseUrl}/groups?cursor=${cursor}&limit=${limit}`;
  try {
    const response = await fetchWithAuth(targetUrl, {
      method: "GET",
    });
    const data: lighty.GroupListResponse = await response.json();
    return data;
  } catch (e) {
    console.log(e);
    throw new Error("참여한 그룹 목록 조회를 실패하였습니다");
  }
}

/** 그룹원 추가 */
export async function postGroupMember({
  groupId,
  userIds,
}: {
  groupId: string;
  userIds: string[];
}) {
  const baseUrl = API_CONFIG.getBaseUrl();
  const targetUrl = `${baseUrl}/groups/${groupId}/members`;
  try {
    const response = await fetchWithAuth(targetUrl, {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify(userIds),
    });
    console.log(response);
    return { message: "그룹원을 성공적으로 추가하였습니다" };
  } catch (e) {
    console.log(e);
    throw new Error("그룹원 추가를 실패하였습니다");
  }
}

/** 그룹 나가기 */
export async function deleteGroupMember({ groupId }: { groupId: string }) {
  const baseUrl = API_CONFIG.getBaseUrl();
  try {
    const targetUrl = `${baseUrl}/groups/${groupId}/members`;
    const response = await fetchWithAuth(targetUrl, {
      method: "DELETE",
    });
    console.log(response);
    return { message: "그룹에서 성공적으로 나갔습니다" };
  } catch (error) {
    console.log(error);
    throw new Error("그룹 나기기에 실패하였습니다");
  }
}

/** 그룹 삭제 (그룹장) */
export async function deleteGroup({ groupId }: { groupId: string }) {
  const baseUrl = API_CONFIG.getBaseUrl();
  try {
    const targetUrl = `${baseUrl}/groups/${groupId}`;
    const response = await fetchWithAuth(targetUrl, { method: "DELETE" });
    console.log(response);
    return {
      message: "그룹을 성공적으로 삭제하였습니다",
    };
  } catch (error) {
    console.log(error);
    return {
      message: "그룹을 삭제하지 못했어요",
    };
  }
}

/** 그룹 나가기 (그룹원) */
export async function exitGroup({ groupId }: { groupId: string }) {
  const baseUrl = API_CONFIG.getBaseUrl();
  try {
    const targetUrl = `${baseUrl}/groups/${groupId}/members`;
    const response = await fetchWithAuth(targetUrl, { method: "DELETE" });
    console.log(response);
    return {
      message: "그룹을 성공적으로 나갔습니다",
    };
  } catch (error) {
    console.log(error);
    return {
      message: "그룹을 나가지 못했어요",
    };
  }
}
