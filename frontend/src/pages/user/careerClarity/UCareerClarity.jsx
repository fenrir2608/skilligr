import { useAuth } from '../../../hooks/auth'
import Spinner from "../../../components/Spinner";
import {Link} from "react-router-dom"
import Sidebar from "../../../components/Sidebar";
import Header from "../../../components/Header";
import React, { useState } from "react";
import { CheckIcon,GoalIcon,TreesIcon } from 'lucide-react';

export default function CareerClarity() {
  const { authStatus, loading } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  if (loading) return <Spinner />;

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  return (
    <div className="flex">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      <div className="flex flex-col flex-1">
        <Header onMenuClick={toggleSidebar} />
        <div className="flex flex-col gap-12 py-12 md:py-16 lg:py-22">
          <section className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Career Clarity
                </h2>
                <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Discover your true potential and unlock your career path.
                </p>
              </div>
              <Link
                to="/career/assessment"
                className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
              >
                Take your career assessment now!
              </Link>
            </div>
          </section>
          <section className="container grid grid-cols-1 gap-6 px-4 md:grid-cols-3 md:px-6">
            <div className="rounded-lg border bg-card p-6 shadow-sm">
              <div className="flex flex-col items-center justify-center space-y-2">
                <CheckIcon className="h-12 w-12 text-primary" />
                <h3 className="text-2xl font-bold">12,345</h3>
                <p className="text-muted-foreground">Assessments Taken</p>
              </div>
            </div>
            <div className="rounded-lg border bg-card p-6 shadow-sm">
              <div className="flex flex-col items-center justify-center space-y-2">
                <GoalIcon className="h-12 w-12 text-primary" />
                <h3 className="text-2xl font-bold">4.8</h3>
                <p className="text-muted-foreground">Average Score</p>
              </div>
            </div>
            <div className="rounded-lg border bg-card p-6 shadow-sm">
              <div className="flex flex-col items-center justify-center space-y-2">
                <TreesIcon className="h-12 w-12 text-primary" />
                <h3 className="text-2xl font-bold">25+</h3>
                <p className="text-muted-foreground">Learning Paths</p>
              </div>
            </div>
          </section>
          <section className="container px-4 md:px-6">
            <div className="space-y-4">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                Suggested Learning Paths
              </h2>
              <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Based on your career assessment, here are some suggested learning
                paths to help you achieve your goals.
              </p>
              <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                <Link
                  to="#"
                  className="group flex h-auto w-full flex-col justify-start gap-1 rounded-md bg-card p-4 transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50"
                >
                  <div className="text-sm font-medium leading-none group-hover:underline">
                    JavaScript
                  </div>
                  <div className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                    Learn the fundamentals of JavaScript and build dynamic web
                    applications.
                  </div>
                </Link>
                <Link
                  to="#"
                  className="group flex h-auto w-full flex-col justify-start gap-1 rounded-md bg-card p-4 transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50"
                >
                  <div className="text-sm font-medium leading-none group-hover:underline">
                    Front-End Developer
                  </div>
                  <div className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                    Become a skilled front-end developer and create beautiful user
                    interfaces.
                  </div>
                </Link>
                <Link
                  to="#"
                  className="group flex h-auto w-full flex-col justify-start gap-1 rounded-md bg-card p-4 transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50"
                >
                  <div className="text-sm font-medium leading-none group-hover:underline">
                    Back-End Developer
                  </div>
                  <div className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                    Dive into server-side development and build robust web
                    applications.
                  </div>
                </Link>
                <Link
                  to="#"
                  className="group flex h-auto w-full flex-col justify-start gap-1 rounded-md bg-card p-4 transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50"
                >
                  <div className="text-sm font-medium leading-none group-hover:underline">
                    Data Analyst
                  </div>
                  <div className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                    Develop data analysis skills and uncover valuable insights from
                    data.
                  </div>
                </Link>
              </div>
            </div>
          </section>
          <section className="container px-4 md:px-6">
            <div className="flex justify-between items-center">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                All Learning Paths
              </h2>
              <Link
                to="/career/paths"
                className="text-sm font-medium text-primary hover:underline"
              >
                View All
              </Link>
            </div>
            <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Explore our comprehensive list of learning paths to find the one
              that aligns with your career goals.
            </p>
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              <Link
                to="#"
                className="group flex h-auto w-full flex-col justify-start gap-1 rounded-md bg-card p-4 transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50"
              >
                <div className="text-sm font-medium leading-none group-hover:underline">
                  JavaScript
                </div>
                <div className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                  Learn the fundamentals of JavaScript and build dynamic web
                  applications.
                </div>
              </Link>
              <Link
                to="#"
                className="group flex h-auto w-full flex-col justify-start gap-1 rounded-md bg-card p-4 transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50"
              >
                <div className="text-sm font-medium leading-none group-hover:underline">
                  Front-End Developer
                </div>
                <div className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                  Become a skilled front-end developer and create beautiful user
                  interfaces.
                </div>
              </Link>
              <Link
                to="#"
                className="group flex h-auto w-full flex-col justify-start gap-1 rounded-md bg-card p-4 transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50"
              >
                <div className="text-sm font-medium leading-none group-hover:underline">
                  Back-End Developer
                </div>
                <div className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                  Dive into server-side development and build robust web
                  applications.
                </div>
              </Link>
              <Link
                to="#"
                className="group flex h-auto w-full flex-col justify-start gap-1 rounded-md bg-card p-4 transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50"
              >
                <div className="text-sm font-medium leading-none group-hover:underline">
                  Data Analyst
                </div>
                <div className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                  Develop data analysis skills and uncover valuable insights from
                  data.
                </div>
              </Link>
              <Link
                to="#"
                className="group flex h-auto w-full flex-col justify-start gap-1 rounded-md bg-card p-4 transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50"
              >
                <div className="text-sm font-medium leading-none group-hover:underline">
                  Product Manager
                </div>
                <div className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                  Learn the skills to effectively manage and deliver successful
                  products.
                </div>
              </Link>
              <Link
                to="#"
                className="group flex h-auto w-full flex-col justify-start gap-1 rounded-md bg-card p-4 transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50"
              >
                <div className="text-sm font-medium leading-none group-hover:underline">
                  Digital Marketing
                </div>
                <div className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                  Develop expertise in digital marketing strategies and tactics.
                </div>
              </Link>
              <Link
                to="#"
                className="group flex h-auto w-full flex-col justify-start gap-1 rounded-md bg-card p-4 transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50"
              >
                <div className="text-sm font-medium leading-none group-hover:underline">
                  UX Design
                </div>
                <div className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                  Explore the principles of user experience design and create
                  intuitive interfaces.
                </div>
              </Link>
              <Link
                to="#"
                className="group flex h-auto w-full flex-col justify-start gap-1 rounded-md bg-card p-4 transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50"
              >
                <div className="text-sm font-medium leading-none group-hover:underline">
                  Data Science
                </div>
                <div className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                  Dive into the world of data science and learn to extract
                  insights from data.
                </div>
              </Link>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}