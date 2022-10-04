export type JOB_STATUS = "FAILED" | "SUCCESS" | "PROCESS";
export const JOB_STATUS_ARRAY = ["FAILED", "SUCCESS", "PROCESS"];

export enum ResponseMessageType {
  INTERNAL_SERVER_ERROR = "Internal server error",
  SUCCESS_CREATE_DATA = "Successfully created data",
  SUCCESS_UPDATE_DATA = "Successfully updated data",
  SUCCESS_FETCH_DATA = "Successfully fetch data",
  VALIDATION_ERRORS = "Validation errors",
  NOT_FOUND = "Not found",
}

export enum StatusCodeType {
  OK = 200,
  CREATED = 201,
  UNAUTHORIZED = 401,
  BAD_REQUEST = 400,
  NOT_FOUND = 404,
  INTERNAL_SERVER_ERROR = 500,
}
