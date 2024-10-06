import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { useAuth } from '../../../hooks/auth';
import Spinner from "../../../components/Spinner";
import { Link } from "react-router-dom";
import Header from "../../../components/Header";
import Sidebar from "../../../components/Sidebar";

export default function AllLearningPaths() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { authStatus, loading } = useAuth();

  if (loading) return <Spinner />;

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header onMenuClick={toggleSidebar} />
        <main className="flex-1 overflow-x-hidden overflow-y-auto">
          <div className="container mx-auto px-4 py-8">
            <section className="mb-12">
              <div className="flex flex-col items-center justify-center space-y-4 text-center">
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">All Learning Paths</h2>
                  <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                    Explore our comprehensive list of learning paths to find the one that aligns with your career goals.
                  </p>
                </div>
              </div>
            </section>
            <section className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {[
                { title: "JavaScript", description: "Learn the fundamentals of JavaScript and build dynamic web applications." },
                { title: "Front-End Developer", description: "Become a skilled front-end developer and create beautiful user interfaces." },
                { title: "Back-End Developer", description: "Dive into server-side development and build robust web applications." },
                { title: "Data Analyst", description: "Develop data analysis skills and uncover valuable insights from data." },
                { title: "Product Manager", description: "Learn the skills to effectively manage and deliver successful products." },
                { title: "Digital Marketing", description: "Develop expertise in digital marketing strategies and tactics." },
                { title: "UX Design", description: "Explore the principles of user experience design and create intuitive interfaces." },
                { title: "Data Science", description: "Dive into the world of data science and learn to extract insights from data." }
              ].map((path, index) => (
                <Card key={index} className="group flex h-auto w-full flex-col justify-start gap-1 rounded-md bg-card p-4 transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50">
                  <div className="flex items-center justify-between">
                    <div className="text-sm font-medium leading-none group-hover:underline">{path.title}</div>
                    <a
                      href="#"
                      className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                    >
                      Download
                    </a>
                  </div>
                  <div className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                    {path.description}
                  </div>
                </Card>
              ))}
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}