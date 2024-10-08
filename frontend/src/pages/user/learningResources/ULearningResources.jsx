import React, { useEffect, useState } from "react";
import { useAuth } from "../../../hooks/auth";
import Spinner from "../../../components/Spinner";
import { Link, useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Sidebar from "../../../components/Sidebar";
import Header from "../../../components/Header";
import { FileIcon, FileTextIcon, FileVideoIcon, Link2, DownloadIcon } from "lucide-react";

export default function LearningResources() {
  const { authStatus, loading } = useAuth();
  const [learningResources, setLearningResources] = useState([]);
  const [noLearningResourcesMessage, setNoLearningResourcesMessage] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if(authStatus)
    {
      const fetchLearningResources = async () => {
        try{
          const response = await fetch("http://localhost:3000/resources/getAll", {
            method: "GET",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
          });

          if(response.ok)
          {
            const data = await response.json();
            // console.log(data);
            setLearningResources(data);
          }
          else if(response.status === 401)
          {
            setNoLearningResourcesMessage("You are not authorized to view learning resources.");
          }
          else
          {
            const text = await response.text();
            if(text === "No learning resources.")
            {
              setNoLearningResourcesMessage("No learning resources available.");
            }
            else
            {
              console.error("Unexpected response:", text);
            }
          }
        }
        catch(error)
        {
          console.error("Failed to fetch learning resources", error);
        }
      }
      fetchLearningResources();
    }
  }, [authStatus]);

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  if (loading) return <Spinner />;
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const handleCardClick = (id) => {
    navigate(`/resources/details/?id=${id}`);
  }

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header onMenuClick={toggleSidebar} />
        <main className="flex-1 overflow-x-hidden overflow-y-auto">
          <div className="container mx-auto px-4 py-8">
            {/* College Resources section */}
            <section className="mb-12">
              <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  College Resources
                </h2>
                <Link
                  to="/resources/college"
                  className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                >
                  View All
                </Link>
              </div>
              <div className="grid gap-6 mt-8 md:grid-cols-3">
                {learningResources.length === 0 ? (
                  <p className="col-span-3 text-center text-lg text-muted-foreground">
                    {noLearningResourcesMessage || "No resources available"}
                  </p>
                ) : (
                  learningResources.slice(0, 6).map((resource, index) => (
                    <Card key={index} onClick={() => handleCardClick(resource.id)} className="cursor-pointer">
                      <CardContent className="grid gap-4">
                        <div className="flex items-center gap-2 pt-4">
                          <FileIcon className="h-6 w-6 text-muted-foreground" />
                          <h3 className="text-lg font-semibold">{resource.title}</h3>
                        </div>
                        <p className="text-muted-foreground">{resource.description}</p>
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="sm">
                            <DownloadIcon className="h-4 w-4 mr-2" />
                            Download
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                )}
              </div>
            </section>
            {/* Open Educational Resources (OERs) section */}
            <section>
            <div className="flex items-center justify-between">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Open Educational Resources (OERs)
              </h2>
              <Link
                to="#"
                className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                
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
                      to="#"
                      className="inline-flex items-center gap-2 text-sm font-medium text-primary-foreground transition-colors hover:text-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                      
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
                      to="#"
                      className="inline-flex items-center gap-2 text-sm font-medium text-primary-foreground transition-colors hover:text-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                      
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
                      to="#"
                      className="inline-flex items-center gap-2 text-sm font-medium text-primary-foreground transition-colors hover:text-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                      
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
                to="#"
                className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                
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
                      to="#"
                      className="inline-flex items-center gap-2 text-sm font-medium text-primary-foreground transition-colors hover:text-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                      
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
                      to="#"
                      className="inline-flex items-center gap-2 text-sm font-medium text-primary-foreground transition-colors hover:text-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                      
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
                      to="#"
                      className="inline-flex items-center gap-2 text-sm font-medium text-primary-foreground transition-colors hover:text-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                      
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