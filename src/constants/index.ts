export type JOB_STATUS = "FAILED" | "SUCCESS" | "PROCESS";

export enum ErrorMessageType {
  INTERNAL_SERVER_ERROR = "Internal server error",
  SUCCESS_CREATE_DATA = "Successfully created data",
  SUCCESS_UPDATE_DATA = "Successfully updated data",
  SUCCESS_FETCH_DATA = "Successfully fetch data",
}
