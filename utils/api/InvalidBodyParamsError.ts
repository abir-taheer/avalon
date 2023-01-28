import { ApiHandlerError } from "@/utils/api/ApiHandlerError";

export class InvalidBodyParamsError extends ApiHandlerError {
  constructor() {
    super({
      code: "invalid-argument",
      message: "The request body is invalid",
      status: 400,
    });
  }
}
