import { updateGroup } from "@/remote/group";
import { useMutation } from "@tanstack/react-query";
import { UpdateGroupRequest } from "@/models/group";

export default function useUpdateGroup({
  group,
  groupId,
  onSuccess,
}: {
  group: Omit<UpdateGroupRequest, "groupId">;
  groupId: string;
  onSuccess: (data: { message: string }) => void;
}) {
  return useMutation({
    mutationKey: ["make/group", group.description],
    mutationFn: () => updateGroup({ group, groupId }),
    onSuccess: (data) => onSuccess(data),
  });
}
