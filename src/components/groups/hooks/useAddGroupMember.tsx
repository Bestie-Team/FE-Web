import { addGroupMember, getGroup } from "@/remote/group";
import { useQuery } from "@tanstack/react-query";

export default function useAddGroupMember({
  groupId,
  accountId,
}: {
  groupId: string;
  accountId: string;
}) {
  return useQuery({
    queryKey: ["group", groupId, accountId],
    queryFn: () => addGroupMember({ groupId, accountId }),
  });
}
