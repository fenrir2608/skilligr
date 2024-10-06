import { Card } from "@/components/ui/card"
import { useAuth } from '../../../hooks/auth'
import Spinner from "../../../components/Spinner";
import {Link} from "react-router-dom"


export default function AllLearningPaths() {
    const { authStatus, loading } = useAuth();
    if (loading) return <Spinner />;
  return (
    <div className="flex flex-col gap-12 py-12 md:py-20 lg:py-28">
      <section className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">All Learning Paths</h2>
            <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Explore our comprehensive list of learning paths to find the one that aligns with your career goals.
            </p>
          </div>
        </div>
      </section>
      <section className="container grid grid-cols-1 gap-6 px-4 md:grid-cols-2 lg:grid-cols-3 md:px-6">
        <Card className="group flex h-auto w-full flex-col justify-start gap-1 rounded-md bg-card p-4 transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50">
          <div className="flex items-center justify-between">
            <div className="text-sm font-medium leading-none group-hover:underline">JavaScript</div>
            <a
              href="#"
              className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
            >
              Download
            </a>
          </div>
          <div className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            Learn the fundamentals of JavaScript and build dynamic web applications.
          </div>
        </Card>
        <Card className="group flex h-auto w-full flex-col justify-start gap-1 rounded-md bg-card p-4 transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50">
          <div className="flex items-center justify-between">
            <div className="text-sm font-medium leading-none group-hover:underline">Front-End Developer</div>
            <a
              href="#"
              className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
            >
              Download
            </a>
          </div>
          <div className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            Become a skilled front-end developer and create beautiful user interfaces.
          </div>
        </Card>
        <Card className="group flex h-auto w-full flex-col justify-start gap-1 rounded-md bg-card p-4 transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50">
          <div className="flex items-center justify-between">
            <div className="text-sm font-medium leading-none group-hover:underline">Back-End Developer</div>
            <a
              href="#"
              className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
            >
              Download
            </a>
          </div>
          <div className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            Dive into server-side development and build robust web applications.
          </div>
        </Card>
        <Card className="group flex h-auto w-full flex-col justify-start gap-1 rounded-md bg-card p-4 transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50">
          <div className="flex items-center justify-between">
            <div className="text-sm font-medium leading-none group-hover:underline">Data Analyst</div>
            <a
              href="#"
              className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
            >
              Download
            </a>
          </div>
          <div className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            Develop data analysis skills and uncover valuable insights from data.
          </div>
        </Card>
        <Card className="group flex h-auto w-full flex-col justify-start gap-1 rounded-md bg-card p-4 transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50">
          <div className="flex items-center justify-between">
            <div className="text-sm font-medium leading-none group-hover:underline">Product Manager</div>
            <a
              href="#"
              className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
            >
              Download
            </a>
          </div>
          <div className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            Learn the skills to effectively manage and deliver successful products.
          </div>
        </Card>
        <Card className="group flex h-auto w-full flex-col justify-start gap-1 rounded-md bg-card p-4 transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50">
          <div className="flex items-center justify-between">
            <div className="text-sm font-medium leading-none group-hover:underline">Digital Marketing</div>
            <a
              href="#"
              className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
            >
              Download
            </a>
          </div>
          <div className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            Develop expertise in digital marketing strategies and tactics.
          </div>
        </Card>
        <Card className="group flex h-auto w-full flex-col justify-start gap-1 rounded-md bg-card p-4 transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50">
          <div className="flex items-center justify-between">
            <div className="text-sm font-medium leading-none group-hover:underline">UX Design</div>
            <a
              href="#"
              className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
            >
              Download
            </a>
          </div>
          <div className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            Explore the principles of user experience design and create intuitive interfaces.
          </div>
        </Card>
        <Card className="group flex h-auto w-full flex-col justify-start gap-1 rounded-md bg-card p-4 transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50">
          <div className="flex items-center justify-between">
            <div className="text-sm font-medium leading-none group-hover:underline">Data Science</div>
            <a
              href="#"
              className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
            >
              Download
            </a>
          </div>
          <div className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            Dive into the world of data science and learn to extract insights from data.
          </div>
        </Card>
      </section>
    </div>
  )
}