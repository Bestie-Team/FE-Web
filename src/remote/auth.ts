import * as lighty from "lighty-type";
import {
  patchProfileImageWithToken,
  postProfileImageWithToken,
} from "./profile";
import STORAGE_KEYS from "@/constants/storageKeys";
import { API_CONFIG } from "./shared";
import { RegisterRequestType } from "@/components/shared/AddPhoto";
import { Providers } from "@/constants/oAuthButtons";
import { KakaoAuthResponse } from "@/models/user";
import { v4 as uuidv4 } from "uuid";
import { apiClient } from "./api";

export const storeAuthData = (accessToken: string, userInfo: object) => {
  localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, accessToken);
  sessionStorage.setItem(STORAGE_KEYS.USER_INFO, JSON.stringify(userInfo));
};

// export async function postLogin({
//   accessToken,
//   provider,
// }: lighty.LoginRequest & { provider: Providers }) {
//   const baseUrl = API_CONFIG.getBaseUrl();
// const uuid = uuidv4();
//   localStorage.setItem(STORAGE_KEYS.DEVICE_ID, uuid);

//   const targetUrl = `${baseUrl}/auth/${provider}/login`;

//   let response;
//   let data;

//   try {
//     response = await fetch(targetUrl, {
//       method: "POST",
//       credentials: "include",
//       headers: {
//         "Content-Type": "application/json",
//         "Device-Id": uuid,
//       },
//       body: JSON.stringify({ accessToken }),
//     });

//     data = await response.json();
//   } catch (err) {
//     console.error("로그인 API 네트워크 에러", err);
//     throw new Error(
//       "네트워크 오류가 발생했습니다. 잠시 후 다시 시도해 주세요."
//     );
//   }

//   if (response.ok) {
//     storeAuthData(data.accessToken, {
//       accountId: data.accountId,
//       profileImageUrl: data.profileImageUrl,
//     });
//     window.location.href = "/feed";
//     return data;
//   }

//   switch (response.status) {
//     case 404:
//       const user_oauth_info: lighty.LoginFailResponse = data;
//       sessionStorage.setItem(
//         STORAGE_KEYS.OAUTH_DATA,
//         JSON.stringify(user_oauth_info)
//       );
//       window.location.href = "/signup";
//       break;

//     case 409:
//       throw new Error(
//         `다른 플랫폼으로 가입된 계정입니다. 해당 플랫폼으로 로그인해 주세요.`
//       );

//     case 401:
//       throw new Error("인증 토큰이 유효하지 않습니다. 다시 로그인해 주세요.");

//     case 500:
//       throw new Error("서버 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.");

//     default:
//       console.log(response, "로그인 처리 중 문제가 발생했습니다.");
//       throw new Error("로그인 처리 중 문제가 발생했습니다.");
//   }
// }

export async function postLogin({
  accessToken,
  provider,
  deviceId,
}: lighty.LoginRequest & { provider: Providers; deviceId: string }) {
  const baseUrl = API_CONFIG.getBaseUrl();
  const targetUrl = `${baseUrl}/auth/${provider}/login`;

  const response = await fetch(targetUrl, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      "Device-Id": deviceId,
    },
    body: JSON.stringify({ accessToken }),
  });

  let data: lighty.LoginResponse;
  try {
    data = await response.json();
  } catch {
    throw new Error("서버 응답을 파싱하는 데 실패했습니다.");
  }

  return { data, response };
}

export async function registerUser(RegisterRequest: RegisterRequestType) {
  if (!RegisterRequest.accountId || !RegisterRequest.name) {
    throw new Error("이름과 아이디가 유효하지 않습니다");
  }

  try {
    const baseUrl = API_CONFIG.getBaseUrl();

    let deviceId = localStorage.getItem(STORAGE_KEYS.DEVICE_ID);

    if (deviceId == null) {
      deviceId = uuidv4();
      localStorage.setItem(STORAGE_KEYS.DEVICE_ID, deviceId);
    }

    const response = await fetch(`${baseUrl}/auth/register`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json", "Device-Id": deviceId },
      body: JSON.stringify({
        ...RegisterRequest,
        profileImageUrl: null,
      }),
    });

    if (!response.ok) {
      throw new Error("회원가입에 실패했습니다");
    }

    const data: lighty.RegisterResponse = await response.json();

    let profileImageUrl: string | null = null;
    if (RegisterRequest.profileImageUrl) {
      const uploadResult = await postProfileImageWithToken({
        token: data.accessToken,
        file: RegisterRequest.profileImageUrl as File,
      });
      profileImageUrl = uploadResult?.imageUrl;
      if (profileImageUrl)
        await patchProfileImageWithToken({
          profileImageUrl,
          token: data.accessToken,
        });
    }
    storeAuthData(data.accessToken, {
      accountId: data.accountId,
      ...(profileImageUrl && { profileImageUrl }),
    });

    return { message: "회원가입을 축하합니다" };
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : String(error));
  }
}

export async function getKakaoToken({
  client_id,
  redirect_uri,
  auth_code,
}: {
  client_id: string;
  redirect_uri: string;
  auth_code: string;
}): Promise<KakaoAuthResponse> {
  const body = new URLSearchParams({
    grant_type: "authorization_code",
    client_id,
    redirect_uri,
    code: auth_code,
  });

  const targetUrl = "https://kauth.kakao.com/oauth/token";

  try {
    const response = await fetch(targetUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
      },
      body,
    });

    if (!response.ok) {
      const errorBody = await response.json().catch(() => ({}));
      const errorMessage =
        errorBody?.error_description ||
        `카카오 인증 실패 (HTTP ${response.status})`;
      throw new Error(errorMessage);
    }

    const res: KakaoAuthResponse = await response.json();
    return res;
  } catch (err) {
    throw new Error(`카카오 토큰 요청 중 오류 발생: ${(err as Error).message}`);
  }
}

/** 회원 정보 조회 */
export async function getUserAuth() {
  const response: lighty.UserProfileResponse = await apiClient.get(
    "/users/profile"
  );
  return response;
}

export async function getLogout(deviceId: string) {
  const response = await apiClient.delete("/auth/logout", {
    headers: {
      "Device-Id": deviceId,
    },
    withCredentials: true,
  });

  if (response.status === 204) {
    return "로그아웃";
  }
}
