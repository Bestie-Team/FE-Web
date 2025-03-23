import { getKakaoToken } from "@/remote/auth";
import { useQuery } from "@tanstack/react-query";

export const useKakaoAuth = ({
  client_id,
  redirect_uri,
  auth_code,
}: {
  client_id: string | undefined;
  redirect_uri: string | undefined;
  auth_code: string;
}) => {
  return useQuery({
    queryKey: ["getKakaoAuth", client_id, redirect_uri, auth_code],
    queryFn: async () =>
      await getKakaoToken({
        client_id: client_id ?? "",
        redirect_uri: redirect_uri ?? "",
        auth_code,
      }),
    enabled: Boolean(auth_code),
    staleTime: 1000 * 60 * 5,
    retry: 3,
    retryDelay: (attempt) => Math.min(1000 * 2 ** attempt, 10000),
  });
};
