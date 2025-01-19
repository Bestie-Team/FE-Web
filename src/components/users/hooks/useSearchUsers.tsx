import { getSearchUsers } from "@/remote/users";
import { useQuery } from "@tanstack/react-query";
import * as lighty from "lighty-type";

export default function useSearchUsers({
  name,
  accountId,
  limit,
  search,
  enabled,
}: {
  name: string;
  accountId: string;
  limit: number;
  search: string;
  enabled: boolean;
}) {
  return useQuery({
    queryKey: ["users", { name, accountId, limit, search }],
    queryFn: (): Promise<lighty.SearchUserResponse> => {
      return getSearchUsers({ name, accountId, limit, search });
    },
    staleTime: 0,
    enabled: enabled,
    refetchOnWindowFocus: "always",
  });
}
