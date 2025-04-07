import SignInPage from "@/app/page";
import { render, screen } from "@testing-library/react";
import { AuthProvider } from "@/components/shared/providers/AuthProvider";
import mockRouter from "next-router-mock";

jest.mock("next/navigation", () => ({
  useRouter: () => mockRouter,
  usePathname: () => mockRouter.pathname,
  useSearchParams: () => new URLSearchParams(),
}));

jest.mock("@/components/shared/providers/ReactNativeWebViewProvider", () => ({
  ReactNativeWebViewContext: {
    Provider: ({ children }) => children,
  },
  useReactNativeWebView: () => ({
    postMessage: jest.fn(),
    // 필요한 다른 메서드나 속성 추가
  }),
}));

jest.mock("@react-oauth/google", () => ({
  ...jest.requireActual("@react-oauth/google"),
  useGoogleLogin: () => ({
    login: jest.fn(),
    error: null,
    loading: false,
  }),
  GoogleOAuthProvider: ({ children }) => children,
}));

describe("로그인 및 스플래쉬페이지", () => {
  beforeEach(() => {
    // 초기 라우터 설정
    mockRouter.push("/");
  });

  it("로그인 및 스플래쉬페이지가 정상적으로 렌더링된다", () => {
    render(
      <AuthProvider>
        <SignInPage />
      </AuthProvider>
    );

    expect(screen.getByText("카카오로 계속하기")).toBeInTheDocument();
    expect(screen.getByText("Google로 계속하기")).toBeInTheDocument();
    expect(screen.getByText("Apple로 계속하기")).toBeInTheDocument();
  });
});
