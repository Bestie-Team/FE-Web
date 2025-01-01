import { getGroups } from "@/remote/group";
import { useQuery } from "@tanstack/react-query";

export default function useGroups() {
  return useQuery({ queryKey: ["groups"], queryFn: () => getGroups() });
}
