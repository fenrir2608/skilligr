import { Link } from "react-router-dom";
import { CardHeader } from "@/components/ui/card";
import { useState, useEffect } from "react";
import { useAuth } from "../../../hooks/auth";
import Spinner from "../../../components/Spinner";
import Sidebar from "../../../components/Sidebar";
import Header from "../../../components/Header";

export default function JobPosts() {
  const { authStatus, loading } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [jobs, setJobs] = useState([]);
  const [error, setError] = useState(null);
  const [noJobsMessage, setNoJobsMessage] = useState(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch('http://localhost:3000/jobs/getAll', {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        
        if (!response.ok) {
          const text = await response.text();
          setError(text || 'Failed to fetch job postings');
          if (text === 'No jobs available.') {
            setNoJobsMessage('No jobs available.');
          }
          return;
        }

        const data = await response.json();
        setJobs(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchJobs();
  }, [authStatus]);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  if (loading) return <Spinner />;

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      <div className="flex-1">
        <Header onMenuClick={toggleSidebar} />
        <section className="py-12 md:py-16 lg:py-20">
          <div className="container px-4 md:px-6">
            <h2 className="mb-8 text-2xl font-bold md:text-3xl lg:text-4xl">Job postings</h2>
            
            {/* Check if jobs are available */}
            {jobs.length === 0 ? (
              <p className="col-span-3 text-center text-lg text-muted-foreground">
                {noJobsMessage || "No jobs available"}
              </p>
            ) : (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {jobs.map((job) => (
                  <Link
                    key={job.id}
                    to={`/jobs/details/?id=${job.id}`} // Navigate to job details
                    className="bg-background shadow-md rounded-lg overflow-hidden block w-full max-w-[400px] transition-all hover:scale-[1.02] focus:scale-[1.02]"
                  >
                    <CardHeader className="bg-muted p-6">
                      <h2 className="text-xl font-bold">{job.job_title}</h2>
                      <div className="flex justify-between items-center mt-2">
                        <div>
                          <p className="text-muted-foreground font-medium">Company:</p>
                          <p className="text-muted-foreground">{job.company_name}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground font-medium">Location:</p>
                          <p className="text-muted-foreground">{job.location || 'Unknown'}</p>
                        </div>
                      </div>
                    </CardHeader>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
