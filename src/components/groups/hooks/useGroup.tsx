import { getGroup } from "@/remote/group";
import { useQuery } from "@tanstack/react-query";

export default function useGroup({ id }: { id: string }) {
  return useQuery({ queryKey: ["group", id], queryFn: () => getGroup(id) });
}
