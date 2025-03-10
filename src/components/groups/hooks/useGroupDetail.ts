import { getGroup } from "@/remote/group";
import { useSuspenseQuery } from "@tanstack/react-query";

export const useGroupDetail = (id: string) => {
  const fetcher = () => getGroup(id);

  return useSuspenseQuery({
    queryKey: ["group/detail", id],
    queryFn: fetcher,
  });
};
