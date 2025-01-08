import { CodeResponse } from "@react-oauth/google";

export async function postLogin({
  tokenResponse,
}: {
  tokenResponse: Omit<
    CodeResponse,
    "error" | "error_description" | "error_uri"
  >;
}) {
  try {
    // const response = await fetch(
    //   `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/google/login`,
    //   {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({
    //       accessToken: tokenResponse.code,
    //     }),
    //   }
    // );
    // if (response.status === 404) {
    //   window.location.href = "/signup";
    // } else if (response.status === 409) {
    //   const errorData = await response.json();
    //   alert(`다른 플랫폼에서 로그인 이력이 있습니다: ${errorData.provider}`);
    // } else if (response.ok) {
    //   const data = await response.json();
    //   console.log(data);
    //   alert("로그인 성공!");
    // }
    const response = await fetch("/api/proxy", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        accessToken: tokenResponse.code,
      }),
    });

    const data = await response.json();
    console.log(data);
    if (response.ok) {
      // 로그인 성공 처리
      window.location.href = "/home";
    } else {
      alert("로그인 중 문제가 발생했습니다.");
    }
  } catch (error) {
    console.error("Error during login:", error);
    alert("로그인 요청에 실패했습니다.");
  }
}
