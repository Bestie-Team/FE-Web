import * as lighty from "lighty-type";
import { postProfileImage } from "./profile";
import STORAGE_KEYS from "@/constants/storageKeys";
import { API_CONFIG } from "./shared";
import { RegisterRequestType } from "@/components/shared/AddPhoto";

export async function postLogin({ accessToken }: lighty.LoginRequest) {
  const baseUrl = API_CONFIG.getBaseUrl();

  const targetUrl = `${baseUrl}/auth/google/login`;
  const response = await fetch(targetUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      accessToken,
    }),
  });

  const data = await response.json();
  if (response.ok) {
    const user_info: lighty.LoginResponse = data;
    console.log(user_info);
    localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, user_info.accessToken);
    sessionStorage.setItem(
      STORAGE_KEYS.USER_INFO,
      JSON.stringify({
        accountId: user_info.accountId,
        profileImageUrl: user_info.profileImageUrl,
      })
    );

    return user_info;
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
    const response = await fetch(`${baseUrl}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
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
      const uploadResult = await postProfileImage({
        file: RegisterRequest.profileImageUrl as File,
      });
      profileImageUrl = uploadResult?.imageUrl;
    }

    // Store user information
    const accessToken = data.accessToken;
    const userInfo = {
      accountId: data.accountId,
      ...(profileImageUrl && { profileImageUrl }),
    };

    sessionStorage.setItem(STORAGE_KEYS.USER_INFO, JSON.stringify(userInfo));
    localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, accessToken);

    window.location.href = "/?ref=signup";

    return { message: "회원가입을 축하합니다" };
  } catch (error) {
    console.error("Registration error:", error);
    throw error;
  }
}
