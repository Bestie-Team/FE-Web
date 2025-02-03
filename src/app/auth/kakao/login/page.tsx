"use client";

import { useKakaoAuth } from "@/hooks/useKakaoQuery";
import { postLogin } from "@/remote/auth";
import { useEffect, useState } from "react";

export interface KakaoAuthResponse {
  access_token: string;
  token_type: "bearer";
  refresh_token: string;
  expires_in: number;
  scope: string;
  refresh_token_expires_in: number;
}

export default function Page() {
  const getAuthCode = () =>
    new URL(document.location.toString()).searchParams.get("code") || "";

  const [authCode, setAuthCode] = useState<string>("");

  const { data: tokenInfo } = useKakaoAuth({
    auth_code: authCode,
    client_id: process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY,
    redirect_uri: process.env.NEXT_PUBLIC_REDIRECT_URI,
  });

  useEffect(() => {
    setAuthCode(getAuthCode());
  }, []);

  useEffect(() => {
    if (tokenInfo) {
      postLogin({ accessToken: tokenInfo.access_token, provider: "kakao" });
    }
  }, [tokenInfo]);

  return <div />;
}
