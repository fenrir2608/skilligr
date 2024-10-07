import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAuth } from "../../../hooks/auth";
import Spinner from "../../../components/Spinner";
import Sidebar from "../../../components/Sidebar";
import Header from "../../../components/Header";

export default function EventPosts() {
  const { authStatus, loading } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [events, setEvents] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('http://localhost:3000/events/getAll', {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        
        if (!response.ok) {
          const text = await response.text();
          setError(text || 'Failed to fetch events');
          return;
        }

        const data = await response.json();
        console.log(data);
        setEvents(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchEvents();
  }, [authStatus]);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  if (loading) return <Spinner />;

  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      <div className="flex-1">
        <Header onMenuClick={toggleSidebar} />
        <section className="py-12 md:py-16 lg:py-20">
          <div className="container px-4 md:px-6">
            <h2 className="mb-8 text-2xl font-bold md:text-3xl lg:text-4xl">Upcoming Events</h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {events.map((event) => (
                <Link
                  key={event.id}
                  to={`/events/details/?id=${event.id}`} // Navigate to event details
                  className="group relative block overflow-hidden rounded-lg shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
                >
                  <div className="absolute inset-0 z-10">
                    <span className="sr-only">View event details</span>
                  </div>
                  <div className="bg-background p-4">
                    <h3 className="mb-2 text-lg font-bold">{event.title}</h3>
                    <p className="mb-4 text-sm text-muted-foreground">{event.description}</p>
                    <div className="flex items-center justify-between">
                    <span className="rounded-md bg-primary px-2 py-1 text-xs font-medium text-primary-foreground">
                      Created by: {event.created_by_name}
                    </span>

                      <ArrowRight className="h-4 w-4 text-muted-foreground transition-all duration-300 group-hover:translate-x-1" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
