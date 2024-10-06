import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import Logout from "../components/Logout";
import ModeToggle from "../components/ui/mode-toggle";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import {
  Home,
  Book,
  Compass,
  Briefcase,
  Clipboard,
  Bell,
  Calendar,
  MessageCircle,
} from "lucide-react";

export default function Landing() {
  return (
      <div className="flex min-h-screen">
        <Sidebar />
        <main className="flex-1">
          <Header />
          <section className="px-6 py-12">
            <div className="max-w-3xl mx-auto space-y-8">
              <div>
                <h3 className="text-3xl font-bold mb-2">
                  Unlock Your Potential
                </h3>
                <p className="text-muted-foreground">
                  Skilligr is your one-stop platform for developing essential
                  skills for career success. Explore our comprehensive resources
                  and start your journey to becoming the best version of
                  yourself.
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card>
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
                  <CardFooter>
                    <Button variant="link">Explore</Button>
                  </CardFooter>
                </Card>
                <Card>
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
                  <CardFooter>
                    <Button variant="link">Explore</Button>
                  </CardFooter>
                </Card>
                <Card>
                  <CardHeader>
                    <Briefcase className="w-8 h-8" />
                    <h4 className="text-xl font-bold">Soft Skill Hub</h4>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Develop the essential soft skills that employers value
                      most, such as communication, leadership, and
                      problem-solving.
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Button variant="link">Explore</Button>
                  </CardFooter>
                </Card>
                <Card>
                  <CardHeader>
                    <Clipboard className="w-8 h-8" />
                    <h4 className="text-xl font-bold">Practice</h4>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Hone your skills through interactive exercises, quizzes,
                      and simulations tailored to your needs.
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Button variant="link">Explore</Button>
                  </CardFooter>
                </Card>
                <Card>
                  <CardHeader>
                    <Bell className="w-8 h-8" />
                    <h4 className="text-xl font-bold">Notifications</h4>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Stay up-to-date with the latest opportunities, events, and
                      updates from Skilligr.
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Button variant="link">Explore</Button>
                  </CardFooter>
                </Card>
                <Card>
                  <CardHeader>
                    <Briefcase className="w-8 h-8" />
                    <h4 className="text-xl font-bold">Jobs</h4>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Discover the latest job openings that match your skills
                      and interests.
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Button variant="link">Explore</Button>
                  </CardFooter>
                </Card>
                <Card>
                  <CardHeader>
                    <Calendar className="w-8 h-8" />
                    <h4 className="text-xl font-bold">Events</h4>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Stay informed about upcoming workshops, webinars, and
                      networking events.
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Button variant="link">Explore</Button>
                  </CardFooter>
                </Card>
                <Card>
                  <CardHeader>
                    <MessageCircle className="w-8 h-8" />
                    <h4 className="text-xl font-bold">Feedback</h4>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Share your thoughts and suggestions to help us improve
                      Skilligr and better serve your needs.
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Button variant="link">Explore</Button>
                  </CardFooter>
                </Card>
              </div>
            </div>
          </section>
        </main>
      </div>
  );
}
