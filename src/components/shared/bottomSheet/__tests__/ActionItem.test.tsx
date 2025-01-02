import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import LightyLogo from "../../icons/LightyLogo";
import ActionItem from "../ActionItem";
describe("ActionItem", () => {
  test("title과 subTitle, icon이 올바르게 렌더링되는가", () => {
    const title = "Test Title";
    const subTitle = "Test Subtitle";
    const icon = <LightyLogo />;

    render(<ActionItem title={title} subTitle={subTitle} icon={icon} />);

    expect(screen.getByText(title)).toBeInTheDocument();
    expect(screen.getByText(subTitle)).toBeInTheDocument();
    expect(screen.getByTestId("lighty-logo")).toBeInTheDocument();
  });

  test("onClick(onMouseDown) 함수가 호출되는가", () => {
    const handleClick = jest.fn();
    const icon = <LightyLogo />;

    render(<ActionItem title="Test Title" icon={icon} onClick={handleClick} />);

    fireEvent.mouseDown(screen.getByText("Test Title"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test("스타일이 제대로 적용되는가", () => {
    const title = "Styled Test";
    const icon = <LightyLogo />;

    render(<ActionItem title={title} icon={icon} />);

    const container = screen.getByText(title).closest("div");
    expect(container).toHaveClass("flex-grow");
  });

  test("버튼 아이콘이 정상적으로 렌더링되는가", () => {
    const icon = <LightyLogo />;
    render(<ActionItem title="Test Title" icon={icon} />);

    const button = screen.getByRole("button");
    expect(button).toHaveClass(
      "bg-grayscale-900 w-[40px] h-[40px] p-[11px] rounded-full"
    );
    expect(button).toContainHTML("<svg"); // 아이콘이 포함되어 있는지 확인
  });
});
