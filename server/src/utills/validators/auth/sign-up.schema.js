import Joi from "joi";
import { BadRequestError } from "../../errors/index.js";

export const signUpSchema = Joi.object({
  email: Joi.string()
    .email()
    .required()
    .error(
      new BadRequestError(
        "Please, enter correct email"
      )
    ),
  password: Joi.string()
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&_]/
    )
    .required()
    .error(
      new BadRequestError(
        "Password should contains at least one uppercase letter, one lowercase letter, one number and one special character"
      )
    ),
});
