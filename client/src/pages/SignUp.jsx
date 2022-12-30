import { Stack, Typography } from "@mui/material";
import { useFormik } from "formik";
import { useMutation } from "react-query";
import { Link, useNavigate } from "react-router-dom";
import { AuthLayout } from "../layouts/AuthLayout";
import { signUp } from "../services/auth.service";
import validationSchema from "../utills/validators/signup.schema";
import { LoadingButton } from "@mui/lab";
import { Input } from "../components/Input";
import { useState } from "react";

const initialValues = {
  email: "",
  password: "",
};

export function SignUp() {
  const signUpMutation = useMutation(signUp);
  const navigate = useNavigate();
  const [serverError, setError] = useState("");

  const handleSubmit = async (values) => {
    signUpMutation.mutate(values, {
      onSuccess: () => {
        navigate("/login");
      },
      onError: (err) => {
        setError(err.message);
      },
    });
  };

  const formik = useFormik({
    initialValues,
    onSubmit: handleSubmit,
    validationSchema,
  });

  return (
    <AuthLayout>
      <form onSubmit={formik.handleSubmit}>
        <Stack spacing={3}>
          <Typography variant="h4">Create account</Typography>
          <Input formik={formik} name="email" />
          <Input formik={formik} name="password" type="password" />
          <Typography color="error">{serverError}</Typography>
          <LoadingButton
            color="primary"
            variant="contained"
            fullWidth
            type="submit"
            loading={signUpMutation.isLoading}
          >
            Sign Up
          </LoadingButton>
          <Typography>
            Already have account?{" "}
            <Link to="/login">
              <Typography component={"span"} fontWeight={600}>
                Login!
              </Typography>
            </Link>
          </Typography>
        </Stack>
      </form>
    </AuthLayout>
  );
}
