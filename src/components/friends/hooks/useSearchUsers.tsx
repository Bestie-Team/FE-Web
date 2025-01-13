import { getSearchUsers } from "@/remote/users";
import { useQuery } from "@tanstack/react-query";
import * as lighty from "lighty-type";

export default function useSearchUsers({
  name,
  accountId,
  limit,
  search,
}: {
  name: string;
  accountId: string;
  limit: number;
  search: string;
}) {
  return useQuery({
    queryKey: ["users", { name, accountId, limit, search }],
    queryFn: (): Promise<lighty.SearchUserResponse | undefined> => {
      return getSearchUsers({ name, accountId, limit, search });
    },
    staleTime: 0,
  });
}
