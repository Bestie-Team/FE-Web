import * as lighty from "lighty-type";
import { API_CONFIG, fetchWithAuth } from "./shared";
import { GatheringDetailResponse } from "@/models/gathering";

type PaginationParams = {
  cursor: string | null;
  limit: number;
  minDate: string;
  maxDate: string;
};

/** 참여 약속 목록 조회 */
export async function getGatherings({
  cursor,
  limit,
  minDate,
  maxDate,
}: PaginationParams) {
  const baseUrl = API_CONFIG.getBaseUrl();
  try {
    const response = await fetchWithAuth(
      `${baseUrl}/gatherings?cursor=${cursor}&limit=${limit}&minDate=${minDate}&maxDate=${maxDate}`,
      { method: "GET" }
    );
    const data: lighty.GatheringListResponse = await response.json();
    return data;
  } catch (error) {
    if (error instanceof Response) {
      throw new Error("약속 조회를 실패하였습니다");
    }
  }
}

/** 약속 상세 조회 */
export async function getGatheringDetail({
  gatheringId,
}: {
  gatheringId: string;
}) {
  if (!gatheringId) return;

  const baseUrl = API_CONFIG.getBaseUrl();
  const response = await fetchWithAuth(`${baseUrl}/gatherings/${gatheringId}`, {
    method: "GET",
  });
  const data: GatheringDetailResponse = await response.json();
  return data;
}

/** 약속 생성 */
export async function postGathering({
  gathering,
}: {
  gathering: lighty.CreateGatheringRequest;
}) {
  const baseUrl = API_CONFIG.getBaseUrl();

  try {
    const response = await fetchWithAuth(`${baseUrl}/gatherings`, {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify(gathering),
    });
    console.log(response);
    return { message: "초대장을 성공적으로 발송하였습니다" };
  } catch (error) {
    if (error instanceof Response && error.status === 400) {
      throw new Error(
        "입력값 검증 실패, friendIds에 친구가 아닌 회원이 존재합니다"
      );
    }
    throw new Error("약속 생성에 실패하였습니다");
  }
}

/** 약속 초대장 이미지 업로드 */
export async function postGatheringInvitationImage({ file }: { file: File }) {
  const baseUrl = API_CONFIG.getBaseUrl();
  const formData = new FormData();
  formData.append("file", file);

  try {
    const response = await fetchWithAuth(
      `${baseUrl}/gatherings/invitation/image`,
      {
        method: "POST",
        body: formData,
      }
    );

    if (!response.ok) {
      if (response.status === 400) {
        throw new Error("업로드 가능한 형식의 이미지가 아닙니다");
      }
      throw new Error("약속 초대장 이미지 업로드에 실패하였습니다");
    }

    const data = await response.json();
    return { ...data, message: "이미지를 성공적으로 업로드하였습니다" };
  } catch (error) {
    if (error instanceof Error) throw error;
    throw new Error("이미지 업로드 중 오류가 발생했습니다");
  }
}

/** 약속 초대 수락 */
export async function postAcceptGatheringInvitation({
  invitationId,
}: {
  invitationId: string;
}) {
  const baseUrl = API_CONFIG.getBaseUrl();

  try {
    await fetchWithAuth(`${baseUrl}/gatherings/${invitationId}/accept`, {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify({ invitationId }),
    });

    return { message: "약속을 수락하였습니다" };
  } catch (error) {
    if (error instanceof Response && error.status === 400) {
      throw new Error("입력값 검증 실패");
    }
    throw new Error("약속 수락 실패");
  }
}

/** 약속 초대 거절 */
export async function postRejectGatheringInvitation({
  invitationId,
}: {
  invitationId: string;
}) {
  const baseUrl = API_CONFIG.getBaseUrl();

  try {
    await fetchWithAuth(`${baseUrl}/gatherings/${invitationId}/reject`, {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify({ invitationId }),
    });

    return { message: "약속을 성공적으로 거절하였습니다" };
  } catch (error) {
    if (error instanceof Response && error.status === 400) {
      throw new Error("입력값 검증 실패");
    }
    throw new Error("약속 거절 실패");
  }
}

/** 받은 약속 초대 목록 조회 */
export async function getReceivedInvitationToGatheringList({
  cursor,
  limit,
  minDate,
  maxDate,
}: PaginationParams) {
  const baseUrl = API_CONFIG.getBaseUrl();

  try {
    const response = await fetchWithAuth(
      `${baseUrl}/gatherings/invitations/received?cursor=${cursor}&limit=${limit}&minDate=${minDate}&maxDate=${maxDate}`,
      { method: "GET" }
    );

    return response.json();
  } catch {
    throw new Error("받은 약속 초대 목록 조회 실패");
  }
}

/** 보낸 약속 초대 목록 조회 */
export async function getSentInvitationToGatheringList({
  cursor,
  limit,
  minDate,
  maxDate,
}: PaginationParams) {
  const baseUrl = API_CONFIG.getBaseUrl();

  try {
    const response = await fetchWithAuth(
      `${baseUrl}/gatherings/invitations/sent?cursor=${cursor}&limit=${limit}&minDate=${minDate}&maxDate=${maxDate}`,
      { method: "GET" }
    );

    return response.json();
  } catch {
    throw new Error("보낸 약속 초대 목록 조회 실패");
  }
}
