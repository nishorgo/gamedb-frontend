import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { ACCESS_TOKEN } from "../constants";
import Layout from "../pages/Layout";
import { useAuthStore } from "../stores/authStore";
import { axiosInstance } from "../services/api-client";

interface JwtPayload {
    token_type: "access" | "refresh";
    exp: number;
    iat: number;
  }
  

const ProtectedRoutes = () => {
  const {isAuthenticated, logout, refresh} = useAuthStore();

  useEffect(() => {
    const handleAuth = async () => {
      try {
        const token = Cookies.get(ACCESS_TOKEN);

        if (!token) {
            logout();
            return;
        }

        const decoded = jwtDecode<JwtPayload>(token);
        const tokenExpiration = decoded.exp;
        const now = Date.now() / 1000;

        if (tokenExpiration < now) {
          await refresh();
        } else {
          axiosInstance.interceptors.request.use(
            (config) => {
              config.headers.Authorization = `JWT ${token}`; 
              return config;
            },
            (error) => Promise.reject(error)
        );
        }
      } catch (error) {
          console.error('Authentication error:', error);
          logout();
      }
    };

    handleAuth();
  }, []);


  if (!isAuthenticated)
    return <Navigate to="/login" replace />;

  return (
    <>
      <Layout />
    </>
  ) 
}

export default ProtectedRoutes;