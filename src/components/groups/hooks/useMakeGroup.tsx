import { GroupInfo } from "@/models/group";
import { postGroup } from "@/remote/group";
import { useQuery } from "@tanstack/react-query";

export default function useMakeGroup({ group }: { group: GroupInfo }) {
  return useQuery({
    queryKey: ["make/group", group.name],
    queryFn: () => postGroup({ group }),
  });
}
