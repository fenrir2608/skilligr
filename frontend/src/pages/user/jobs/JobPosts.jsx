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
      <div className="flex-1 flex flex-col">
        <Header onMenuClick={toggleSidebar} />
        <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-3xl font-bold mb-8">Job Postings</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
        </main>
      </div>
    </div>
  );
}
