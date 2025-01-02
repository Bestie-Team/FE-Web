import { render, screen, fireEvent } from "@testing-library/react";
import { RecoilRoot, useSetRecoilState } from "recoil";
import { usePathname } from "next/navigation";
import SheetOpenBtnContainer from "../BottomSheetContainer";

jest.mock("next/navigation", () => ({
  usePathname: jest.fn(() => "/home"),
}));
jest.mock("recoil", () => ({
  ...jest.requireActual("recoil"),
  useSetRecoilState: jest.fn(),
}));

describe("SheetOpenBtnContainer", () => {
  test("버튼 클릭 시 setModalOpen함수를 호출하는가", () => {
    const modalOpen = jest.fn();
    (useSetRecoilState as jest.Mock).mockReturnValue(modalOpen);
    const mockPathname = "/home";
    (usePathname as jest.Mock).mockReturnValue(mockPathname);

    render(
      <RecoilRoot>
        <SheetOpenBtnContainer />
      </RecoilRoot>
    );

    const plusButton = screen.getByTestId("plus-circle-button");
    fireEvent.click(plusButton);
    expect(modalOpen).toHaveBeenCalledWith(true);
  });
});
