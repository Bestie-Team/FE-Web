import { render, screen, fireEvent } from "@testing-library/react";
import Button from "../Button";

describe("BaseButton", () => {
  it("버튼의 텍스트가 렌더링되는가", () => {
    render(<Button>Click Me</Button>);

    expect(screen.getByText("Click Me")).toBeInTheDocument();
  });

  it("클릭 이벤트가 호출되는가", () => {
    const onClick = jest.fn();
    render(<Button onClick={onClick}>Click Me</Button>);

    fireEvent.click(screen.getByText("Click Me"));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("disabled시에는 클릭 이벤트가 호출되지 않는가", () => {
    const onClick = jest.fn();
    render(
      <Button onClick={onClick} disabled>
        Disabled Button
      </Button>
    );

    fireEvent.click(screen.getByText("Disabled Button"));
    expect(onClick).not.toHaveBeenCalled();
  });

  it("버튼 배경색이 지정 색상으로 적용되는가", () => {
    render(<Button color="red">Click Me</Button>);

    expect(screen.getByText("Click Me")).toHaveStyle("background-color: red");
  });
});

describe("ButtonGroup", () => {
  it("버튼 그룹의 타이틀이 렌더링 되고 버튼들이 그룹 안에 렌더링되는가", () => {
    render(
      <Button.Group title="Group Title">
        <Button>Button 1</Button>
        <Button>Button 2</Button>
      </Button.Group>
    );

    expect(screen.getByText("Group Title")).toBeInTheDocument();

    expect(screen.getByText("Button 1")).toBeInTheDocument();
    expect(screen.getByText("Button 2")).toBeInTheDocument();
  });

  it("타이틀이 없이 버튼 그룹이 렌더링 되는가", () => {
    render(
      <Button.Group>
        <Button>Button 1</Button>
        <Button>Button 2</Button>
      </Button.Group>
    );

    expect(screen.getByText("Button 1")).toBeInTheDocument();
    expect(screen.getByText("Button 2")).toBeInTheDocument();
  });
});
