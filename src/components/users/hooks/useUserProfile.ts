import { getUserProfile } from "@/remote/users";
import { useQuery } from "@tanstack/react-query";

export default function useUserProfile({ enabled = true }: { enabled?: boolean } = {}) {
  return useQuery({
    queryKey: ["user/profile/alarm"],
    queryFn: () => getUserProfile(),
    enabled,
  });
}
