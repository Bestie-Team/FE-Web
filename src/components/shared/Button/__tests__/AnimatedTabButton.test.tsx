import { render, screen, fireEvent } from "@testing-library/react";
import { RecoilRoot } from "recoil";
import AnimatedTabButton from "../AnimatedTabButton";

// Recoil 상태와 함께 컴포넌트를 감싸는 래퍼 컴포넌트 정의
const Wrapper = ({ children }: { children: React.ReactNode }) => (
  <RecoilRoot>{children}</RecoilRoot>
);

describe("AnimatedTabButton", () => {
  it("두 개의 탭이 렌더링되는가", () => {
    render(<AnimatedTabButton />, { wrapper: Wrapper });

    expect(screen.getByText("일반 약속")).toBeInTheDocument();
    expect(screen.getByText("그룹 약속")).toBeInTheDocument();
  });

  it("기본 선택 탭이 '일반 약속'인가", () => {
    render(<AnimatedTabButton />, { wrapper: Wrapper });

    expect(screen.getByText("일반 약속")).toHaveClass("text-grayscale-900");
    expect(screen.getByText("그룹 약속")).toHaveClass("text-grayscale-500");
  });

  it("그룹 약속 클릭시 선택된 약속이 그룹 약속으로 바뀌는가", () => {
    render(<AnimatedTabButton />, { wrapper: Wrapper });

    fireEvent.click(screen.getByText("그룹 약속"));

    expect(screen.getByText("그룹 약속")).toHaveClass("text-grayscale-900");
    expect(screen.getByText("일반 약속")).toHaveClass("text-grayscale-500");
  });

  it("슬라이더가 제대로 움직이는가", () => {
    render(<AnimatedTabButton />, { wrapper: Wrapper });

    const slider = screen.getByRole("presentation");
    expect(slider).toHaveClass("translate-x-0");

    fireEvent.click(screen.getByText("그룹 약속"));
    expect(slider).toHaveClass("translate-x-full");
  });
});
