import { deleteUser } from "@/remote/users";
import { useMutation } from "@tanstack/react-query";

export default function useUserDelete({
  onSuccess,
  onError,
}: {
  onSuccess: () => void;
  onError: (error: string) => void;
}) {
  return useMutation({
    mutationKey: ["user/delete"],
    mutationFn: () => deleteUser(),
    onError: (error) => onError(error.message),
    onSuccess: () => onSuccess(),
  });
}
