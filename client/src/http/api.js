import axios from "axios";

const { SERVER_URL = "http://localhost:4000" } = process.env || {};

export const api = axios.create({
  withCredentials: true,
  baseURL: SERVER_URL,
});

api.interceptors.request.use((req) => {
  req.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
  return req;
});

api.interceptors.response.use(
  (config) => config,

  async (error) => {
    const originalRequest = error?.config;

    if (
      error?.response?.status === 401 &&
      originalRequest &&
      !originalRequest._isRetry
    ) {
      originalRequest._isRetry = true;
      try {
        await refreshToken();
        return api.request(originalRequest);
      } catch (e) {
        console.log("Unauthorized");
        localStorage.removeItem("token");
      }
    }

    throw new Error(error?.response?.data?.message);
  }
);

export const refreshToken = async () => {
  const response = await axios.get(`${SERVER_URL}/refresh`, {
    withCredentials: true,
  });
  localStorage.setItem("token", response?.data?.accessToken);
};
