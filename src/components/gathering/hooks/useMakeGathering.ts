import { CreateGatheringRequest } from "@/models/gathering";
import { postGathering } from "@/remote/gathering";
import { useMutation } from "@tanstack/react-query";

export default function useMakeGathering({
  gathering,
}: {
  gathering: CreateGatheringRequest;
}) {
  return useMutation({
    mutationKey: ["make/gathering", gathering.name, gathering.description],
    mutationFn: () => postGathering({ gathering }),
  });
}
