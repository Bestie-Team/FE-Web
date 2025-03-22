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
    queryKey: ["getKakaoAuth"],
    queryFn: async () =>
      await getKakaoToken({
        client_id: client_id ?? "",
        redirect_uri: redirect_uri ?? "",
        auth_code: auth_code,
      }),
    enabled: !!client_id && !!redirect_uri && auth_code !== "",
  });
};
