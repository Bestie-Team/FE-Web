import * as lighty from "lighty-type";
import {
  patchProfileImageWithToken,
  postProfileImageWithToken,
} from "./profile";
import STORAGE_KEYS from "@/constants/storageKeys";
import { API_CONFIG, fetchWithAuth } from "./shared";
import { RegisterRequestType } from "@/components/shared/AddPhoto";
import { Providers } from "@/constants/oAuthButtons";
import { KakaoAuthResponse } from "@/models/user";
import { v4 as uuidv4 } from "uuid";

const storeAuthData = (accessToken: string, userInfo: object) => {
  localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, accessToken);
  sessionStorage.setItem(STORAGE_KEYS.USER_INFO, JSON.stringify(userInfo));
};

export async function postLogin({
  accessToken,
  provider,
}: lighty.LoginRequest & { provider: Providers }) {
  const baseUrl = API_CONFIG.getBaseUrl();
  const uuid = uuidv4();
  localStorage.setItem(STORAGE_KEYS.DEVICE_ID, uuid);

  const targetUrl = `${baseUrl}/auth/${provider}/login`;

  const response = await fetch(targetUrl, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      "Device-Id": uuid,
    },
    body: JSON.stringify({
      accessToken,
    }),
  });

  const data = await response.json();
  if (response.ok) {
    storeAuthData(data.accessToken, {
      accountId: data.accountId,
      profileImageUrl: data.profileImageUrl,
    });

    if (provider === "kakao") {
      window.location.href = "/feed";
    }
    return data;
  }

  switch (response.status) {
    case 404:
      const user_oauth_info: lighty.LoginFailResponse = data;

      sessionStorage.setItem(
        STORAGE_KEYS.OAUTH_DATA,
        JSON.stringify(user_oauth_info)
      );
      window.location.href = "/signup";
      break;

    case 409:
      throw new Error(
        `다른 플랫폼으로 가입된 계정입니다. 해당 플랫폼으로 로그인해 주세요.`
      );

    case 401:
      throw new Error("인증 토큰이 유효하지 않습니다. 다시 로그인해 주세요.");

    case 500:
      throw new Error("서버 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.");

    default:
      console.log(response);
      throw new Error("로그인 처리 중 문제가 발생했습니다.");
  }
}

export async function registerUser(RegisterRequest: RegisterRequestType) {
  if (!RegisterRequest.accountId || !RegisterRequest.name) {
    throw new Error("이름과 아이디가 유효하지 않습니다");
  }

  try {
    const baseUrl = API_CONFIG.getBaseUrl();

    const uuid = uuidv4();
    localStorage.setItem(STORAGE_KEYS.DEVICE_ID, uuid);

    const response = await fetch(`${baseUrl}/auth/register`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json", "Device-Id": uuid },
      body: JSON.stringify({
        ...RegisterRequest,
        profileImageUrl: null,
      }),
    });

    if (!response.ok) {
      throw new Error("회원가입에 실패했습니다");
    }

    const data: lighty.RegisterResponse = await response.json();

    let profileImageUrl = null;
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

    window.location.href = "/onboard";

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
}) {
  const body = new URLSearchParams();
  body.append("grant_type", "authorization_code");
  body.append("client_id", client_id);
  body.append("redirect_uri", redirect_uri);
  body.append("code", auth_code);

  const baseUrl = "https://kauth.kakao.com";
  const targetUrl = `${baseUrl}/oauth/token`;
  const response = await fetch(targetUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
    },
    body,
  });

  if (!response.ok) {
    throw new Error("getKakaoToken 에러 발생");
  }
  const res: KakaoAuthResponse = await response.json();
  return res;
}

/** 회원 정보 조회 */
export async function getUserAuth() {
  const baseUrl = API_CONFIG.getBaseUrl();
  try {
    const targetUrl = `${baseUrl}/users/profile`;
    const response = await fetchWithAuth(targetUrl, {
      method: "GET",
      cache: "force-cache",
      headers: { "Cache-Control": "public, max-age=3600 * 24000" },
    });
    const data: lighty.UserProfileResponse = await response.json();
    return data;
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : String(error));
  }
}
