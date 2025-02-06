import * as lighty from "lighty-type";

export interface ReportRequestInterface {
  reportedId: string;
  reason: string;
  type: lighty.ReportTypes;
}
