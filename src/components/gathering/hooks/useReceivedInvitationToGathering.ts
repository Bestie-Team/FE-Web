import { getReceivedInvitationToGatheringList } from "@/remote/gathering";
import { useQuery } from "@tanstack/react-query";
import * as lighty from "lighty-type";

export default function useReceivedInvitationToGathering({
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
      "received",
      "gathering/invitation",
      { cursor, limit },
      { minDate, maxDate },
    ],
    queryFn: async () => {
      const result = await getReceivedInvitationToGatheringList({
        cursor,
        limit,
        minDate,
        maxDate,
      });
      if (!result) {
        throw new Error("Failed getting receivedInvitation To Gathering");
      } else return result;
    },
    throwOnError: true,
  });
}
