import React from "react";
import { describe, it, expect, vi } from "vitest";
import { screen } from "@testing-library/react";
import createTestRenderer from "@/shared/utils/test/render";
import NewGroupForm from "@/features/groups/components/NewGroupForm";

// Mock the API call
vi.mock("@/features/groups/api/group", () => ({
    postMakeGroup: vi.fn(() => Promise.resolve({ id: "new-group-id" })),
}));

// Mock routing
vi.mock("next/navigation", () => ({
    useRouter: () => ({
        push: vi.fn(),
    }),
}));

describe("모임 생성 통합 테스트", () => {
    it("새 그룹 생성 폼의 필드들이 정상적으로 입력되고 검증되어야 한다", async () => {
        const setStep = vi.fn();
        // Using step 1 to show the form (step 0 shows MakingGroupSuccess)
        const { user } = await createTestRenderer(<NewGroupForm step={1} setStep={setStep} />);

        // Based on NewGroupForm.tsx, the placeholders are:
        // "그룹 이름을 입력해 주세요."
        // "그룹 이름을 설명해 주세요."
        const nameInput = screen.getByPlaceholderText("그룹 이름을 입력해 주세요.");
        const descInput = screen.getByPlaceholderText("그룹 이름을 설명해 주세요.");

        await user.type(nameInput, "우리 팀 모임");
        await user.type(descInput, "프론트엔드 팀 모임입니다.");

        expect(nameInput).toHaveValue("우리 팀 모임");
        expect(descInput).toHaveValue("프론트엔드 팀 모임입니다.");

        const submitButton = screen.getByRole("button", { name: /그룹 생성하기/i });
        // In NewGroupForm, the button is disabled if newGroup.friendIds is null or length < 1
        expect(submitButton).toBeDisabled();
    });
});
