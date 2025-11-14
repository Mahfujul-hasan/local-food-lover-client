import axios from "axios";
import useAuth from "./useAuth";
import { useEffect } from "react";
import { useNavigate } from "react-router";

const instance = axios.create({
  baseURL: "http://localhost:3000",
});

const useAxiosSecure = () => {
  const { user, logOut } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    // request interceptors
    const requestInterceptor = instance.interceptors.request.use((config) => {
        const token = user.accessToken;
      if (token) {
        config.headers.Authorization = `Bearer ${user.accessToken}`;
      }
      return config;
    });

    // Response interceptors
    const responseInterceptor = instance.interceptors.response.use(
      (response) => {
        return response;
      },
      (err) => {
        const status = err.status;
        if (status === 401 || status === 403) {
          logOut().then(() => {
            navigate("/");
          });
        }
      }
    );

    return () => {
      instance.interceptors.request.eject(requestInterceptor);
      instance.interceptors.response.eject(responseInterceptor);
    };
  }, [user, logOut, navigate]);

  return instance;
};
export default useAxiosSecure;
