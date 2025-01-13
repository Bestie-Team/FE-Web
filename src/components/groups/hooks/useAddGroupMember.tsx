import { postGroupMember } from "@/remote/group";
import { useQuery } from "@tanstack/react-query";

export default function useAddGroupMember({ groupId }: { groupId: string }) {
  return useQuery({
    queryKey: ["group", groupId],
    queryFn: () => postGroupMember({ groupId }),
  });
}
