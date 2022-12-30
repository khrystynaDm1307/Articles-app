import { GeneralError } from "./general.error.js";

export class BadRequestError extends GeneralError {
  constructor(message, code = 400) {
    super(message);
    this.code = code;
  }
}
