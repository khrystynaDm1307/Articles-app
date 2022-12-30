import * as yup from "yup";

export const linkRegExp =
  /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/;

const validationSchema = yup.object({
  title: yup
    .string()
    .max(255, "Max 255 characters")
    .required("Title is required"),
  creator: yup
    .string()
    .required("Creator is required")
    .max(255, "Max 255 characters"),
  contentSnippet: yup
    .string()
    .required("Content is required")
    .max(1000, "Max 1000 characters"),
  link: yup
    .string()
    .required("Link is required")
    .max(255, "Max 255 characters")
    .matches(linkRegExp, "Wrong link"),
  image: yup
    .string()
    .required("Image is required")
    .max(255, "Max 255 characters")
    .matches(linkRegExp, "Wrong link"),
});

export default validationSchema;
