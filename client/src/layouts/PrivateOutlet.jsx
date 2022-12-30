
import { useQuery } from "react-query";
import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";
import { Loader } from "../components/Loader";
import { useStateContext } from "../context";
import { checkAuth } from "../services/auth.service";
import { useAuth } from "../utills/hooks/useAuth";

export function PrivateOutlet() {
  const { user } = useAuth();
  const location = useLocation();
  const stateContext = useStateContext();
  const navigate = useNavigate();

  const { isLoading, isFetching } = useQuery("checkAuth", checkAuth, {
    onSuccess: (data) => {
      localStorage.setItem("token", data.accessToken);
      stateContext.dispatch({ type: "SET_USER", payload: data });
    },
    onError: (err) => {
      navigate("/login");
      localStorage.removeItem("token");
      stateContext.dispatch({ type: "SET_USER", payload: null });
    },
    retry: false,
  });

  if (isLoading || isFetching) return <Loader />;

  return user ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} />
  );
}
