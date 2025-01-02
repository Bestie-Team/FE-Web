import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import PlusCircleButton, { PlusCircleButtonSmall } from "../PlusCircleButton";

describe("PlusCircleButton", () => {
  test("버튼 클릭 시 onClick 함수 호출되는가", () => {
    const handleClick = jest.fn();
    render(<PlusCircleButton onClick={handleClick} />);

    const button = screen.getByTestId("plus-circle-button");
    fireEvent.click(button);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test("스타일과 클래스명이 올바르게 적용되는가", () => {
    const style = { bottom: "20px", right: "20px" };
    const customClass = "custom-class";
    render(<PlusCircleButton style={style} className={customClass} />);

    const button = screen.getByTestId("plus-circle-button");
    expect(button).toHaveStyle("bottom: 20px");
    expect(button).toHaveStyle("right: 20px");
    expect(button).toHaveClass(customClass);
  });
  test("PlusIcon이 올바르게 렌더링되었는가", () => {
    render(<PlusCircleButton />);

    const icon = screen.getByTestId("plus-icon");
    expect(icon).toBeInTheDocument();
  });
});

describe("PlusCircleButtonSmall", () => {
  test("스타일과 클래스가 올바르게 적용되었는가", () => {
    const style = { bottom: "10px", right: "10px" };
    const customClass = "small-custom-class";
    render(<PlusCircleButtonSmall style={style} className={customClass} />);

    const button = screen.getByTestId("plus-circle-button-small");
    expect(button).toHaveStyle("bottom: 10px");
    expect(button).toHaveStyle("right: 10px");
    expect(button).toHaveClass(customClass);
  });

  test("아이콘 크기가 올바르게 적용되는가", () => {
    render(<PlusCircleButtonSmall width="15" height="15" />);

    const icon = screen.getByTestId("plus-icon");
    expect(icon).toHaveAttribute("width", "15");
    expect(icon).toHaveAttribute("height", "15");
  });
});
