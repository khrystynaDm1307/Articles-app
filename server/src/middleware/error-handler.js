import { GeneralError } from "../utills/errors/index.js";

export const handleErrors = (error, req, res, next) => {
  console.log(error);

  if (error instanceof GeneralError) {
    return res
      .status(error.code)
      .json({ success: false, message: error.message, code: error.code });
  }

  return res.status(500).json({
    success: false,
    message: "Something went wrong",
    code: 500,
  });
};
