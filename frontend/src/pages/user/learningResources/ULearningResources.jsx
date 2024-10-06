import React, { useState } from "react";
import { useAuth } from "../../../hooks/auth";
import Spinner from "../../../components/Spinner";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Sidebar from "../../../components/Sidebar";
import Header from "../../../components/Header";
import { FileIcon, FileTextIcon, FileVideoIcon, Link2, DownloadIcon } from "lucide-react";

export default function LearningResources() {
  const { authStatus, loading } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  if (loading) return <Spinner />;

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header onMenuClick={toggleSidebar} />
        <main className="flex-1 overflow-x-hidden overflow-y-auto">
          <div className="container mx-auto px-4 py-8">
            {/* College Resources section */}
            <section>
            <div className="flex items-center justify-between">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                College Resources
              </h2>
              <Link
                href="#"
                className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                prefetch={false}
              >
                View All
              </Link>
            </div>
            <div className="grid gap-6 mt-8 md:grid-cols-3">
              <Card>
                <CardContent className="grid gap-4">
                  <div className="flex items-center gap-2 pt-4">
                    <FileIcon className="h-6 w-6 text-muted-foreground" />
                    <h3 className="text-lg font-semibold">
                      Introduction to Economics
                    </h3>
                  </div>
                  <p className="text-muted-foreground">
                    A comprehensive PowerPoint presentation covering the
                    fundamentals of economics.
                  </p>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm">
                      <DownloadIcon className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                    <Link
                      href="#"
                      className="inline-flex items-center gap-2 text-sm font-medium text-primary-foreground transition-colors hover:text-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                      prefetch={false}
                    >
                      <Link2 className="h-4 w-4" />
                      View
                    </Link>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="grid gap-4">
                  <div className="flex items-center gap-2 pt-4">
                    <FileIcon className="h-6 w-6 text-muted-foreground" />
                    <h3 className="text-lg font-semibold">
                      Academic Writing Guide
                    </h3>
                  </div>
                  <p className="text-muted-foreground">
                    A comprehensive PDF guide on academic writing best
                    practices.
                  </p>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm">
                      <DownloadIcon className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="grid gap-4">
                  <div className="flex items-center gap-2 pt-4">
                    <Link2 className="h-6 w-6 text-muted-foreground" />
                    <h3 className="text-lg font-semibold">
                      Effective Presentation Skills
                    </h3>
                  </div>
                  <p className="text-muted-foreground">
                    A curated list of online resources to improve your
                    presentation skills.
                  </p>
                  <div className="flex items-center gap-2">
                    <Link
                      href="#"
                      className="inline-flex items-center gap-2 text-sm font-medium text-primary-foreground transition-colors hover:text-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                      prefetch={false}
                    >
                      <Link2 className="h-4 w-4" />
                      View
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>
            {/* Open Educational Resources (OERs) section */}
            <section>
            <div className="flex items-center justify-between">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Open Educational Resources (OERs)
              </h2>
              <Link
                href="#"
                className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                prefetch={false}
              >
                View All
              </Link>
            </div>
            <div className="grid gap-6 mt-8 md:grid-cols-3">
              <Card>
                <CardContent className="grid gap-4">
                  <div className="flex items-center gap-2 pt-4">
                    <FileTextIcon className="h-6 w-6 text-muted-foreground" />
                    <h3 className="text-lg font-semibold">
                      Introduction to Python
                    </h3>
                  </div>
                  <p className="text-muted-foreground">
                    A free online textbook covering the fundamentals of Python
                    programming.
                  </p>
                  <div className="flex items-center gap-2">
                    <Link
                      href="#"
                      className="inline-flex items-center gap-2 text-sm font-medium text-primary-foreground transition-colors hover:text-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                      prefetch={false}
                    >
                      <Link2 className="h-4 w-4" />
                      View
                    </Link>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="grid gap-4">
                  <div className="flex items-center gap-2 pt-4">
                    <FileVideoIcon className="h-6 w-6 text-muted-foreground" />
                    <h3 className="text-lg font-semibold">Calculus Lectures</h3>
                  </div>
                  <p className="text-muted-foreground">
                    A series of free video lectures covering calculus concepts.
                  </p>
                  <div className="flex items-center gap-2">
                    <Link
                      href="#"
                      className="inline-flex items-center gap-2 text-sm font-medium text-primary-foreground transition-colors hover:text-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                      prefetch={false}
                    >
                      <Link2 className="h-4 w-4" />
                      View
                    </Link>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="grid gap-4">
                  <div className="flex items-center gap-2 pt-4">
                    <FileTextIcon className="h-6 w-6 text-muted-foreground" />
                    <h3 className="text-lg font-semibold">
                      Data Science Fundamentals
                    </h3>
                  </div>
                  <p className="text-muted-foreground">
                    A free online textbook covering the basics of data science.
                  </p>
                  <div className="flex items-center gap-2">
                    <Link
                      href="#"
                      className="inline-flex items-center gap-2 text-sm font-medium text-primary-foreground transition-colors hover:text-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                      prefetch={false}
                    >
                      <Link2 className="h-4 w-4" />
                      View
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>

            {/* MOOCs section */}
            <section>
            <div className="flex items-center justify-between">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                MOOCs
              </h2>
              <Link
                href="#"
                className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                prefetch={false}
              >
                View All
              </Link>
            </div>
            <div className="grid gap-6 mt-8 md:grid-cols-3">
              <Card>
                <CardContent className="grid gap-4">
                  <div className="flex items-center gap-2 pt-4">
                    <Link2 className="h-6 w-6 text-muted-foreground" />
                    <h3 className="text-lg font-semibold">
                      Introduction to Machine Learning
                    </h3>
                  </div>
                  <p className="text-muted-foreground">
                    A free online course from Coursera covering the fundamentals
                    of machine learning.
                  </p>
                  <div className="flex items-center gap-2">
                    <Link
                      href="#"
                      className="inline-flex items-center gap-2 text-sm font-medium text-primary-foreground transition-colors hover:text-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                      prefetch={false}
                    >
                      <Link2 className="h-4 w-4" />
                      Enroll
                    </Link>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="grid gap-4">
                  <div className="flex items-center gap-2 pt-4">
                    <Link2 className="h-6 w-6 text-muted-foreground" />
                    <h3 className="text-lg font-semibold">
                      Introduction to Web Development
                    </h3>
                  </div>
                  <p className="text-muted-foreground">
                    A free online course from edX covering the basics of web
                    development.
                  </p>
                  <div className="flex items-center gap-2">
                    <Link
                      href="#"
                      className="inline-flex items-center gap-2 text-sm font-medium text-primary-foreground transition-colors hover:text-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                      prefetch={false}
                    >
                      <Link2 className="h-4 w-4" />
                      Enroll
                    </Link>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="grid gap-4">
                  <div className="flex items-center gap-2 pt-4">
                    <Link2 className="h-6 w-6 text-muted-foreground" />
                    <h3 className="text-lg font-semibold">
                      Introduction to Artificial Intelligence
                    </h3>
                  </div>
                  <p className="text-muted-foreground">
                    A free online course from Udacity covering the fundamentals
                    of AI.
                  </p>
                  <div className="flex items-center gap-2">
                    <Link
                      href="#"
                      className="inline-flex items-center gap-2 text-sm font-medium text-primary-foreground transition-colors hover:text-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                      prefetch={false}
                    >
                      <Link2 className="h-4 w-4" />
                      Enroll
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>
          </div>
        </main>
      </div>
    </div>
  );
}