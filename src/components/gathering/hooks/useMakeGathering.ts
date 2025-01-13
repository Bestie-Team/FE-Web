import { GatheringInfo } from "@/models/gathering";
import { postGathering } from "@/remote/gathering";
import { useMutation } from "@tanstack/react-query";

export default function useMakeGathering({
  gathering,
}: {
  gathering: GatheringInfo;
}) {
  return useMutation({
    mutationKey: ["make/gathering", gathering.name],
    mutationFn: () => postGathering({ gathering }),
  });
}
