import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import {
  Book,
  Compass,
  MessageCircle,
  ChevronRight,
  ClipboardList,
  Users,
  Bell,
  Calendar,
} from "lucide-react";
import { useAuth } from "../hooks/auth";

export default function Landing() {
  const { authStatus } = useAuth();
  const role = authStatus?.role;

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1">
        <Header />
        <section className="relative py-12">
          <div className="absolute inset-0"></div>
          <div className="relative max-w-3xl mx-auto text-center space-y-8">
            <h1 className="text-5xl font-bold">
              {role === "admin" ? "Welcome Admin" : "Unlock Your Potential"}
            </h1>
            <p className="text-lg">
              {role === "admin"
                ? "Manage and oversee platform functionalities with ease."
                : "Skilligr is your one-stop platform for developing essential skills for career success. Explore our comprehensive resources and start your journey to becoming the best version of yourself."}
            </p>
          </div>
        </section>
        <div className="w-4/5 mx-auto">
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
              <p className="text-xs text-muted-foreground">Awaiting approval</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
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
              <CardTitle className="text-sm font-medium">New Events</CardTitle>
              <Calendar className="h-5 w-5 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">4</div>
              <p className="text-xs text-muted-foreground">Upcoming events</p>
            </CardContent>
          </Card>
        </div>
        </div>
        <section className="px-6 py-2">
          <div className="max-w-6xl mx-auto space-y-4">
            <div className="font-semibold text-3xl py-4">
              {" "}
              {role === "admin" ? "Quick Actions" : "Get Started with..."}
            </div>

            {role === "admin" ? (
              <>
                <div className="font-bold grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <Button className="text-md transform transition-transform duration-300 hover:scale-105">
                    <Link to="/admin/notifications">
                      Schedule Notifications
                    </Link>
                  </Button>
                  <Button className="text-md transform transition-transform duration-300 hover:scale-105">
                    <Link to="/admin/approve">Approve New Students</Link>
                  </Button>
                  <Button className="text-md transform transition-transform duration-300 hover:scale-105">
                    <Link to="/admin/resources">Add New Resources</Link>
                  </Button>
                  <Button className="text-md transform transition-transform duration-300 hover:scale-105">
                    <Link to="/admin/events">Manage Events</Link>
                  </Button>
                </div>
              </>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card className="transform transition-transform duration-300 hover:scale-105 flex flex-col justify-between">
                  <div>
                    <CardHeader>
                      <Book className="w-8 h-8" />
                      <h4 className="text-xl font-bold">Learning Resources</h4>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">
                        Dive into our extensive library of educational content,
                        including courses, articles, and tutorials.
                      </p>
                    </CardContent>
                  </div>
                  <CardFooter>
                    <Button>
                      Explore <ChevronRight className="ml-2 w-4 h-4" />
                    </Button>
                  </CardFooter>
                </Card>
                <Card className="transform transition-transform duration-300 hover:scale-105 flex flex-col justify-between">
                  <div>
                    <CardHeader>
                      <Compass className="w-8 h-8" />
                      <h4 className="text-xl font-bold">Career Clarity</h4>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">
                        Discover your true passions and find the perfect career
                        path with our guidance and assessments.
                      </p>
                    </CardContent>
                  </div>
                  <CardFooter>
                    <Button>
                      Explore <ChevronRight className="ml-2 w-4 h-4" />
                    </Button>
                  </CardFooter>
                </Card>
                <Card className="transform transition-transform duration-300 hover:scale-105 flex flex-col justify-between">
                  <div>
                    <CardHeader>
                      <MessageCircle className="w-8 h-8" />
                      <h4 className="text-xl font-bold">Soft Skill Hub</h4>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">
                        Develop the essential soft skills that employers value
                        most, such as communication, leadership, and
                        problem-solving.
                      </p>
                    </CardContent>
                  </div>
                  <CardFooter>
                    <Button>
                      Explore <ChevronRight className="ml-2 w-4 h-4" />
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
