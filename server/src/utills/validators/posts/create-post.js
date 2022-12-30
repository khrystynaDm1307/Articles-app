import Joi from "joi";
import { BadRequestError } from "../../errors/index.js";

export const linkRegExp =
  /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/;

export const postSchema = Joi.object({
  title: Joi.string()
    .max(255)
    .required()
    .error(new BadRequestError("Title is required")),
  creator: Joi.string().required(),
  contentSnippet: Joi.string()
    .min(0)
    .max(1000)
    .required()
    .error(new BadRequestError("Max is 1000 characters")),
  link: Joi.string()
    .regex(linkRegExp)
    .required()
    .error(new BadRequestError("Wrong link")),
  image: Joi.string()
    .required()
    .regex(linkRegExp)
    .error(new BadRequestError("Wrong link")),
});
