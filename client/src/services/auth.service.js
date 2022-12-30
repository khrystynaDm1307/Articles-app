import { api } from "../http/api";

export const login = async (credentials) => {
  const response = await api.post("/auth/login", credentials);
  return response.data;
};

export const signUp = async (credentials) => {
  return api.post("/auth/signup", credentials);
};

export const logout = async () => {
  return api.post("/auth/logout");
};

export const checkAuth = async () => {
  const response = await api.get("/auth/refresh", { withCredentials: true });
  return response.data;
};
