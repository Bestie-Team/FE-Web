import * as lighty from "lighty-type";
import { handleProfileImageUpdate } from "./profile";
import { UploadType } from "@/components/shared/AddPhoto";

export async function postLogin({ accessToken }: lighty.LoginRequest) {
  try {
    if (!process.env.NEXT_PUBLIC_BACKEND_URL) {
      throw new Error("Backend URL is not configured");
    }

    const targetUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/google/login`;
    const response = await fetch(targetUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        accessToken,
      }),
    });

    const data = await response.json();

    if (response.ok) {
      const user_info: lighty.LoginResponse = data;

      localStorage.setItem("auth_token", user_info.accessToken);
      sessionStorage.setItem(
        "user_info",
        JSON.stringify({
          accountId: user_info.accountId,
        })
      );

      const returnUrl = sessionStorage.getItem("returnUrl") || "/home";
      window.location.href = returnUrl;
      return;
    }

    switch (response.status) {
      case 404:
        const user_oauth_info: lighty.LoginFailResponse = data;

        // 회원가입 페이지로 이동 시 현재 정보 저장
        sessionStorage.setItem("oauth_data", JSON.stringify(user_oauth_info));
        window.location.href = "/signup";
        break;

      case 409:
        throw new Error(
          `다른 플랫폼으로 가입된 계정입니다. 해당 플랫폼으로 로그인해 주세요.`
        );

      case 401:
        throw new Error("인증 토큰이 유효하지 않습니다. 다시 로그인해 주세요.");

      case 500:
        throw new Error(
          "서버 오류가 발생했습니다. 잠시 후 다시 시도해 주세요."
        );

      default:
        throw new Error("로그인 처리 중 문제가 발생했습니다.");
    }
  } catch (error) {
    alert("로그인 요청에 실패했습니다.");
    console.error("Error during login:", error);
  }
}

export async function postRegister(RegisterRequest: UploadType) {
  try {
    const targetUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/register`;
    const response = await fetch(targetUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...RegisterRequest,
        profileImageUrl: null,
      }),
    });

    const data: lighty.RegisterResponse = await response.json();

    if (response.ok) {
      window.location.href = "/home";
      sessionStorage.setItem(
        "user_info",
        JSON.stringify({
          accessToken: data.accessToken,
          accountId: data.accountId,
        })
      );

      if (RegisterRequest.profileImageUrl) {
        await handleProfileImageUpdate({
          file: RegisterRequest.profileImageUrl as File,
        });
      }
    } else {
      alert("회원 가입 중 문제가 발생했습니다.");
    }
  } catch (error) {
    console.error("Error during login:", error);
    alert("회원 가입 요청에 실패했습니다.");
  }
}
