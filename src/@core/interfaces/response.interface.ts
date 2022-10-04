import { ResponseMessageType, StatusCodeType } from "../../constants";

export type ResponseBody<T> = {
  statusCode: StatusCodeType;
  message: ResponseMessageType;
  data?: T | null;
};
