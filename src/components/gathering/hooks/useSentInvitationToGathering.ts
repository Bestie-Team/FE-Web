import { getSentInvitationToGatheringList } from "@/remote/gathering";
import { useQuery } from "@tanstack/react-query";

export default function useSentInvitationToGathering({
  cursor,
  limit,
  minDate,
  maxDate,
}: {
  cursor: string;
  limit: number;
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
    queryFn: async () => {
      const result = await getSentInvitationToGatheringList({
        cursor,
        limit,
        minDate,
        maxDate,
      });
      if (!result) {
        throw new Error("Failed getting sentInvitation To Gathering");
      } else return result;
    },
    throwOnError: true,
  });
}
