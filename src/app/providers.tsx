import { SessionProvider } from "next-auth/react";
import { RecoilRoot } from "recoil";
interface Props {
  children?: React.ReactNode;
}
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export const NextProvider = ({ children }: Props) => {
  return (
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>
        <SessionProvider>{children}</SessionProvider>
      </RecoilRoot>
    </QueryClientProvider>
  );
};
