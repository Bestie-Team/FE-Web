import { deleteGroupMember } from "@/remote/group";
import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/lib/queryKeys";

export default function useGetOutOfGroup({ groupId }: { groupId: string }) {
  return useQuery({
    queryKey: queryKeys.group.getOut(groupId),
    queryFn: () => deleteGroupMember({ groupId }),
  });
}
