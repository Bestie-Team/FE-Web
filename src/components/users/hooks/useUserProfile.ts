import { getUserDetail } from "@/remote/users";
import { useQuery } from "@tanstack/react-query";

export default function useUserProfile() {
  return useQuery({
    queryKey: ["user/profile"],
    queryFn: () => getUserDetail(),
    retry: false,
  });
}
