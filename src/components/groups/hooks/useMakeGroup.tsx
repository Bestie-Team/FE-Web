import * as lighty from "lighty-type";
import { postGroup } from "@/remote/group";
import { useMutation } from "@tanstack/react-query";

export default function useMakeGroup({
  group,
  onSuccess,
}: {
  group: lighty.CreateGroupRequest;
  onSuccess: (data: { message: string }) => void;
}) {
  return useMutation({
    mutationKey: ["make/group", group.description],
    mutationFn: () => postGroup({ group }),
    onSuccess: (data) => onSuccess(data),
  });
}
