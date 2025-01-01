import { deleteGroupMember } from "@/remote/group";
import { useQuery } from "@tanstack/react-query";

export default function useDeleteGroupMember({
  groupId,
  accountId,
}: {
  groupId: string;
  accountId: string;
}) {
  return useQuery({
    queryKey: ["groups", groupId, accountId],
    queryFn: () => deleteGroupMember({ groupId, accountId }),
  });
}
