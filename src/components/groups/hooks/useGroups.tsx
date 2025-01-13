import { getGroups } from "@/remote/group";
import { useQuery } from "@tanstack/react-query";

export default function useGroup({
  cursor,
  limit,
}: {
  cursor: string;
  limit: number;
}) {
  return useQuery({
    queryKey: ["groups", { cursor, limit }],
    queryFn: () => getGroups({ cursor, limit }),
  });
}
