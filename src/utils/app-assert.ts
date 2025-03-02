import type { ReasonPhrases, StatusCodes } from "http-status-codes";
import assert from "node:assert";
import AppError from "./app-error";

type AppAssert = (
  condition: any,
  httpStatusCode: StatusCodes,
  message: string,
  appErrorCode?: ReasonPhrases,
) => asserts condition;
/**
 * Asserts a condition and throws an AppError if the condition is falsy.
 */
const appAssert: AppAssert = (
  condition,
  httpStatusCode,
  message,
  appErrorCode,
) => assert(condition, new AppError(httpStatusCode, message, appErrorCode));

export default appAssert;
