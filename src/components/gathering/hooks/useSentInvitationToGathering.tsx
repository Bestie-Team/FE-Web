import { getSentInvitationToGatheringList } from "@/remote/gathering";
import { useQuery } from "@tanstack/react-query";

export default function useSentInvitationToGathering({
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
      "sent",
      "gathering/invitation",
      { cursor, limit },
      { minDate, maxDate },
    ],
    queryFn: () =>
      getSentInvitationToGatheringList({ cursor, limit, minDate, maxDate }),
  });
}
