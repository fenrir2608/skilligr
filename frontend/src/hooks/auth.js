import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

export const useAuth = (whitelist = [], isProtected = false) => {
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

    if (whitelist.includes(currentPath)) {
      setLoading(false);
      return;
    }

    if (token) {
      //navigate("/");
      setLoading(false);
      return;
    }

    if (!token && isProtected) {
      navigate("/login");
      setLoading(false);
      return;
    }

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
          if (isProtected) {
            navigate("/login");
          }
        }
      } catch (error) {
        console.error("Error verifying token:", error);
        if (isProtected) {
          navigate("/login");
        }
      } finally {
        setLoading(false);
      }
    };

    verifyToken();
  }, [location.pathname]);

  return { authStatus, loading };
};
