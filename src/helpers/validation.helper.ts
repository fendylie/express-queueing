import { ValidationError, validate } from "class-validator";
import { NextFunction } from "express";
import { Request, Response } from "express";
import { ResponseMessageType, StatusCodeType } from "../constants";

type Error = {
  [key: string]: string[];
};

export const formatValidation = (errors: ValidationError[]) => {
  const formattedErrors: Error = {};

  if (errors.length > 0) {
    errors.forEach((error) => {
      Object.assign(formattedErrors, {
        [error.property]: Object.keys(error.constraints || {}).map(
          (constraint) => {
            if (error.constraints !== undefined) {
              return error.constraints[constraint];
            }
          }
        ),
      });
    });
  }

  return formattedErrors;
};

export const validateInput = (DataTransferObject: any) => {
  return async function (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const validationErrors: ValidationError[] = await validate(
      Object.assign(new DataTransferObject(), req.body)
    );

    if (validationErrors.length > 0) {
      const errors = formatValidation(validationErrors);

      res.status(StatusCodeType.BAD_REQUEST).json({
        statusCode: StatusCodeType.BAD_REQUEST,
        message: ResponseMessageType.VALIDATION_ERRORS,
        errors: errors,
      });

      return;
    }

    next();
  };
};
