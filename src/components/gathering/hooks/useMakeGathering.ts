import { GatheringInfo } from "@/models/gathering";
import { postGathering } from "@/remote/gathering";
import { useQuery } from "@tanstack/react-query";

export default function useMakeGathering({
  gathering,
}: {
  gathering: GatheringInfo;
}) {
  return useQuery({
    queryKey: ["make/gathering", gathering.name],
    queryFn: () => postGathering({ gathering }),
  });
}
