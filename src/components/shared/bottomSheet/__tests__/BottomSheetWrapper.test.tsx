import { render, screen, fireEvent } from "@testing-library/react";
import BottomSheetWrapper from "@/components/shared/bottomSheet/BottomSheetWrapper";

describe("BottomSheetWrapper", () => {
  test("open이 false일 때 컴포넌트가 렌더링되지 않는가", () => {
    const handleClose = jest.fn();
    render(
      <BottomSheetWrapper open={false} onClose={handleClose}>
        <div>Test Content</div>
      </BottomSheetWrapper>
    );

    expect(screen.queryByText("Test Content")).toBeNull();
  });

  test("open이 true일 때 컴포넌트가 렌더링되는가", () => {
    const handleClose = jest.fn();
    render(
      <BottomSheetWrapper open={true} onClose={handleClose}>
        <div>Test Content</div>
      </BottomSheetWrapper>
    );

    expect(screen.getByText("Test Content")).toBeInTheDocument();
  });

  test("bar가 true일 때 RectIcon이 렌더링되는가", () => {
    const handleClose = jest.fn();
    render(
      <BottomSheetWrapper open={true} onClose={handleClose} bar={true}>
        test
      </BottomSheetWrapper>
    );

    expect(screen.getByTestId("rect-icon")).toBeInTheDocument();
  });

  test("bar가 false일 때 RectIcon이 렌더링되지 않는가", () => {
    const handleClose = jest.fn();
    render(
      <BottomSheetWrapper open={true} onClose={handleClose} bar={false}>
        test
      </BottomSheetWrapper>
    );

    expect(screen.queryByTestId("rect-icon")).toBeNull();
  });

  test("애니메이션 종료 후 onClose가 호출되는가", () => {
    const handleClose = jest.fn();
    render(
      <BottomSheetWrapper open={true} onClose={handleClose}>
        test
      </BottomSheetWrapper>
    );
    fireEvent.click(screen.getByTestId("dimmed-backdrop"));
    fireEvent.animationEnd(screen.getByTestId("bottom-sheet-wrapper"));
    expect(handleClose).toHaveBeenCalledTimes(1);
  });
});
