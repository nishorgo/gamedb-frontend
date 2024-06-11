import { jwtDecode } from "jwt-decode";
import { Navigate, Outlet } from "react-router-dom";
import { ACCESS_TOKEN } from "../constants";
import { useAuthStore } from "../stores/authStore";
import Cookies from "js-cookie";
import { useEffect } from "react";
import Layout from "../pages/Layout";

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