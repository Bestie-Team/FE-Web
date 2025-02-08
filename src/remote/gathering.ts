import * as lighty from "lighty-type";
import { API_CONFIG, fetchWithAuth } from "./shared";
import { GatheringDetailResponse } from "@/models/gathering";
interface DateIdCursor {
  createdAt: string;
  id: string;
}
type PaginationParams = {
  cursor: DateIdCursor | null;
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
      `${baseUrl}/gatherings?cursor=${encodeURIComponent(
        JSON.stringify(cursor)
      )}&limit=${limit}&minDate=${minDate}&maxDate=${maxDate}`,
      { method: "GET" }
    );
    const data: lighty.GatheringListResponse = await response.json();
    return data;
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : String(error));
  }
}

/** 완료된 약속 목록 조회 */
export async function getGatheringsEnded({
  cursor,
  limit,
  minDate,
  maxDate,
}: PaginationParams) {
  const baseUrl = API_CONFIG.getBaseUrl();
  try {
    const response = await fetchWithAuth(
      `${baseUrl}/gatherings/ended?cursor=${encodeURIComponent(
        JSON.stringify(cursor)
      )}&limit=${limit}&minDate=${minDate}&maxDate=${maxDate}`,
      { method: "GET" }
    );
    const data: lighty.GatheringListResponse = await response.json();
    return data;
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : String(error));
  }
}

/** 피드를 아직 작성하지 않은 약속 목록 조회 */
export async function getGatheringNoFeed({
  cursor,
  limit,
}: Partial<PaginationParams>) {
  const baseUrl = API_CONFIG.getBaseUrl();
  try {
    const response = await fetchWithAuth(
      `${baseUrl}/gatherings/no-feed?cursor=${encodeURIComponent(
        JSON.stringify(cursor)
      )}&limit=${limit}`,
      { method: "GET" }
    );
    const data: lighty.GatheringListResponse = await response.json();
    return data;
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : String(error));
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
    throw new Error(error instanceof Error ? error.message : String(error));
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
    throw new Error(error instanceof Error ? error.message : String(error));
  }
}

/** 피드 수정 */
export async function patchGathering({
  gathering,
  gatheringId,
}: {
  gatheringId: string;
  gathering: Partial<lighty.CreateGatheringRequest>;
}) {
  const baseUrl = API_CONFIG.getBaseUrl();
  const targetUrl = `${baseUrl}/gatherings/${gatheringId}`;
  try {
    await fetchWithAuth(targetUrl, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(gathering),
    });

    return { message: "약속 수정 완료" };
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : String(error));
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
    throw new Error(error instanceof Error ? error.message : String(error));
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
    throw new Error(error instanceof Error ? error.message : String(error));
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
      `${baseUrl}/gatherings/invitations/received?cursor=${encodeURIComponent(
        JSON.stringify(cursor)
      )}&limit=${limit}&minDate=${minDate}&maxDate=${maxDate}`,
      { method: "GET" }
    );
    const data: lighty.GatheringInvitationListResponse = await response.json();
    return data;
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : String(error));
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
      `${baseUrl}/gatherings/invitations/sent?cursor=${encodeURIComponent(
        JSON.stringify(cursor)
      )}&limit=${limit}&minDate=${minDate}&maxDate=${maxDate}`,
      { method: "GET" }
    );
    const data: lighty.GatheringInvitationListResponse = await response.json();
    return data;
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : String(error));
  }
}

/** 모임 삭제 (약속장) */
export async function deleteGathering({
  gatheringId,
}: {
  gatheringId: string;
}) {
  const baseUrl = API_CONFIG.getBaseUrl();
  try {
    const targetUrl = `${baseUrl}/gatherings/${gatheringId}`;
    await fetchWithAuth(targetUrl, { method: "DELETE" });
    return {
      message: "약속을 성공적으로 삭제하였습니다",
    };
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : String(error));
  }
}
