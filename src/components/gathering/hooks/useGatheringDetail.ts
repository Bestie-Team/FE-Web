import { getGatheringDetail } from "@/remote/gathering";
import { useQuery } from "@tanstack/react-query";

export default function useGatheringDetail({
  id,
  enabled,
}: {
  id: string;
  enabled: boolean;
}) {
  return useQuery({
    queryKey: ["gathering/detail", id],
    queryFn: () => getGatheringDetail({ gatheringId: id }),
    enabled,
    // staleTime: 3600 * 1000,
  });
}
