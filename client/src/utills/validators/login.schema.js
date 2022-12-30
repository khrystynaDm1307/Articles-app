import * as yup from "yup";

const validationSchema = yup.object({
  email: yup.string("Enter your email").required("Email is required"),
  password: yup.string("Enter your password").required("Password is required"),
});

export default validationSchema;
