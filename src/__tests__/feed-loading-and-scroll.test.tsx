// // 테스트 라이브러리
// import { render, screen, waitFor, fireEvent } from "@testing-library/react";
// import { generateMockPosts } from "@/test/fixtures/posts";
// import "@testing-library/jest-dom";
// import { setupServer } from "msw/node";
// import { http } from "msw";
// import FeedPage from "@/app/feed/page";

// // 모킹
// import { handlers } from "@/mock/handlers";
// jest.mock("@/services/feedService", () => ({
//   fetchFeedPosts: (...args) => handlers(...args),
// }));

// // 테스트 유틸리티

// describe("피드 컴포넌트", () => {
//   it("초기 포스트를 성공적으로 로드하고 렌더링한다", async () => {
//     // 모의 API 응답 설정
//     mockFeedAPI.mockResolvedValueOnce(generateMockPosts(10));

//     render(<FeedPage />);

//     // 로딩 상태 확인
//     expect(screen.getByTestId("loading-spinner")).toBeInTheDocument();

//     // 포스트가 로드되었는지 확인
//     await waitFor(() => {
//       expect(screen.queryByTestId("loading-spinner")).not.toBeInTheDocument();
//       expect(screen.getAllByTestId("post-item")).toHaveLength(10);
//     });
//   });

//   it("스크롤 시 추가 포스트를 로드한다", async () => {
//     // 초기 및 추가 포스트 모의 설정
//     mockFeedAPI.mockResolvedValueOnce(generateMockPosts(10));
//     mockFeedAPI.mockResolvedValueOnce(generateMockPosts(10, 10)); // 10개 더, ID는 10부터 시작

//     render(<Feed />);

//     // 초기 포스트 로드 대기
//     await waitFor(() => {
//       expect(screen.getAllByTestId("post-item")).toHaveLength(10);
//     });

//     // 무한 스크롤 트리거
//     fireEvent.scroll(window, { target: { scrollY: 2000 } });

//     // 추가 포스트 로드 확인
//     await waitFor(() => {
//       expect(screen.getAllByTestId("post-item")).toHaveLength(20);
//     });
//   });
// });
