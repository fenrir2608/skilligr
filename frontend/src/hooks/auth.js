import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

export const useAuth = (publicRoutes = []) => {
  const [authStatus, setAuthStatus] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const currentPath = location.pathname;
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("token="))
      ?.split("=")[1];

    const verifyToken = async () => {
      try {
        const response = await fetch("http://localhost:3000/user/verifyCookie", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token }),
        });

        const data = await response.json();
        if (data.success) {
          setAuthStatus({
            success: true,
            message: data.message,
            fullName: data.full_name,
            role: data.role,
            status: data.status,
          });
        } else {
          setAuthStatus(null);
        }
      } catch (error) {
        console.error("Error verifying token:", error);
        setAuthStatus(null);
      } finally {
        setLoading(false);
      }
    };

    if (!token) {
      setAuthStatus(null);
      setLoading(false);
    } else {
      verifyToken();
    }
  }, [location.pathname]);

  return { 
    authStatus, 
    loading, 
    isPublicRoute: publicRoutes.includes(location.pathname) 
  };
};
