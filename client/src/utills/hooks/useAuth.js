import { useMemo } from "react";
import { useStateContext } from "../../context";

export const useAuth = () => {
  const stateContext = useStateContext();
  const { user } = stateContext.state?.authUser||{};

  return useMemo(() => ({ user }), [user]);
};
