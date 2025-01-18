import { getFeeds } from "@/remote/feed";
import { useQuery } from "@tanstack/react-query";

export default function useFeed({
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
    queryKey: ["get/feeds", { order, minDate, maxDate, limit }],
    queryFn: () => getFeeds({ order, minDate, maxDate, limit }),
    throwOnError: true,
  });
}
