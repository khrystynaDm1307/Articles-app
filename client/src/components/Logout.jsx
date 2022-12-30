import { useMutation } from "react-query";
import { logout } from "../services/auth.service";
import { LoadingButton } from "@mui/lab";
import { useNavigate } from "react-router-dom";

export const Logout = () => {
  const { mutate, isLoading } = useMutation(logout);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    mutate(
      {},
      {
        onSuccess: () => {
          navigate("/login");
        },
      }
    );
  };

  return (
    <LoadingButton color="inherit" onClick={handleLogout} loading={isLoading}>
      Log out
    </LoadingButton>
  );
};
