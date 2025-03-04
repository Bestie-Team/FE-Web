import { getFriendsRequestTotalCount } from "@/remote/friends";
import { useQuery } from "@tanstack/react-query";

export default function useFriendsRequestTotalCount() {
  return useQuery({
    queryKey: ["friend/request/count"],
    queryFn: () => getFriendsRequestTotalCount(),
    refetchOnWindowFocus: "always",
  });
}
