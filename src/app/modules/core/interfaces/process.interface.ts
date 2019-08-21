import { ProcessStatus } from "../enums/process-status.enum";

export interface ProcessInterface {
  error: null | string;
  entity: null | string;
  action: null | string;
  status: ProcessStatus;
}
