import { getFeedDetail } from "@/remote/feed";
import { useQuery } from "@tanstack/react-query";

export default function useFeedDetail({ id }: { id: string }) {
  return useQuery({
    queryKey: ["feed/detail", id],
    queryFn: () => getFeedDetail({ feedId: id }),
    refetchOnWindowFocus: true,
    enabled: !!id,
  });
}
