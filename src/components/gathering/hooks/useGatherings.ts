import { getGatherings } from "@/remote/gathering";
import { useQuery } from "@tanstack/react-query";
import { v4 as uuidv4 } from "uuid";
const uuid = uuidv4();

/** 첫 커서는 minDate */
export default function useGatherings({
  cursor,
  limit,
  minDate,
  maxDate,
}: {
  cursor?: { createdAt: string };
  limit: number;
  minDate: string;
  maxDate: string;
}) {
  return useQuery({
    queryKey: ["gatherings", { minDate, maxDate }],
    queryFn: () =>
      getGatherings({
        cursor: cursor
          ? { ...cursor, id: uuid }
          : { createdAt: minDate, id: uuid },
        limit,
        minDate,
        maxDate,
      }),
  });
}
