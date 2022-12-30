import { GeneralError } from "./general.error.js";

export class UnauthorizedError extends GeneralError {
  constructor(message = "Unauthorized", code = 401) {
    super(message);
    this.code = code;
  }
}
