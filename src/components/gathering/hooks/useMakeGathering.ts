import { postGathering } from "@/remote/gathering";
import { useMutation } from "@tanstack/react-query";
import * as lighty from "lighty-type";

export default function useMakeGathering({
  gathering,
}: {
  gathering: lighty.CreateGatheringRequest;
}) {
  return useMutation({
    mutationKey: ["make/gathering", gathering.name, gathering.description],
    mutationFn: () => postGathering({ gathering }),
  });
}
