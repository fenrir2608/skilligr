import { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import Spinner from "../../../components/Spinner";
import { useAuth } from "../../../hooks/auth";
import { ArrowLeft } from "lucide-react";
import Sidebar from "../../../components/Sidebar";
import Header from "../../../components/Header";
import { Button } from "@/components/ui/button"

function formatDate(dateString) {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}


export default function LearningResourcesDetails() {
    const { authStatus, loading } = useAuth();
    const [learningResource, setLearningResources] = useState(null);
    const [error, setError] = useState(null);
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const learningResourceId = searchParams.get("id"); 

    useEffect(() => {
      if(authStatus && learningResourceId) 
        {
        const fetchLearningResources = async () => {
          try {
            const response = await fetch(`http://localhost:3000/resources/get/${learningResourceId}`, {
              method: "GET",
              credentials: "include",
              headers: {
                "Content-Type": "application/json",
              },
            });
  
            if (response.ok) {
              const data = await response.json();
              setLearningResources(data[0]);
              console.log(data[0]);
            } else {
              setError("Failed to load learning resource details.");
            }
          } catch (error) {
            console.error("Failed to fetch learning resource", error);
            setError("An error occurred while fetching learning resource details.");
          }}
          fetchLearningResources();
        }
    }, [authStatus, learningResourceId]);

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  if (loading) return <Spinner />;
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);


  return (
    <div className="flex flex-col min-h-screen">
      <Header onMenuClick={toggleSidebar} />
      <div className="flex flex-1">
        <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
        <div className="flex-1 p-8">
            <header className="flex items-center justify-between mb-8">
              <Link
                to="/resources"
                className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg"
              >
                <ArrowLeft className="h-5 w-5" />
                Back to Resources
              </Link>
            </header>

          {error ? (
            <div className="text-center text-red-500">{error}</div>
          ) : !learningResource ? (
            <Spinner />
          ) : (
            <div className="p-8 shadow-md rounded-lg bg-card">
              <h1 className="text-3xl font-semibold mb-4">{learningResource.title}</h1>
              <p className="text-sm mb-6">
                <span className="font-medium">Type: </span>
                {learningResource.type || "N/A"}
              </p>

              <h2 className="text-lg font-medium mb-2">Description</h2>
              <p className="mb-6">{learningResource.resources}</p>

              <div className="text-sm">
                <div className="mb-4">
                  <span className="font-medium">Created By: </span>
                  {learningResource.created_by || "Unknown"}
                </div>
                <div className="mb-4">
                            <span className="font-medium">Created At: </span>
                            {learningResource?.created_at ? formatDate(learningResource.created_at) : "N/A"}
                        </div>
              </div>

              {learningResource.downloadLink && (
                <Button variant="primary">
                  <DownloadIcon className="h-5 w-5 mr-2" />
                  Download Resource
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}