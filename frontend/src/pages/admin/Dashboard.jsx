import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useState } from "react";
import { useAuth } from "../../hooks/auth";
import Spinner from "../../components/Spinner";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import { Bell, Calendar, Users, ClipboardList } from "lucide-react";

// Dummy data for demonstration
const initialUsers = [
  { id: 1, name: "John Doe", approved: false },
  { id: 2, name: "Jane Smith", approved: false },
  { id: 3, name: "Sam Wilson", approved: false },
  { id: 4, name: "Emily Davis", approved: false },
];

export default function Dashboard() {
  const { authStatus, loading } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [users, setUsers] = useState(initialUsers); // Using dummy data

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const handleApprove = (id) => {
    // Update the user to approved in the local state
    setUsers(
      users.map((user) => (user.id === id ? { ...user, approved: true } : user))
    );
  };

  const handleReject = (id) => {
    // Remove the user from the list in the local state
    setUsers(users.filter((user) => user.id !== id));
  };

  if (loading) return <Spinner />;

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      <div
        className={`flex flex-col flex-1 ${
          isSidebarOpen ? "ml-64" : ""
        } overflow-auto`}
      >
        <Header onMenuClick={toggleSidebar} />
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6 overflow-auto">
          {/* Existing cards section */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">
                  Pending Approvals
                </CardTitle>
                <ClipboardList className="h-5 w-5 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">12</div>
                <p className="text-xs text-muted-foreground">
                  Awaiting approval
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Users
                </CardTitle>
                <Users className="h-5 w-5 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">1,234</div>
                <p className="text-xs text-muted-foreground">Active users</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">
                  New Notifications
                </CardTitle>
                <Bell className="h-5 w-5 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">7</div>
                <p className="text-xs text-muted-foreground">
                  Unread notifications
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">
                  New Events
                </CardTitle>
                <Calendar className="h-5 w-5 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">4</div>
                <p className="text-xs text-muted-foreground">Upcoming events</p>
              </CardContent>
            </Card>
          </div>

          {/* User Approval List Heading */}
          <h2 className="text-xl font-semibold mt-8">User Approval List</h2>

          {/* User Approval Section */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 mt-4">
            {users.length ? (
              users.map((user) => (
                <Card key={user.id}>
                  <CardHeader className="flex items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">
                      {user.name}
                    </CardTitle>
                    <p className="text-xs text-muted-foreground">
                      ID: {user.id}
                    </p>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <Button
                        onClick={() => handleApprove(user.id)}
                        disabled={user.approved}
                        variant="success"
                        className="text-white bg-green-500 hover:bg-green-600"
                      >
                        {user.approved ? "Approved" : "Approve"}
                      </Button>
                      <Button
                        onClick={() => handleReject(user.id)}
                        variant="destructive"
                      >
                        Reject
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <p className="text-sm text-muted-foreground">
                No pending approvals.
              </p>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
