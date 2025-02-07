import { ReportRequestInterface } from "@/models/remote";
import { postReport } from "@/remote/report";
import { useMutation } from "@tanstack/react-query";

export default function useReport({
  report,
  onSuccess,
  onError,
}: {
  report: ReportRequestInterface;
  onSuccess: (data: { message: string }) => void;
  onError: (error: Error) => void;
}) {
  return useMutation({
    mutationKey: ["report"],
    mutationFn: () => postReport({ report }),
    onSuccess: (data: { message: string }) => onSuccess(data),
    onError: (error: Error) => onError(error),
  });
}
