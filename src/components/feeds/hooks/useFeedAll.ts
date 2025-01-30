import { getFeedAll } from "@/remote/feed";
import { useQuery } from "@tanstack/react-query";

export default function useFeedAll({
  order,
  minDate,
  maxDate,
  limit,
}: {
  order: "DESC" | "ASC";
  minDate: string;
  maxDate: string;
  limit: number;
}) {
  return useQuery({
    queryKey: ["get/feeds/all"],
    queryFn: () => getFeedAll({ order, minDate, maxDate, limit }),
    refetchOnWindowFocus: "always",
    throwOnError: true,
  });
}
