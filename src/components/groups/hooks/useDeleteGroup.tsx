import { deleteGroup } from "@/remote/group";
import { useQuery } from "@tanstack/react-query";

export default function useDeleteGroup({ groupId }: { groupId: string }) {
  return useQuery({
    queryKey: ["group", groupId],
    queryFn: () => deleteGroup({ groupId }),
  });
}
