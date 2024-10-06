import {Link} from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card"
import GridBackground from "../components/ui/grid";
import Logout from "../components/Logout";
import ModeToggle from "../components/ui/mode-toggle";

export default function Landing() {
  return (
    <GridBackground>
    <div className="flex min-h-screen">
      <aside className="bg-background border-r w-64 p-4 hidden md:block">
        <div className="flex items-center mb-8">
          <GripIcon className="w-8 h-8 mr-2" />
          <h1 className="text-xl font-bold">Skilligr</h1>
        </div>
        <nav className="space-y-2">
          <Link
            href="#"
            className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-muted transition-colors"
            prefetch={false}
          >
            <HomeIcon className="w-5 h-5" />
            <span>Home</span>
          </Link>
          <Link
            href="#"
            className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-muted transition-colors"
            prefetch={false}
          >
            <BookIcon className="w-5 h-5" />
            <span>Learning Resources</span>
          </Link>
          <Link
            href="#"
            className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-muted transition-colors"
            prefetch={false}
          >
            <CompassIcon className="w-5 h-5" />
            <span>Career Clarity</span>
          </Link>
          <Link
            href="#"
            className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-muted transition-colors"
            prefetch={false}
          >
            <BriefcaseIcon className="w-5 h-5" />
            <span>Soft Skill Hub</span>
          </Link>
          <Link
            href="#"
            className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-muted transition-colors"
            prefetch={false}
          >
            <ClipboardIcon className="w-5 h-5" />
            <span>Practice</span>
          </Link>
          <Link
            href="#"
            className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-muted transition-colors"
            prefetch={false}
          >
            <BellIcon className="w-5 h-5" />
            <span>Notifications</span>
          </Link>
          <Link
            href="#"
            className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-muted transition-colors"
            prefetch={false}
          >
            <BriefcaseIcon className="w-5 h-5" />
            <span>Jobs</span>
          </Link>
          <Link
            href="#"
            className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-muted transition-colors"
            prefetch={false}
          >
            <CalendarIcon className="w-5 h-5" />
            <span>Events</span>
          </Link>
          <Link
            href="#"
            className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-muted transition-colors"
            prefetch={false}
          >
            <MessageCircleIcon className="w-5 h-5" />
            <span>Feedback</span>
          </Link>
        </nav>
      </aside>
      <main className="flex-1 bg-background">
        <header className="bg-background border-b px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="md:hidden">
              <MenuIcon className="w-6 h-6" />
            </Button>
            <h2 className="text-2xl font-bold">Welcome to Skilligr</h2>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="outline">Get Started</Button>
            <Button>Sign Up</Button>
          </div>
        </header>
        <section className="px-6 py-12">
          <div className="max-w-3xl mx-auto space-y-8">
            <div>
              <h3 className="text-3xl font-bold mb-2">Unlock Your Potential</h3>
              <p className="text-muted-foreground">
                Skilligr is your one-stop platform for developing essential skills for career success. Explore our
                comprehensive resources and start your journey to becoming the best version of yourself.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <BookIcon className="w-8 h-8" />
                  <h4 className="text-xl font-bold">Learning Resources</h4>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Dive into our extensive library of educational content, including courses, articles, and tutorials.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button variant="link">Explore</Button>
                </CardFooter>
              </Card>
              <Card>
                <CardHeader>
                  <CompassIcon className="w-8 h-8" />
                  <h4 className="text-xl font-bold">Career Clarity</h4>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Discover your true passions and find the perfect career path with our guidance and assessments.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button variant="link">Explore</Button>
                </CardFooter>
              </Card>
              <Card>
                <CardHeader>
                  <BriefcaseIcon className="w-8 h-8" />
                  <h4 className="text-xl font-bold">Soft Skill Hub</h4>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Develop the essential soft skills that employers value most, such as communication, leadership, and
                    problem-solving.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button variant="link">Explore</Button>
                </CardFooter>
              </Card>
              <Card>
                <CardHeader>
                  <ClipboardIcon className="w-8 h-8" />
                  <h4 className="text-xl font-bold">Practice</h4>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Hone your skills through interactive exercises, quizzes, and simulations tailored to your needs.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button variant="link">Explore</Button>
                </CardFooter>
              </Card>
              <Card>
                <CardHeader>
                  <BellIcon className="w-8 h-8" />
                  <h4 className="text-xl font-bold">Notifications</h4>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Stay up-to-date with the latest opportunities, events, and updates from Skilligr.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button variant="link">Explore</Button>
                </CardFooter>
              </Card>
              <Card>
                <CardHeader>
                  <BriefcaseIcon className="w-8 h-8" />
                  <h4 className="text-xl font-bold">Jobs</h4>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Discover the latest job openings that match your skills and interests.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button variant="link">Explore</Button>
                </CardFooter>
              </Card>
              <Card>
                <CardHeader>
                  <CalendarIcon className="w-8 h-8" />
                  <h4 className="text-xl font-bold">Events</h4>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Stay informed about upcoming workshops, webinars, and networking events.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button variant="link">Explore</Button>
                </CardFooter>
              </Card>
              <Card>
                <CardHeader>
                  <MessageCircleIcon className="w-8 h-8" />
                  <h4 className="text-xl font-bold">Feedback</h4>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Share your thoughts and suggestions to help us improve Skilligr and better serve your needs.
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
    </GridBackground>
  )
}

function BellIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
      <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
    </svg>
  )
}


function BookIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
    </svg>
  )
}


function BriefcaseIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
      <rect width="20" height="14" x="2" y="6" rx="2" />
    </svg>
  )
}


function CalendarIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M8 2v4" />
      <path d="M16 2v4" />
      <rect width="18" height="18" x="3" y="4" rx="2" />
      <path d="M3 10h18" />
    </svg>
  )
}


function ClipboardIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="8" height="4" x="8" y="2" rx="1" ry="1" />
      <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
    </svg>
  )
}


function CompassIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m16.24 7.76-1.804 5.411a2 2 0 0 1-1.265 1.265L7.76 16.24l1.804-5.411a2 2 0 0 1 1.265-1.265z" />
      <circle cx="12" cy="12" r="10" />
    </svg>
  )
}


function GripIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="5" r="1" />
      <circle cx="19" cy="5" r="1" />
      <circle cx="5" cy="5" r="1" />
      <circle cx="12" cy="12" r="1" />
      <circle cx="19" cy="12" r="1" />
      <circle cx="5" cy="12" r="1" />
      <circle cx="12" cy="19" r="1" />
      <circle cx="19" cy="19" r="1" />
      <circle cx="5" cy="19" r="1" />
    </svg>
  )
}


function HomeIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  )
}


function MenuIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  )
}


function MessageCircleIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
    </svg>
  )
}