import * as lighty from "lighty-type";
import { postReport } from "@/remote/report";
import { useMutation } from "@tanstack/react-query";

export default function useReport({
  report,
  onSuccess,
  onError,
}: {
  report: { reportedId: string; type: lighty.ReportTypes };
  onSuccess: (data: { message: string }) => void;
  onError: (error: Error) => void;
}) {
  return useMutation({
    mutationKey: ["report"],
    mutationFn: (reason: { reason: string }) =>
      postReport({ report: { ...report, ...reason } }),
    onSuccess: (data: { message: string }) => onSuccess(data),
    onError: (error: Error) => onError(error),
  });
}
