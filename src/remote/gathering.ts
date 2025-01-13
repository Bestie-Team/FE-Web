import STORAGE_KEYS from "@/constants/storageKeys";
import {
  GatheringInfo,
  GatheringInvitationListResponse,
} from "@/models/gathering";
import makeUTC from "@/utils/makeUTC";

export async function postGathering({
  gathering,
}: {
  gathering: GatheringInfo;
}) {
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
  if (!backendUrl) {
    throw new Error("백엔드 URL이 설정되지 않았습니다.");
  }
  const targetUrl = `${backendUrl}/gatherings`;
  const concatDate = makeUTC({
    ampm: gathering.ampm,
    date: gathering.date,
    time: gathering.time,
  });

  const newGathering = { ...gathering, gatheringDate: concatDate };

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
    body: JSON.stringify(newGathering),
  });
  if (response.status === 400) {
    console.log("입력값 검증 실패, friendIds에 친구가 아닌 회원이 존재합니다");
  }

  if (!response.ok) {
    throw new Error(`모임 생성에 실패하였습니다`);
  }

  return response.json();
}

export async function postGatheringInvitationImage({ file }: { file: string }) {
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
  if (!backendUrl) {
    throw new Error("백엔드 URL이 설정되지 않았습니다.");
  }

  const targetUrl = `${backendUrl}/gatherings/invitation/image`;

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

  if (response.status === 400) {
    console.log("업로드 가능한 형식의 이미지가 아닙니다.");
  }

  if (!response.ok) {
    throw new Error(`모임 초대장 이미지 업로드에 실패하였습니다.`);
  }

  const data: { imageUrl: string } = await response.json();

  return data.imageUrl;
}

export async function postAcceptGatheringInvitation({
  invitationId,
}: {
  invitationId: string;
}) {
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
  if (!backendUrl) {
    throw new Error("백엔드 URL이 설정되지 않았습니다.");
  }
  const targetUrl = `${backendUrl}/gatherings/${invitationId}/accept`;

  const token = localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
  if (!token) {
    throw new Error("로그인이 필요합니다.");
  }
  const response = await fetch(targetUrl, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (response.ok) {
    alert("모임을 수락하였습니다.");
    return;
  }
  if (response.status === 400) {
    throw new Error(`입력값 검증 실패`);
  }
  if (!response.ok) {
    throw new Error(`모임 수락 실패`);
  }
  return;
}

export async function postRejectGatheringInvitation({
  invitationId,
}: {
  invitationId: string;
}) {
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
  if (!backendUrl) {
    throw new Error("백엔드 URL이 설정되지 않았습니다.");
  }
  const targetUrl = `${backendUrl}/gatherings/${invitationId}/reject`;

  const token = localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
  if (!token) {
    throw new Error("로그인이 필요합니다.");
  }

  const response = await fetch(targetUrl, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (response.ok) {
    alert("모임을 거절하였습니다.");
    return;
  }
  if (response.status === 400) {
    throw new Error(`입력값 검증 실패`);
  }
  if (!response.ok) {
    throw new Error(`모임 거절 실패`);
  }

  return;
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
  limit: string;
  minDate: string;
  maxDate: string;
}) {
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
  if (!backendUrl) {
    throw new Error("백엔드 URL이 설정되지 않았습니다.");
  }
  const targetUrl = `${backendUrl}/gatherings/invitations/received?cursor=${cursor}&limit=${limit}&minDate=${minDate}&maxDate=${maxDate}`;

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

  if (response.status === 400) {
    throw new Error(`받은 모임 초대 목록 조회 실패`);
  }
  if (!response.ok) {
    throw new Error(`받은 모임 초대 목록 조회 실패`);
  }
  const data: GatheringInvitationListResponse = await response.json();

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
  limit: string;
  minDate: string;
  maxDate: string;
}) {
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
  if (!backendUrl) {
    throw new Error("백엔드 URL이 설정되지 않았습니다.");
  }
  const targetUrl = `${backendUrl}/gatherings/invitations/sent?cursor=${cursor}&limit=${limit}&minDate=${minDate}&maxDate=${maxDate}`;

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

  if (response.status === 400) {
    throw new Error(`보낸 모임 초대 목록 조회 실패`);
  }
  if (!response.ok) {
    throw new Error(`보낸 모임 초대 목록 조회 실패`);
  }
  const data: GatheringInvitationListResponse = await response.json();

  return data;
}
