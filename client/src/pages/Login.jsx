import { Stack, Typography } from "@mui/material";
import { useFormik } from "formik";
import { useMutation } from "react-query";
import { Link, useNavigate } from "react-router-dom";
import { AuthLayout } from "../layouts/AuthLayout";
import { login } from "../services/auth.service";
import { LoadingButton } from "@mui/lab";
import validationSchema from "../utills/validators/login.schema";
import { useStateContext } from "../context";
import { Input } from "../components/Input";
import { useState } from "react";

const initialValues = {
  email: "hrystynka.dm@gmail.com",
  password: "Demchyna1307*",
};

export function Login() {
  const navigate = useNavigate();
  const loginMutation = useMutation(login);
  const stateContext = useStateContext();
  const [serverError, setError] = useState("");

  const handleSubmit = async (values, formik) => {
    loginMutation.mutate(values, {
      onSuccess: (res) => {
        localStorage.setItem("token", res.accessToken);
        stateContext.dispatch({ type: "SET_USER", payload: res });
        navigate("/posts");
        setError("");
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
          <Typography variant="h4">Welcome!</Typography>
          <Input formik={formik} name="email" />
          <Input formik={formik} name="password" type="password" />
          <Typography color="error">{serverError}</Typography>
          <LoadingButton
            color="primary"
            variant="contained"
            fullWidth
            type="submit"
            loading={loginMutation.isLoading}
          >
            Sign In
          </LoadingButton>
          <Typography>
            No account?{" "}
            <Link to="/signup">
              <Typography component={"span"} fontWeight={600}>
                Sign Up!
              </Typography>
            </Link>
          </Typography>
        </Stack>
      </form>
    </AuthLayout>
  );
}
