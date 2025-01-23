import { ERROR_MESSAGES } from "@/constants/errorMessages";
import STORAGE_KEYS from "@/constants/storageKeys";
import * as lighty from "lighty-type";

// 타입 정의
type PaginationParams = {
  cursor: string;
  limit: number;
  minDate: string;
  maxDate: string;
};

type ApiResponse<T> = {
  data?: T;
  message: string;
  status: number;
};

// API 클래스 정의
class GatheringAPI {
  private static instance: GatheringAPI;
  private baseUrl: string;
  private token: string;

  private constructor() {
    this.baseUrl = this.validateBackendUrl();
    this.token = this.validateAuth();
  }

  static getInstance(): GatheringAPI {
    if (!GatheringAPI.instance) {
      GatheringAPI.instance = new GatheringAPI();
    }
    return GatheringAPI.instance;
  }

  private validateBackendUrl(): string {
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
    if (!backendUrl) {
      throw new Error(ERROR_MESSAGES.NO_BACKEND_URL);
    }
    return backendUrl;
  }

  private validateAuth(): string {
    const token = localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
    if (!token) {
      throw new Error(ERROR_MESSAGES.NO_AUTH);
    }
    return token;
  }

  private async fetchAPI<T>(
    endpoint: string,
    options: RequestInit
  ): Promise<ApiResponse<T>> {
    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        ...options,
        headers: {
          ...options.headers,
          Authorization: `Bearer ${this.token}`,
        },
      });

      const data = response.ok ? await response.json() : null;

      return {
        data,
        message: response.ok ? "성공" : "실패",
        status: response.status,
      };
    } catch (error) {
      console.error("API 요청 실패:", error);
      throw new Error("API 요청 중 오류가 발생했습니다.");
    }
  }

  // Gathering 관련 메소드들
  async getGatherings(
    params: PaginationParams
  ): Promise<lighty.GatheringListResponse> {
    const queryString = new URLSearchParams({
      cursor: params.cursor || "",
      limit: params.limit.toString(),
      minDate: params.minDate,
      maxDate: params.maxDate,
    }).toString();

    const { data, status } = await this.fetchAPI<lighty.GatheringListResponse>(
      `/gatherings?${queryString}`,
      { method: "GET" }
    );

    if (status !== 200 || !data) {
      throw new Error("참여한 그룹 목록 조회를 실패하였습니다.");
    }

    return data;
  }

  async getGatheringDetail(
    gatheringId: string
  ): Promise<lighty.GatheringDetailResponse> {
    if (!gatheringId) {
      throw new Error("약속 ID가 필요합니다.");
    }

    const { data, status } =
      await this.fetchAPI<lighty.GatheringDetailResponse>(
        `/gatherings/${gatheringId}`,
        { method: "GET" }
      );

    if (status !== 200 || !data) {
      throw new Error("그룹 상세 정보 조회를 실패하였습니다.");
    }

    return data;
  }

  async createGathering(
    gathering: lighty.CreateGatheringRequest
  ): Promise<{ message: string }> {
    const { status } = await this.fetchAPI<void>("/gatherings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(gathering),
    });

    if (status === 400) {
      throw new Error(
        "입력값 검증 실패, friendIds에 친구가 아닌 회원이 존재합니다"
      );
    }

    if (status !== 200) {
      throw new Error("약속 생성에 실패하였습니다");
    }

    return { message: "초대장을 성공적으로 발송하였습니다" };
  }

  async uploadInvitationImage(
    file: File
  ): Promise<{ imageUrl: string; message: string }> {
    const formData = new FormData();
    formData.append("file", file);

    const { data, status } = await this.fetchAPI<{ imageUrl: string }>(
      "/gatherings/invitation/image",
      {
        method: "POST",
        body: formData,
      }
    );

    if (status === 400) {
      throw new Error("업로드 가능한 형식의 이미지가 아닙니다.");
    }

    if (status !== 200 || !data) {
      throw new Error("약속 초대장 이미지 업로드에 실패하였습니다.");
    }

    return { ...data, message: "이미지를 성공적으로 업로드하였습니다." };
  }

  // 초대 관련 메소드들
  async handleInvitation(
    invitationId: string,
    action: "accept" | "reject"
  ): Promise<{ message: string }> {
    const { status } = await this.fetchAPI<void>(
      `/gatherings/${invitationId}/${action}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ invitationId }),
      }
    );

    if (status === 400) {
      throw new Error("입력값 검증 실패");
    }

    if (status !== 200) {
      throw new Error(`약속 ${action === "accept" ? "수락" : "거절"} 실패`);
    }

    return {
      message: `약속을 ${
        action === "accept" ? "수락하였습니다" : "성공적으로 거절하였습니다"
      }`,
    };
  }

  async getInvitationList(
    type: "received" | "sent",
    params: PaginationParams
  ): Promise<lighty.GatheringInvitationListResponse> {
    const queryString = new URLSearchParams({
      cursor: params.cursor,
      limit: params.limit.toString(),
      minDate: params.minDate,
      maxDate: params.maxDate,
    }).toString();

    const { data, status } =
      await this.fetchAPI<lighty.GatheringInvitationListResponse>(
        `/gatherings/invitations/${type}?${queryString}`,
        { method: "GET" }
      );

    if (status !== 200 || !data) {
      throw new Error(
        `${type === "received" ? "받은" : "보낸"} 약속 초대 목록 조회 실패`
      );
    }

    return data;
  }
}

// 외부에서 사용할 API 인스턴스
export const gatheringAPI = GatheringAPI.getInstance();

// 편의를 위한 래퍼 함수들
export const getGatherings = (params: PaginationParams) =>
  gatheringAPI.getGatherings(params);

export const getGatheringDetail = (gatheringId: string) =>
  gatheringAPI.getGatheringDetail(gatheringId);

export const postGathering = (gathering: lighty.CreateGatheringRequest) =>
  gatheringAPI.createGathering(gathering);

export const postGatheringInvitationImage = (file: File) =>
  gatheringAPI.uploadInvitationImage(file);

export const postAcceptGatheringInvitation = (invitationId: string) =>
  gatheringAPI.handleInvitation(invitationId, "accept");

export const postRejectGatheringInvitation = (invitationId: string) =>
  gatheringAPI.handleInvitation(invitationId, "reject");

export const getReceivedInvitationToGatheringList = (
  params: PaginationParams
) => gatheringAPI.getInvitationList("received", params);

export const getSentInvitationToGatheringList = (params: PaginationParams) =>
  gatheringAPI.getInvitationList("sent", params);
