import React, { useEffect, useState } from "react";
import { useAuth } from "../../../hooks/auth";
import Spinner from "../../../components/Spinner";
import { Link, useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Sidebar from "../../../components/Sidebar";
import Header from "../../../components/Header";
import { FileIcon, FileTextIcon, FileVideoIcon, Link2, DownloadIcon, ArrowLeft } from "lucide-react"; // Import ArrowLeft icon

export default function CollegeResources() {
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
            setLearningResources(data);
            console.log(data);
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
            {/* Back button */}
            <header className="flex items-center justify-between mb-8">
              <Link
                to="/resources"  // Link to the resources page
                className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg"
              >
                <ArrowLeft className="h-5 w-5" /> {/* Back arrow icon */}
                Back to Resources
              </Link>
            </header>

            {/* College Resources section */}
            <section>
              <div className="grid gap-6 mt-8 md:grid-cols-3">
                {/* Check if there are learning resources to display */}
                {noLearningResourcesMessage ? (
                  <p>{noLearningResourcesMessage}</p>
                ) : (
                  learningResources.map((resource, index) => (
                    <Card key={index} onClick={()=>handleCardClick(resource.id)} className='cursor-pointer'>
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
          </div>
        </main>
      </div>
    </div>
  );
}
