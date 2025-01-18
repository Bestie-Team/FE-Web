import { deleteGroupMember } from "@/remote/group";
import { useQuery } from "@tanstack/react-query";

export default function useGetOutOfGroup({ groupId }: { groupId: string }) {
  return useQuery({
    queryKey: ["groups", groupId],
    queryFn: () => deleteGroupMember({ groupId }),
  });
}
