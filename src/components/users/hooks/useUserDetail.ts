import { getUserDetail } from "@/remote/users";
import { useQuery } from "@tanstack/react-query";

export default function useUserDetail() {
  return useQuery({
    queryKey: ["user/detail"],
    queryFn: () => getUserDetail(),
    staleTime: 3600 * 1000,
  });
}
