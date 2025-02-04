import { postGroup } from "@/remote/group";
import { useMutation } from "@tanstack/react-query";
import { CreateGroupRequest } from "@/models/group";

export default function useMakeGroup({
  group,
  onSuccess,
}: {
  group: CreateGroupRequest;
  onSuccess: (data: { message: string }) => void;
}) {
  return useMutation({
    mutationKey: ["make/group", group.description],
    mutationFn: () => postGroup({ group }),
    onSuccess: (data) => onSuccess(data),
  });
}
