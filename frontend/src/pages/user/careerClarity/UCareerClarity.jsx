import { useAuth } from '../../../hooks/auth'
import Spinner from "../../../components/Spinner";
import { Link } from "react-router-dom";
import Sidebar from "../../../components/Sidebar";
import Header from "../../../components/Header";
import React, { useState } from "react";
import { CheckIcon, GoalIcon, TreesIcon } from 'lucide-react';

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
              <a
                href="/Learning paths/ai-data-scientist.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex h-auto w-full flex-col justify-start gap-1 rounded-md bg-card p-4 transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50"
              >
                  <div className="text-sm font-medium leading-none group-hover:underline">
                    AI Data Scientist
                  </div>
                  <div className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                    Learn how to harness machine learning algorithms to extract insights from data.
                  </div>
                </a>
                <a
                  href="/Learning paths/api-design.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex h-auto w-full flex-col justify-start gap-1 rounded-md bg-card p-4 transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50"
                >
                  <div className="text-sm font-medium leading-none group-hover:underline">
                    API Design
                  </div>
                  <div className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                    Master the principles of designing robust and scalable APIs.
                  </div>
                </a>
                <a
                  href="/Learning paths/backend.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex h-auto w-full flex-col justify-start gap-1 rounded-md bg-card p-4 transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50"
                > 
                  <div className="text-sm font-medium leading-none group-hover:underline">
                    Backend
                  </div>
                  <div className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                    Develop backend systems that power web applications and services.
                  </div>
                </a>
                <a
                  href="/Learning paths/cyber-security.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex h-auto w-full flex-col justify-start gap-1 rounded-md bg-card p-4 transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50"
                >
                  <div className="text-sm font-medium leading-none group-hover:underline">
                    Cyber Security
                  </div>
                  <div className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                    Secure digital systems and protect data from cyber threats.
                  </div>
                </a>
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
            <a
                href="/Learning paths/ai-data-scientist.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex h-auto w-full flex-col justify-start gap-1 rounded-md bg-card p-4 transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50"
              >
                  <div className="text-sm font-medium leading-none group-hover:underline">
                    AI Data Scientist
                  </div>
                  <div className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                    Learn how to harness machine learning algorithms to extract insights from data.
                  </div>
                </a>
                <a
                  href="/Learning paths/api-design.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex h-auto w-full flex-col justify-start gap-1 rounded-md bg-card p-4 transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50"
                >
                  <div className="text-sm font-medium leading-none group-hover:underline">
                    API Design
                  </div>
                  <div className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                    Master the principles of designing robust and scalable APIs.
                  </div>
                </a>
                <a
                  href="/Learning paths/backend.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex h-auto w-full flex-col justify-start gap-1 rounded-md bg-card p-4 transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50"
                > 
                  <div className="text-sm font-medium leading-none group-hover:underline">
                    Backend
                  </div>
                  <div className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                    Develop backend systems that power web applications and services.
                  </div>
                </a>
                <a
                  href="/Learning paths/cyber-security.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex h-auto w-full flex-col justify-start gap-1 rounded-md bg-card p-4 transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50"
                >
                  <div className="text-sm font-medium leading-none group-hover:underline">
                    Cyber Security
                  </div>
                  <div className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                    Secure digital systems and protect data from cyber threats.
                  </div>
                </a>
                <a
                  href="/Learning paths/devops.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex h-auto w-full flex-col justify-start gap-1 rounded-md bg-card p-4 transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50"
                >
                <div className="text-sm font-medium leading-none group-hover:underline">
                  DevOps
                </div>
                <div className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                  Learn to integrate development and operations for efficient software delivery.
                </div>
              </a>
              <a
                href="/Learning paths/frontend.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex h-auto w-full flex-col justify-start gap-1 rounded-md bg-card p-4 transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50"
              >
                <div className="text-sm font-medium leading-none group-hover:underline">
                  Frontend
                </div>
                <div className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                  Build stunning and responsive user interfaces for web applications.
                </div>
              </a>
              <a
                href="/Learning paths/full-stack.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex h-auto w-full flex-col justify-start gap-1 rounded-md bg-card p-4 transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50"
              >  
              <div className="text-sm font-medium leading-none group-hover:underline">
                  Full Stack
                </div>
                <div className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                  Master both frontend and backend technologies to become a full stack developer.
                </div>
                </a>
                <a
                  href="/Learning paths/ux-design.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex h-auto w-full flex-col justify-start gap-1 rounded-md bg-card p-4 transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50"
                >
                <div className="text-sm font-medium leading-none group-hover:underline">
                  UX Design
                </div>
                <div className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                  Learn how to create user-centric designs that enhance user experiences.
                </div>
              </a>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
