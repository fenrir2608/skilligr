import { useState } from "react";
import { useAuth } from "../../../hooks/auth";
import Spinner from "../../../components/Spinner";
import Sidebar from "../../../components/Sidebar";
import Header from "../../../components/Header";
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom";

export default function EventDetail() {
  const event = {
    id: 1,
    title: "Annual Tech Conference",
    description: "Join us for a day of inspiring talks, insightful workshops, and valuable networking opportunities.",
    date: "June 15, 2023",
    time: "9:00 AM - 5:00 PM",
    location: "Acme Convention Center",
  }
  const { authStatus, loading } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  if (loading) return <Spinner />;

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  return (
    <div className="flex">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      <div className="flex-1 flex flex-col">
        <Header onMenuClick={toggleSidebar} />
        <section className="py-12 md:py-16 lg:py-20 flex justify-center">
          <div className="container px-4 md:px-6 max-w-2xl">
            <div className="grid grid-cols-1 gap-8">
              <div className="text-center">
                <h1 className="text-3xl font-bold mb-4">{event.title}</h1>
                <p className="text-muted-foreground mb-6">{event.description}</p>
                <div className="flex flex-col items-center justify-center mb-6 space-y-4">
                  <div>
                    <p className="text-sm font-medium mb-1">Date</p>
                    <p className="text-lg font-bold">{event.date}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium mb-1">Time</p>
                    <p className="text-lg font-bold">{event.time}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium mb-1">Location</p>
                    <p className="text-lg font-bold">{event.location}</p>
                  </div>
                </div>
                <Button className="w-full">Join Event</Button>
              </div>
            </div>
            <div className="mt-8 md:mt-12 lg:mt-16">
              <h2 className="text-2xl font-bold mb-4">Event Details</h2>
              <div className="prose text-muted-foreground">
                <p>
                  This event is a great opportunity to connect with like-minded individuals and learn more about the latest
                  trends in the industry. The event will feature a variety of speakers and workshops, as well as networking
                  opportunities.
                </p>
                <p>
                  The event will be held at the {event.location}, which is a state-of-the-art venue with ample parking and
                  easy access to public transportation. Refreshments and snacks will be provided throughout the day.
                </p>
                <p>
                  We encourage all attendees to arrive early and take advantage of the pre-event activities, which will
                  include a welcome reception and a guided tour of the venue.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}