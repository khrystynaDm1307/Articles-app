import { GeneralError } from "./general.error.js";

export class ForbiddenError extends GeneralError {
    constructor(message, code = 403) {
      super(message);
      this.code = code;
    }
  }
  