import { getGatheringDetail } from "@/remote/gathering";
import { lightyToast } from "@/utils/toast";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export default function useGatheringDetail({ id }: { id: string }) {
  const router = useRouter();
  return useQuery({
    queryKey: ["gathering/detail", id],
    queryFn: () => getGatheringDetail({ gatheringId: id }),
    retry: (failureCount, error) => {
      if (failureCount === 7) {
        return false;
      } else if (error) {
        lightyToast.error("약속을 찾을 수 없어요 다시 시도해 주세요");
        router.back();
        return false;
      }
      return true;
    },
  });
}
