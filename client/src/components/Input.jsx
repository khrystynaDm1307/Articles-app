import { TextField } from "@mui/material";
import { capitalizeFirstLetter } from "../utills/helpers/capitalazeFirtsLetter";

export const Input = ({ formik={}, name, type, children, ...restProps }) => {
  return (
    <TextField
      fullWidth
      name={name || ""}
      label={capitalizeFirstLetter(name)}
      type={type || "text"}
      value={formik.values[name]}
      onChange={formik.handleChange}
      error={formik.touched[name] && Boolean(formik.errors[name])}
      helperText={formik.touched[name] && formik.errors[name]}
      {...restProps}
    >
      {children}
    </TextField>
  );
};
