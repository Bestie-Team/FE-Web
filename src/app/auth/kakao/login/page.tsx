"use client";

import { useKakaoAuth } from "@/hooks/useKakaoQuery";
import { postLogin } from "@/remote/auth";
import { useEffect, useState } from "react";
import type { KakaoAuthResponse } from "@/models/user";

export default function KakaoPage() {
  const [authCode, setAuthCode] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { data: tokenInfo, error: authError } = useKakaoAuth({
    auth_code: authCode,
    client_id: process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY!,
    redirect_uri: process.env.NEXT_PUBLIC_REDIRECT_URI!,
  });

  useEffect(() => {
    const code = new URL(window.location.href).searchParams?.get("code");
    if (code) {
      setAuthCode(code);
    } else {
      setError("No auth code found in URL");
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (authError) {
      setError("카카오 auth 에러");
      setIsLoading(false);
    } else if (tokenInfo) {
      handleLogin(tokenInfo);
    }
  }, [tokenInfo, authError]);

  const handleLogin = async (tokenInfo: KakaoAuthResponse) => {
    try {
      await postLogin({
        accessToken: tokenInfo.access_token,
        provider: "kakao",
      });
    } catch (error) {
      setError("로그인 실패");
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <div className="text-base-white text-center pt-5">Loading...</div>;
  }

  if (error) {
    return (
      <div className="text-base-white text-center pt-5">Error: {error}</div>
    );
  }

  return (
    <div className="text-base-white text-center pt-5">
      Authentication successful. Redirecting...
    </div>
  );
}
