import { getGroup } from "@/remote/group";
import { lightyToast } from "@/utils/toast";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export const useGroupDetail = (id: string) => {
  const fetcher = () => getGroup(id);
  const router = useRouter();

  return useSuspenseQuery({
    queryKey: ["group/detail", id],
    queryFn: fetcher,
    retry: (failureCount, error) => {
      if (failureCount === 7) {
        return false;
      } else if (error) {
        lightyToast.error("그룹을 찾을 수 없어요 다시 시도해 주세요");
        router.back();
        return false;
      }
      return true;
    },
  });
};
