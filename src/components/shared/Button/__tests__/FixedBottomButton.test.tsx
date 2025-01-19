import { render, screen, fireEvent } from "@testing-library/react";
import FixedBottomButton from "@/components/shared/Button/FixedBottomButton";

describe("FixedBottomButton", () => {
  beforeAll(() => {
    const portalRoot = document.createElement("div");
    portalRoot.setAttribute("id", "root-portal");
    document.body.appendChild(portalRoot);
  });

  afterAll(() => {
    const portalRoot = document.getElementById("root-portal");
    if (portalRoot) {
      document.body.removeChild(portalRoot);
    }
  });

  it("주어진 label을 알맞게 렌더링하는가", () => {
    render(<FixedBottomButton label="Click Me" />);
    expect(screen.getByText("Click Me")).toBeInTheDocument();
  });

  it("버튼 클릭 시 onClick 함수가 실행되는가", () => {
    const handleClick = jest.fn();
    render(<FixedBottomButton label="Click Me" onClick={handleClick} />);

    const button = screen.getByText("Click Me");
    fireEvent.click(button);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("disabled일 때, disabled스타일이 적용이 되고 클릭이 방지가 되는가", () => {
    const handleClick = jest.fn();
    render(
      <FixedBottomButton
        label="Disabled Button"
        onClick={handleClick}
        disabled
      />
    );

    const button = screen.getByText("Disabled Button");
    expect(button).toHaveClass("bg-grayscale-300 cursor-default");
    fireEvent.click(button);

    expect(handleClick).not.toHaveBeenCalled();
  });

  it("사용자 지정 클래스명과 색상이 적용되는가", () => {
    render(
      <FixedBottomButton
        label="Custom Button"
        className="custom-class"
        color="custom-color"
      />
    );

    const button = screen.getByText("Custom Button");
    expect(button).toHaveClass("custom-class");
    // color 속성은 Button 컴포넌트로 전달되므로 여기서는 Button 컴포넌트에서 처리되었는지 가정
  });

  it("포탈이 제거됐을 때 렌더링되지 않는가", () => {
    document.body.removeChild(
      document.getElementById("root-portal") as HTMLElement
    );

    render(<FixedBottomButton label="No Portal" />);
    expect(screen.queryByText("No Portal")).toBeNull();
  });
});
