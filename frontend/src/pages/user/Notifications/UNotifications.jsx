import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Link, useNavigate } from "react-router-dom";
import Spinner from "../../../components/Spinner";
import { useAuth } from "../../../hooks/auth";
import { Filter, Search } from "lucide-react";
import Sidebar from "../../../components/Sidebar";
import Header from "../../../components/Header";
import { useState, useEffect } from "react";

export default function UNotifications() {
  const { authStatus, loading } = useAuth();
  const [notifications, setNotifications] = useState([]);
  const [noNotificationsMessage, setNoNotificationsMessage] = useState(null);
  const navigate = useNavigate();  // Use the navigate hook

  useEffect(() => {
    if (authStatus) {
      const fetchNotifications = async () => {
        try {
          const response = await fetch("http://localhost:3000/notifications/getNotifications", {
            method: "GET",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
          });

          if (response.ok) {
            const data = await response.json();
            setNotifications(data); // Assuming this is a valid array of notifications
          } else if (response.status === 401) {
            setNoNotificationsMessage("You are not authorized to view notifications.");
          } else {
            const text = await response.text();
            if (text === "No notifications.") {
              setNoNotificationsMessage("No notifications available.");
            } else {
              console.error("Unexpected response:", text);
            }
          }
        } catch (error) {
          console.error("Failed to fetch notifications", error);
        }
      };

      fetchNotifications();
    }
  }, [authStatus]);

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  if (loading) return <Spinner />;
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  // Function to handle card click and navigate to details page
  const handleCardClick = (id) => {
    navigate(`/notifications/details/?id=${id}`);
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} className="h-screen" />
      <div className="flex flex-col flex-1 min-h-screen">
        <Header onMenuClick={toggleSidebar} />
        <div className="flex-1 overflow-auto">
          <div className="flex flex-col gap-12 py-12 md:py-16 lg:py-22">
            <section className="container px-4 md:px-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Notifications</h2>
                <div className="flex items-center gap-4">
                  <div className="relative w-full max-w-md">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input type="search" placeholder="Search notifications..." className="pl-10 w-full" />
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" className="flex items-center gap-2">
                        <Filter className="h-5 w-5" />
                        <span>Sort</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Sort by</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuRadioGroup value="newest">
                        <DropdownMenuRadioItem value="newest">Newest</DropdownMenuRadioItem>
                        <DropdownMenuRadioItem value="oldest">Oldest</DropdownMenuRadioItem>
                        <DropdownMenuRadioItem value="label">Label</DropdownMenuRadioItem>
                      </DropdownMenuRadioGroup>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </section>

            <section className="container px-4 md:px-6">
            {notifications.length === 0 ? (
                  <p className="col-span-3 text-center text-lg text-muted-foreground">
                    {noNotificationsMessage || "No notification available"}
                  </p>
                ) : (
                <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                  {notifications.map((notification, index) => (
                    <Card key={index} onClick={() => handleCardClick(notification.id)} className="cursor-pointer">
                      <CardHeader className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Avatar className="w-8 h-8">
                            <AvatarImage src="" alt="Admin" />
                            <AvatarFallback>
                              {notification.created_by
                                ? notification.created_by
                                    .split(" ")
                                    .map((name) => name[0])
                                    .join("")
                                : "A"}
                            </AvatarFallback>
                          </Avatar>
                          <div className="font-medium">{notification.created_by || "Admin"}</div>
                        </div>
                        <Badge variant="secondary" className="text-xs">
                          {notification.label || "Announcement"}
                        </Badge>
                      </CardHeader>
                      <CardContent>
                        <p>{notification.description}</p>
                      </CardContent>
                      <CardFooter className="text-xs text-muted-foreground">
                        {notification.time || "Just now"}
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              )}
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
