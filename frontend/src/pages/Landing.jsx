import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { Book, Compass, MessageCircle, ChevronRight } from "lucide-react";
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
        <section className="px-6 py-2">
          <div className="max-w-6xl mx-auto space-y-4">
            <div className="font-semibold text-3xl py-4">
              {" "}
              {role === "admin" ? "Quick Actions" : "Get Started with..."}
            </div>

            {role === "admin" ? (
              <div className="font-bold grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <Button className="text-md transform transition-transform duration-300 hover:scale-105">
                  Schedule Notifications
                </Button>
                <Button className="text-md transform transition-transform duration-300 hover:scale-105">
                  Approve New Students
                </Button>
                <Button className="text-md transform transition-transform duration-300 hover:scale-105">
                  Add New Resources
                </Button>
                <Button className="text-md transform transition-transform duration-300 hover:scale-105">
                  Manage Events
                </Button>
              </div>
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
