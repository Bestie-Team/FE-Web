import { ERROR_MESSAGES } from "@/constants/errorMessages";
import STORAGE_KEYS from "@/constants/storageKeys";

import * as lighty from "lighty-type";

/** 참여 모임 목록 조회 */
/** 첫 커서는 현재 날짜 */
export async function getGatherings({
  cursor,
  limit,
  minDate,
  maxDate,
}: {
  cursor: string | null;
  limit: number;
  minDate: string;
  maxDate: string;
}) {
  const backendUrl = validateBackendUrl();
  const token = validateAuth();

  const targetUrl = `${backendUrl}/gatherings?cursor=${cursor}&limit=${limit}&minDate=${minDate}&maxDate=${maxDate}`;

  const response = await fetch(targetUrl, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("참여한 그룹 목록 조회를 실패하였습니다,");
  }
  const data: lighty.GatheringListResponse = await response.json();

  return data;
}

/** 모임 상세 조회 */
export async function getGatheringDetail({
  gatheringId,
}: {
  gatheringId: string;
}) {
  if (gatheringId == "") return;
  const backendUrl = validateBackendUrl();
  const token = validateAuth();

  const targetUrl = `${backendUrl}/gatherings/${gatheringId}`;

  const response = await fetch(targetUrl, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("그룹 상세 정보 조회를 실패하였습니다,");
  }
  const data: lighty.GatheringDetailResponse = await response.json();

  return data;
}

export async function postGathering({
  gathering,
}: {
  gathering: lighty.CreateGatheringRequest;
}) {
  const backendUrl = validateBackendUrl();
  const token = validateAuth();

  const targetUrl = `${backendUrl}/gatherings`;
  const response = await makePostRequest(targetUrl, token, gathering);

  if (response.ok) {
    return { message: "모임을 성공적으로 생성하였습니다." };
  }
  if (response.status === 400) {
    console.log("입력값 검증 실패, friendIds에 친구가 아닌 회원이 존재합니다");
  }

  if (!response.ok) {
    throw new Error(`모임 생성에 실패하였습니다`);
  }

  return response.json();
}

export async function postGatheringInvitationImage({ file }: { file: File }) {
  const backendUrl = validateBackendUrl();
  const token = validateAuth();

  const targetUrl = `${backendUrl}/gatherings/invitation/image`;

  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch(targetUrl, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  if (response.status === 400) {
    console.log("업로드 가능한 형식의 이미지가 아닙니다.");
  }

  if (!response.ok) {
    throw new Error(`모임 초대장 이미지 업로드에 실패하였습니다.`);
  }

  const data: { imageUrl: string } = await response.json();

  return { ...data, message: "이미지를 성공적으로 업로드하였습니다." };
}

export async function postAcceptGatheringInvitation({
  invitationId,
}: {
  invitationId: string;
}) {
  const backendUrl = validateBackendUrl();
  const token = validateAuth();

  const targetUrl = `${backendUrl}/gatherings/${invitationId}/accept`;

  const response = await makePostRequest(targetUrl, token, { invitationId });

  if (response.ok) {
    return { message: "모임을 수락하였습니다." };
  }
  if (response.status === 400) {
    throw new Error(`입력값 검증 실패`);
  }
  if (!response.ok) {
    throw new Error(`모임 수락 실패`);
  }
  return { message: "모임을 수락하였습니다." };
}

export async function postRejectGatheringInvitation({
  invitationId,
}: {
  invitationId: string;
}) {
  const backendUrl = validateBackendUrl();
  const token = validateAuth();

  const targetUrl = `${backendUrl}/gatherings/${invitationId}/reject`;

  const response = await makePostRequest(targetUrl, token, { invitationId });

  if (response.ok) {
    return { message: "모임을 성공적으로 거절하였습니다." };
  }
  if (response.status === 400) {
    throw new Error(`입력값 검증 실패`);
  }
  if (!response.ok) {
    throw new Error(`모임 거절 실패`);
  }
  return { message: "모임을 성공적으로 거절하였습니다." };
}

/** 받은 모임 초대 목록 조회 */
/** 첫 커서는 현재 날짜 */
export async function getReceivedInvitationToGatheringList({
  cursor,
  limit,
  minDate,
  maxDate,
}: {
  cursor: string;
  limit: number;
  minDate: string;
  maxDate: string;
}) {
  const backendUrl = validateBackendUrl();
  const token = validateAuth();

  const targetUrl = `${backendUrl}/gatherings/invitations/received?cursor=${cursor}&limit=${limit}&minDate=${minDate}&maxDate=${maxDate}`;

  const response = await makeGetRequest(targetUrl, token);

  if (response.status === 400) {
    throw new Error(`받은 모임 초대 목록 조회 실패`);
  }
  if (!response.ok) {
    throw new Error(`받은 모임 초대 목록 조회 실패`);
  }
  const data: lighty.GatheringInvitationListResponse = await response.json();

  return data;
}

/** 보낸 모임 초대 목록 조회 */
/** 첫 커서는 현재 날짜 */
export async function getSentInvitationToGatheringList({
  cursor,
  limit,
  minDate,
  maxDate,
}: {
  cursor: string;
  limit: number;
  minDate: string;
  maxDate: string;
}) {
  const backendUrl = validateBackendUrl();
  const token = validateAuth();

  const targetUrl = `${backendUrl}/gatherings/invitations/sent?cursor=${cursor}&limit=${limit}&minDate=${minDate}&maxDate=${maxDate}`;

  const response = await makeGetRequest(targetUrl, token);

  if (response.status === 400) {
    throw new Error(`보낸 모임 초대 목록 조회 실패`);
  }
  if (!response.ok) {
    throw new Error(`보낸 모임 초대 목록 조회 실패`);
  }
  const data: lighty.GatheringInvitationListResponse = await response.json();

  return data;
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
    | lighty.CreateGatheringRequest
    | { invitationId: string }
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
