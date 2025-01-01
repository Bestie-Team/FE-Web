import { getGatherings } from "@/remote/gathering";
import { useQuery } from "@tanstack/react-query";

export default function useGatherings() {
  return useQuery({ queryKey: ["gatherings"], queryFn: () => getGatherings() });
}
