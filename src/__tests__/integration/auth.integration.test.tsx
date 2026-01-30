import React from "react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { screen } from "@testing-library/react";
import createTestRenderer from "@/shared/utils/test/render";
import STORAGE_KEYS from "@/shared/constants/storageKeys";

// Mock postLogin logic inside factory to avoid hoisting issues
vi.mock("@/features/auth/api/auth", async () => {
    const actual = await vi.importActual("@/features/auth/api/auth");
    return {
        ...actual,
        postLogin: vi.fn(),
    };
});

// Mock UI Component that uses auth
const AuthStatus = () => {
    const [userInfo, setUserInfo] = React.useState<string | null>(null);

    React.useEffect(() => {
        const info = localStorage.getItem(STORAGE_KEYS.USER_INFO);
        setUserInfo(info);
    }, []);

    return (
        <div>
            {userInfo ? `Logged in as ${JSON.parse(userInfo).accountId}` : "Not logged in"}
        </div>
    );
};

describe("인증 통합 테스트", () => {
    beforeEach(() => {
        localStorage.clear();
        vi.clearAllMocks();
    });

    it("로그인 시뮬레이션 후 auth 데이터가 localStorage에 정상적으로 저장되어야 한다", async () => {
        const mockUserData = { accountId: "test-user", profileImageUrl: null };
        const mockResponse = {
            data: {
                accessToken: "fake-token",
                accountId: "test-user",
            },
            response: { ok: true }
        };

        const { postLogin } = await import("@/features/auth/api/auth");
        (postLogin as any).mockResolvedValue(mockResponse);

        await createTestRenderer(<AuthStatus />);

        expect(screen.getByText("Not logged in")).toBeInTheDocument();

        // Directly call the storage logic
        const { storeAuthData } = await import("@/features/auth/api/auth");
        storeAuthData(mockResponse.data.accessToken, mockUserData);

        expect(localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN)).toBe("fake-token");
        expect(localStorage.getItem(STORAGE_KEYS.USER_INFO)).toContain("test-user");
    });
});
