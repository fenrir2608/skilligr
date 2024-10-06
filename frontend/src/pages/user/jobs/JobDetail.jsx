import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useAuth } from "../../../hooks/auth";
import Spinner from "../../../components/Spinner";
import Sidebar from "../../../components/Sidebar";
import Header from "../../../components/Header";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function JobDetails() {
  const { authStatus, loading } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [jobDetails, setJobDetails] = useState(null);
  const [error, setError] = useState(null);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get("id"); // Extract job ID from URL

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        const response = await fetch(`http://localhost:3000/jobs/get/${id}`, {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (response.ok) {
          const data = await response.json();
          setJobDetails(data[0]);
        } else {
          setError("Failed to load job details.");
        }
      } catch (error) {
        console.error("Failed to fetch job details", error);
        setError("An error occurred while fetching job details.");
      }
    };

    if (authStatus && id) {
      fetchJobDetails();
    }
  }, [authStatus, id]);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  if (loading) return <Spinner />;

  return (
    <div className="flex flex-col min-h-screen">
      <Header onMenuClick={toggleSidebar} />
      <div className="flex flex-1">
        <Sidebar
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />
        <div className="flex-1 p-8">
          <header className="flex items-center justify-between mb-8">
            <Link
              to="/jobs"
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg"
            >
              Back to Job Postings
            </Link>
          </header>

          {error ? (
            <div className="text-center">{error}</div>
          ) : !jobDetails ? (
            <Spinner />
          ) : (
            <div className="p-8 shadow-lg rounded-lg">
              <h1 className="text-3xl font-bold mb-4">
                {jobDetails.job_title}
              </h1>
              <p className="text-sm mb-2">
                <span className="font-medium">Company: </span>
                {jobDetails.company_name}
              </p>
              <p className="text-sm mb-4">
                <span className="font-medium">About Company: </span>
                {jobDetails.company_profile}
              </p>
              <p className="mb-6">{jobDetails.description}</p>

              <div className="mb-4">
                <span className="font-medium">Deadline: </span>
                <span>
                  {new Date(jobDetails.deadline).toLocaleDateString()}
                </span>
              </div>

              <div className="mb-4">
                <span className="font-medium">Created By: </span>
                <span>{jobDetails.created_by}</span>
              </div>

              <Button
                onClick={() =>
                  window.open(jobDetails.registration_link, "_blank")
                }
                className="w-full py-2 rounded-md transition duration-300"
              >
                Apply Now
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
