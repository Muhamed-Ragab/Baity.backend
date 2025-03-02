import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { MulterError } from "multer";
import { z } from "zod";

import AppError from "@/utils/app-error";
import type { ErrorHandler } from "hono";
import type { ContentfulStatusCode } from "hono/utils/http-status";

type ResponseError = {
  statusCode: ContentfulStatusCode;
  message: string;
  errorCode: string;
};

const handleErrors = (error: unknown): ResponseError => {
  if (error instanceof z.ZodError) {
    const errors = error.issues.map((err) => ({
      path: err.path.join("."),
      message: err.message,
    }));

    return {
      statusCode: StatusCodes.BAD_REQUEST,
      message: `${errors[0].path} ${errors[0].message}`,
      errorCode: ReasonPhrases.BAD_REQUEST,
    };
  }

  if (error instanceof MulterError) {
    return {
      statusCode: StatusCodes.BAD_REQUEST,
      message: error.message,
      errorCode: error.code,
    };
  }

  if (error instanceof AppError) {
    return {
      statusCode: error.statusCode as ContentfulStatusCode,
      message: error.message,
      errorCode: error.errorCode || ReasonPhrases.INTERNAL_SERVER_ERROR,
    };
  }

  if (error instanceof Error) {
    return {
      statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
      message: error.message,
      errorCode: ReasonPhrases.INTERNAL_SERVER_ERROR,
    };
  }

  return {
    statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
    message: "Something went wrong",
    errorCode: ReasonPhrases.INTERNAL_SERVER_ERROR,
  };
};

export const errorHandler: ErrorHandler = (error, c) => {
  const responseError = handleErrors(error);

  console.error(
    `[${new Date().toISOString()}] ${responseError.errorCode} - ${responseError.message}`,
  );

  return c.json(responseError, responseError.statusCode);
};
