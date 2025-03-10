// // Splash.test.tsx
// import React, { act } from "react";
// import { render, screen, fireEvent, waitFor } from "@testing-library/react";
// import { toast } from "react-toastify";
// import { useGoogleLogin } from "@react-oauth/google";
// import { postLogin } from "@/remote/auth";
// import { useAuth } from "../shared/providers/AuthProvider";
// import Splash from "../Splash";
// import oAuthButtons from "@/constants/oAuthButtons";

// // Mocking external dependencies
// jest.mock("@react-oauth/google");
// jest.mock("@/remote/auth");
// jest.mock("react-toastify");
// jest.mock("../shared/providers/AuthProvider");

// const mockCredentialResponse = {
//   access_token: "mock-access-token",
// };

// const mockUserInfo = {
//   id: "1",
//   name: "Test User",
//   email: "test@example.com",
// };

// describe("Splash Component", () => {
//   beforeEach(() => {
//     jest.clearAllMocks();

//     (useAuth as jest.Mock).mockReturnValue({
//       login: jest.fn(),
//     });

//     (toast.error as jest.Mock) = jest.fn();
//   });

//   describe("Component Rendering", () => {
//     it("renders all necessary elements", () => {
//       render(<Splash />);

//       expect(
//         screen.getByText("소중한 당신의 추억을 빛내줄")
//       ).toBeInTheDocument();

//       expect(screen.getByText("SNS로 간편하게 시작하기")).toBeInTheDocument();

//       expect(screen.getByText("이용약관")).toBeInTheDocument();
//       expect(screen.getByText("개인정보처리방침")).toBeInTheDocument();
//     });

//     it("renders all OAuth buttons correctly", () => {
//       render(<Splash />);

//       const buttons = screen.getAllByRole("button");
//       expect(buttons).toHaveLength(oAuthButtons.length);
//     });
//   });

//   describe("Google Login Flow", () => {
//     it("successfully handles Google login", async () => {
//       const mockGoogleLogin = jest.fn();
//       const mockAuthLogin = jest.fn();

//       (useGoogleLogin as jest.Mock).mockReturnValue(mockGoogleLogin);
//       (useAuth as jest.Mock).mockReturnValue({ login: mockAuthLogin });
//       (postLogin as jest.Mock).mockResolvedValue(mockUserInfo);

//       render(<Splash />);

//       const googleButton = screen.getByText(/Google로 계속하기/i);
//       fireEvent.click(googleButton);

//       expect(mockGoogleLogin).toHaveBeenCalled();

//       const { onSuccess } = (useGoogleLogin as jest.Mock).mock.calls[0][0];
//       await act(async () => {
//         await onSuccess(mockCredentialResponse);
//       });

//       await waitFor(() => {
//         expect(postLogin).toHaveBeenCalledWith({
//           accessToken: mockCredentialResponse.access_token,
//         });
//         expect(mockAuthLogin).toHaveBeenCalledWith(mockUserInfo);
//       });
//     });

//     it("handles Google login failure", async () => {
//       const mockGoogleLogin = jest.fn();
//       (useGoogleLogin as jest.Mock).mockReturnValue(mockGoogleLogin);

//       render(<Splash />);

//       const googleButton = screen.getByText(/Google로 계속하기/i);
//       fireEvent.click(googleButton);

//       const { onError } = (useGoogleLogin as jest.Mock).mock.calls[0][0];
//       act(() => {
//         onError(new Error("Google login failed"));
//       });

//       expect(toast.error).toHaveBeenCalledWith("로그인에 실패했어요");
//     });

//     it("handles API failure during login", async () => {
//       const mockGoogleLogin = jest.fn();
//       (useGoogleLogin as jest.Mock).mockReturnValue(mockGoogleLogin);
//       (postLogin as jest.Mock).mockRejectedValue(
//         new Error("로그인 처리 중 문제가 발생했습니다")
//       );

//       render(<Splash />);

//       const { onSuccess } = (useGoogleLogin as jest.Mock).mock.calls[0][0];
//       await act(async () => {
//         await onSuccess(mockCredentialResponse);
//       });

//       // Verify error handling
//       expect(toast.error).toHaveBeenCalledWith("로그인에 실패했어요");
//     });
//   });

//   describe("UI Interactions", () => {
//     it("버튼 호버시 애니메이션이 적용되는가", () => {
//       render(<Splash />);

//       const buttons = screen.getAllByRole("button");
//       buttons.forEach((button) => {
//         expect(button).toHaveClass("hover:animate-shrink-grow-less");
//       });
//     });
//   });
// });

// // Test utilities
// export const mockGoogleLoginSuccess = async (userInfo = mockUserInfo) => {
//   const { onSuccess } = (useGoogleLogin as jest.Mock).mock.calls[0][0];
//   (postLogin as jest.Mock).mockResolvedValue(userInfo);

//   await act(async () => {
//     await onSuccess(mockCredentialResponse);
//   });
// };

// export const mockGoogleLoginFailure = () => {
//   const { onError } = (useGoogleLogin as jest.Mock).mock.calls[0][0];
//   act(() => {
//     onError(new Error("Google login failed"));
//   });
// };
