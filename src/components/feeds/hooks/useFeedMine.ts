import { getFeedMine } from "@/remote/feed";
import { useQuery } from "@tanstack/react-query";

export default function useFeedMine({
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
    queryKey: [
      "get/feeds/mine",
      {
        order,
        minDate: minDate.slice(0, 10),
        maxDate: maxDate.slice(0, 10),
        limit,
      },
    ],
    queryFn: () => getFeedMine({ order, minDate, maxDate, limit }),
    throwOnError: true,
  });
}
