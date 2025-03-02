import type { ReasonPhrases, StatusCodes } from "http-status-codes";

export default class AppError extends Error {
  constructor(
    public statusCode: StatusCodes,
    public message: string,
    public errorCode?: ReasonPhrases,
  ) {
    super(message);
  }
}
