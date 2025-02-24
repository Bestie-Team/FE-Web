import { getIdAvailability } from "@/remote/users";
import { useQuery } from "@tanstack/react-query";

export default function useIdAvailability({
  accountId,
}: {
  accountId: string;
}) {
  return useQuery({
    queryKey: ["signup/accountId"],
    queryFn: () => getIdAvailability({ accountId }),
    enabled: accountId.length > 3,
    staleTime: 600 * 1000,
  });
}
