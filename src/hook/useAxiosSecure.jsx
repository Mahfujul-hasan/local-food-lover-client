// import axios from "axios";

import axios from "axios";
import { useNavigate } from "react-router";
import useAuth from "./useAuth";
import { useEffect } from "react";



const instance = axios.create({
  baseURL: "https://local-food-network.vercel.app",
});
const useAxiosSecure = () => {
  const navigate = useNavigate();
  const { logOut, user } = useAuth();
  useEffect(() => {
    // request interceptor
    const reqInterceptor = instance.interceptors.request.use((config) => {
      const token = localStorage.getItem('accessToken');
      if(token){

        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });

    // response interceptor
    const resInterceptor = instance.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        const statusCode = error.response?.status;

        if (statusCode === 401 || statusCode === 403) {
          logOut().then(() => {
            navigate("/login");
          });
        }
        return Promise.reject(error);
      }
    );

    return () => {
      instance.interceptors.request.eject(reqInterceptor);
      instance.interceptors.response.eject(resInterceptor);
    };
  }, [user, logOut, navigate]);
  return instance;
};

export default useAxiosSecure;