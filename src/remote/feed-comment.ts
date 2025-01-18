import { ERROR_MESSAGES } from "@/constants/errorMessages";
import STORAGE_KEYS from "@/constants/storageKeys";

/** 피드 댓글 작성*/
export async function postMakeComment({
  feedId,
  content,
}: {
  feedId: string;
  content: string;
}) {
  const backendUrl = validateBackendUrl();
  const token = validateAuth();

  const response = await makePostRequest(
    `${backendUrl}/feed-comments`,
    token,
    feedId,
    content
  );

  if (response.ok) {
    return { message: "피드 댓글을 성공적으로 작성하였습니다." };
  }

  return handleResponse(response);
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
  feedId: string,
  content: string
): Promise<Response> {
  const targetUrl = `${backendUrl}`;

  return fetch(targetUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ feedId, content }),
  });
}

async function makePatchRequest(
  backendUrl: string,
  token: string,
  content: { content: string }
): Promise<Response> {
  const targetUrl = `${backendUrl}`;

  return fetch(targetUrl, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(content),
  });
}

async function makeUploadRequest(
  backendUrl: string,
  token: string,
  formData: FormData
): Promise<Response> {
  const targetUrl = `${backendUrl}`;

  return fetch(targetUrl, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });
}

async function handleResponse(response: Response) {
  const errorMap: Record<number, string> = {
    404: ERROR_MESSAGES.NOT_FOUND,
    409: ERROR_MESSAGES.CONFLICT,
    422: ERROR_MESSAGES.INVALID_STATE,
  };

  const errorMessage = errorMap[response.status] || ERROR_MESSAGES.DEFAULT;
  console.error(`피드 생성 오류: ${errorMessage}`);
  throw new Error(errorMessage);
}
