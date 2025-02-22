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
    refetchOnWindowFocus: "always",
    enabled: accountId.length > 3,
    staleTime: 3600 * 1000,
  });
}
