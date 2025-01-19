import { getGroups } from "@/remote/group";
import { useQuery } from "@tanstack/react-query";

export default function useGroup({
  cursor,
  limit,
}: {
  cursor: string | null;
  limit: number;
}) {
  return useQuery({
    queryKey: ["groups"],
    queryFn: () => getGroups({ cursor, limit }),
    refetchOnWindowFocus: "always",
  });
}
