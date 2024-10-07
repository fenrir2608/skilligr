import { useState, useEffect } from "react";
import { useAuth } from "../../../hooks/auth";
import { useLocation } from "react-router-dom";
import Spinner from "../../../components/Spinner";
import Sidebar from "../../../components/Sidebar";
import Header from "../../../components/Header";
import { Button } from "@/components/ui/button";

export default function EventDetail() {
  const { authStatus, loading } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [eventDetails, setEventDetails] = useState(null);
  const [noEventMessage, setNoEventMessage] = useState(null); // For showing no event message
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get("id"); // Extract event ID from URL

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const response = await fetch(`http://localhost:3000/events/get/${id}`, {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const data = await response.json();
          if (data.length === 0) {
            setNoEventMessage("No event available.");
          } else {
            setEventDetails(data[0]);
          }
        } else {
          setNoEventMessage("Failed to load event details.");
        }
      } catch (error) {
        console.error("Failed to fetch event details", error);
        setNoEventMessage("An error occurred while fetching event details.");
      }
    };

    if (authStatus && id) {
      fetchEventDetails();
    }
  }, [authStatus, id]);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  if (loading) return <Spinner />;

  return (
    <div className="flex">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      <div className="flex-1 flex flex-col">
        <Header onMenuClick={toggleSidebar} />
        <section className="py-12 md:py-16 lg:py-20 flex justify-center">
          <div className="container px-4 md:px-6 max-w-2xl">
            <div className="grid grid-cols-1 gap-8">
              {/* If no event message is available, display it */}
              {noEventMessage ? (
                <p className="text-center text-lg text-muted-foreground">
                  {noEventMessage}
                </p>
              ) : !eventDetails ? (
                <Spinner /> // Show spinner while loading details
              ) : (
                <>
                  <div className="text-center">
                    <h1 className="text-3xl font-bold mb-4">{eventDetails.title}</h1>
                    <p className="text-muted-foreground mb-6">{eventDetails.description}</p>
                    <div className="flex flex-col items-center justify-center mb-6 space-y-4">
                      <div>
                        <p className="text-sm font-medium mb-1">Scheduled At:</p>
                        <p className="text-lg font-bold">
                          {new Date(eventDetails.scheduled_at).toLocaleString()}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm font-medium mb-1">Ends At:</p>
                        <p className="text-lg font-bold">
                          {new Date(eventDetails.ends_at).toLocaleString()}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm font-medium mb-1">Location</p>
                        <p className="text-lg font-bold">{eventDetails.location || "Venue details not available"}</p>
                      </div>
                    </div>
                    <Button
                      onClick={() => window.open(eventDetails.event_link, "_blank")}
                      className="w-full py-2 rounded-md transition duration-300"
                    >
                      Join Event
                    </Button>
                  </div>

                  <div className="mt-8 md:mt-12 lg:mt-16">
                    <h2 className="text-2xl font-bold mb-4">Event Details</h2>
                    <div className="prose text-muted-foreground">
                      <p>{eventDetails.description}</p>
                      <p>
                        This event is created by <strong>{eventDetails.created_by_name}</strong>.
                      </p>
                      <p>We encourage attendees to check the event link for updates and pre-event activities.</p>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
