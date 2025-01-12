import * as lighty from "lighty-type";
import { postGroup } from "@/remote/group";
import { useQuery } from "@tanstack/react-query";

export default function useMakeGroup({
  group,
}: {
  group: lighty.CreateGroupRequest;
}) {
  return useQuery({
    queryKey: ["make/group", group.name],
    queryFn: () => postGroup({ group }),
  });
}
