import { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import Spinner from "../../../components/Spinner";
import { useAuth } from "../../../hooks/auth";
import { ArrowLeft } from "lucide-react";
import Sidebar from "../../../components/Sidebar";
import Header from "../../../components/Header";

export default function UNotificationDetails() {
  const { authStatus, loading } = useAuth();
  const [notification, setNotification] = useState(null);
  const [error, setError] = useState(null);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const notificationId = searchParams.get("id"); // Extract notification ID from URL

  useEffect(() => {
    if (authStatus && notificationId) {
      const fetchNotification = async () => {
        try {
          const response = await fetch(`http://localhost:3000/notifications/getNotification/${notificationId}`, {
            method: "GET",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
          });

          if (response.ok) {
            const data = await response.json();
            setNotification(data[0]);
          } else {
            setError("Failed to load notification details.");
          }
        } catch (error) {
          console.error("Failed to fetch notification", error);
          setError("An error occurred while fetching notification details.");
        }
      };

      fetchNotification();
    }
  }, [authStatus, notificationId]);

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  if (loading) return <Spinner />;
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="flex flex-col min-h-screen">
      <Header onMenuClick={toggleSidebar} />
      <div className="flex flex-1">
        <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
        <div className="flex-1 p-8">
          <header className="flex items-center justify-between mb-8">
            <Link
              to="/notifications"
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium  rounded-lg"
            >
              <ArrowLeft className="h-5 w-5" />
              Back to Notifications
            </Link>
          </header>
  
          {error ? (
            <div className="text-center text-red-500">{error}</div>
          ) : !notification ? (
            <Spinner />
          ) : (
            <div className="p-8 shadow-md rounded-lg">
              <h1 className="text-3xl font-semibold  mb-4">{notification.title}</h1>
              <p className="text-sm mb-6">
                <span className="font-medium">Label: </span>{notification.label || "Announcement"}
              </p>
  
              <h2 className="text-lg font-medium mb-2">Details</h2>
              <p className="mb-6">{notification.description}</p>
  
              <div className="text-sm">
                <div className="mb-4">
                  <span className="font-medium">Timestamp: </span>{notification.time || "N/A"}
                </div>
                <div>
                  <span className="font-medium">Created By: </span>{notification.created_by || "Admin"}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
  
}
