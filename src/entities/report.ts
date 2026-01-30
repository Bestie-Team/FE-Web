import type * as lighty from "lighty-type";

export interface ReportRequestInterface {
  reportedId: string;
  reason: string;
  type: lighty.ReportTypes;
}

export type ReportTypes = lighty.ReportTypes;
