import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

export const useAuth = (publicRoutes = [], restrictedRoutes = []) => {
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

    // If the route is public, allow access
    if (publicRoutes.includes(currentPath)) {
      setLoading(false);
      return;
    }

    // If the route is restricted and the user is authenticated, redirect to home
    if (restrictedRoutes.includes(currentPath) && token) {
      navigate("/");
      setLoading(false);
      return;
    }

    // If the user is not authenticated and the route is not public, redirect to login
    if (!token && !publicRoutes.includes(currentPath)) {
      navigate("/login");
      setLoading(false);
      return;
    }

    // Verify token for authenticated users
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
          });
        } else {
          navigate("/login");
        }
      } catch (error) {
        console.error("Error verifying token:", error);
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };

    verifyToken();
  }, [location.pathname]);

  return { authStatus, loading };
};
