import { getGatherings } from "@/remote/gathering";
import { useQuery } from "@tanstack/react-query";

/** 첫 커서는 minDate */
export default function useGatherings({
  cursor,
  limit,
  minDate,
  maxDate,
}: {
  cursor: string | null;
  limit: number;
  minDate: string;
  maxDate: string;
}) {
  return useQuery({
    queryKey: ["gatherings", { minDate, maxDate }],
    queryFn: () => getGatherings({ cursor, limit, minDate, maxDate }),
  });
}
