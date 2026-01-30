import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React, { ReactElement } from "react";
import { RecoilRoot } from "recoil";
import { AuthProvider } from "@/shared/components/providers/AuthProvider";

const createTestRenderer = async (component: ReactElement) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false, // ❌ retry off
      },
    },
  });

  const user = userEvent.setup();

  return {
    user,
    ...render(
      <RecoilRoot>
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            {component}
          </AuthProvider>
        </QueryClientProvider>
      </RecoilRoot>
    ),
  };
};

export default createTestRenderer;
