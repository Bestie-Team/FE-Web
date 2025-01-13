import { getReceivedInvitationToGatheringList } from "@/remote/gathering";
import { useQuery } from "@tanstack/react-query";

export default function useReceivedInvitationToGathering({
  cursor,
  limit,
  minDate,
  maxDate,
}: {
  cursor: string;
  limit: string;
  minDate: string;
  maxDate: string;
}) {
  return useQuery({
    queryKey: [
      "received",
      "gathering/invitation",
      { cursor, limit },
      { minDate, maxDate },
    ],
    queryFn: () =>
      getReceivedInvitationToGatheringList({ cursor, limit, minDate, maxDate }),
  });
}
