import React, { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Trash2, Pencil } from "lucide-react";
import { useAuth } from "../../../hooks/auth";
import Spinner from "../../../components/Spinner";
import Sidebar from "../../../components/Sidebar";
import Header from "../../../components/Header";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function AdminJobPosts() {
  const { loading } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [jobs, setJobs] = useState([]);
  const [fetching, setFetching] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [editingJob, setEditingJob] = useState(null);
  const [newJob, setNewJob] = useState({
    job_title: "",
    company_name: "",
    description: "",
    company_profile: "",
    dept: "",
    semester: "",
    deadline: "",
    registration_link: "",
  });

  const fetchJobs = useCallback(async () => {
    try {
      const response = await fetch("http://localhost:3000/jobs/viewAll", {
        credentials: "include",
      });
      if (!response.ok) {
        throw new Error("Failed to fetch jobs");
      }
      const data = await response.json();
      setJobs(data);
    } catch (error) {
      console.error("Failed to fetch jobs", error);
    } finally {
      setFetching(false);
    }
  }, []);

  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const handleAddJob = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/jobs/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newJob),
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Failed to add job");
      }

      await fetchJobs();
      setShowAddModal(false);
      setNewJob({
        job_title: "",
        company_name: "",
        description: "",
        company_profile: "",
        dept: "",
        semester: "",
        deadline: "",
        registration_link: "",
      });
    } catch (error) {
      console.error("Failed to add job", error);
    }
  };

  const handleDeleteJob = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/jobs/delete/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (response.status === 403) {
        console.log("You are not authorized to delete this job");
        return;
      }
      if (response.ok) {
        await fetchJobs();
      }
    } catch (error) {
      console.error("Failed to delete job", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewJob((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditingJob((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditJob = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `http://localhost:3000/jobs/update/${editingJob.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(editingJob),
          credentials: "include",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update job");
      }

      await fetchJobs();
      setShowEditModal(false);
      setEditingJob(null);
    } catch (error) {
      console.error("Failed to update job", error);
    }
  };

  const openEditModal = (job) => {
    setEditingJob(job);
    setShowEditModal(true);
  };

  if (loading || fetching) return <Spinner />;

  return (
    <div className="flex min-h-screen overflow-hidden">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      <div className="flex flex-col flex-1 w-full">
        <Header onMenuClick={toggleSidebar} />
        <main className="flex-1 overflow-y-auto">
          <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
            <div className="space-y-8">
              <div className="bg-background rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold mb-4">Manage Job Postings</h2>
                <Dialog open={showAddModal} onOpenChange={setShowAddModal}>
                  <DialogTrigger asChild>
                    <Button className="mb-4">Add Job Posting</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Add New Job Posting</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleAddJob} id="add-job-form">
                      <div className="grid gap-4">
                        <div className="grid grid-cols-1 gap-2">
                          <Label htmlFor="job_title">Job Title</Label>
                          <Input
                            id="job_title"
                            name="job_title"
                            placeholder="Job title"
                            required
                            value={newJob.job_title || ""}
                            onChange={handleInputChange}
                          />
                        </div>
                        <div className="grid grid-cols-1 gap-2">
                          <Label htmlFor="company_name">Company Name</Label>
                          <Input
                            id="company_name"
                            name="company_name"
                            placeholder="Company name"
                            required
                            value={newJob.company_name || ""}
                            onChange={handleInputChange}
                          />
                        </div>
                        <div className="grid grid-cols-1 gap-2">
                          <Label htmlFor="description">Job Description</Label>
                          <Input
                            id="description"
                            name="description"
                            placeholder="Job description"
                            required
                            value={newJob.description || ""}
                            onChange={handleInputChange}
                          />
                        </div>
                        <div className="grid grid-cols-1 gap-2">
                          <Label htmlFor="company_profile">
                            Company Profile
                          </Label>
                          <Input
                            id="company_profile"
                            name="company_profile"
                            placeholder="Company profile"
                            required
                            value={newJob.company_profile || ""}
                            onChange={handleInputChange}
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="grid gap-2">
                            <Label htmlFor="dept">Department</Label>
                            <Select
                              name="dept"
                              required
                              value={newJob.dept || ""}
                              onValueChange={(value) =>
                                handleInputChange({
                                  target: { name: "dept", value },
                                })
                              }
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Choose a department" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="Computer Science">
                                  Computer Science
                                </SelectItem>
                                <SelectItem value="Information Technology">
                                  Information Technology
                                </SelectItem>
                                <SelectItem value="Mechanical">
                                  Mechanical
                                </SelectItem>
                                <SelectItem value="Electrical">
                                  Electrical
                                </SelectItem>
                                <SelectItem value="Civil">Civil</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="grid gap-2">
                            <Label htmlFor="semester">Semester</Label>
                            <Select
                              name="semester"
                              required
                              value={newJob.semester || ""}
                              onValueChange={(value) =>
                                handleInputChange({
                                  target: { name: "semester", value },
                                })
                              }
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Choose a semester" />
                              </SelectTrigger>
                              <SelectContent>
                                {[1, 2, 3, 4, 5, 6, 7, 8].map((sem) => (
                                  <SelectItem key={sem} value={sem.toString()}>
                                    {sem}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        <div className="grid grid-cols-1 gap-2">
                          <Label htmlFor="deadline">Deadline</Label>
                          <Input
                            id="deadline"
                            name="deadline"
                            type="datetime-local"
                            required
                            value={
                              newJob.deadline
                                ? new Date(newJob.deadline)
                                    .toISOString()
                                    .slice(0, 16)
                                : ""
                            }
                            onChange={handleInputChange}
                          />
                        </div>
                        <div className="grid grid-cols-1 gap-2">
                          <Label htmlFor="registration_link">
                            Registration Link
                          </Label>
                          <Input
                            id="registration_link"
                            name="registration_link"
                            type="url"
                            placeholder="Registration link"
                            required
                            value={newJob.registration_link || ""}
                            onChange={handleInputChange}
                          />
                        </div>
                        <Button type="submit" className="w-full">
                          Add Job Posting
                        </Button>
                      </div>
                    </form>
                  </DialogContent>
                </Dialog>

                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Title</TableHead>
                        <TableHead>Company</TableHead>
                        <TableHead>Department</TableHead>
                        <TableHead>Semester</TableHead>
                        <TableHead>Deadline</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {jobs.length > 0 ? (
                        jobs.map((job) => (
                          <TableRow
                            key={job.id}
                            onClick={() => setSelectedJob(job)}
                          >
                            <TableCell>{job.job_title}</TableCell>
                            <TableCell>{job.company_name}</TableCell>
                            <TableCell>{job.dept}</TableCell>
                            <TableCell>{job.semester}</TableCell>
                            <TableCell>
                              {new Date(job.deadline).toLocaleString()}
                            </TableCell>
                            <TableCell>
                              <div className="flex space-x-2">
                                <Button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    openEditModal(job);
                                  }}
                                  variant="ghost"
                                  className="p-1 rounded-full hover:bg-muted/20"
                                >
                                  <Pencil className="w-5 h-5 text-muted-foreground hover:text-blue-500" />
                                </Button>
                                <Button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleDeleteJob(job.id);
                                  }}
                                  variant="ghost"
                                  className="p-1 rounded-full hover:bg-muted/20"
                                >
                                  <Trash2 className="w-5 h-5 text-muted-foreground hover:text-red-500" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={6} className="text-center">
                            No job postings found.
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
      {selectedJob && (
        <Dialog open={!!selectedJob} onOpenChange={() => setSelectedJob(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{selectedJob.job_title}</DialogTitle>
            </DialogHeader>
            <div>
              <p>
                <strong>Company:</strong> {selectedJob.company_name}
              </p>
              <p>
                <strong>Department:</strong> {selectedJob.dept}
              </p>
              <p>
                <strong>Semester:</strong> {selectedJob.semester}
              </p>
              <p>
                <strong>Deadline:</strong>{" "}
                {new Date(selectedJob.deadline).toLocaleString()}
              </p>
              <p>
                <strong>Description:</strong> {selectedJob.description}
              </p>
              <p>
                <strong>Company Profile:</strong> {selectedJob.company_profile}
              </p>
              <p>
                <strong>Registration Link:</strong>{" "}
                <a
                  href={selectedJob.registration_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400"
                >
                  {selectedJob.registration_link}
                </a>
              </p>
              <p>
                <strong>Added By:</strong> {selectedJob.created_by}
              </p>
            </div>
          </DialogContent>
        </Dialog>
      )}
      <Dialog open={showEditModal} onOpenChange={setShowEditModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Job Posting</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleEditJob} id="edit-job-form">
            <div className="grid gap-4">
              <div className="grid grid-cols-1 gap-2">
                <Label htmlFor="job_title">Job Title</Label>
                <Input
                  id="job_title"
                  name="job_title"
                  placeholder="Job title"
                  required
                  value={editingJob?.job_title || ""}
                  onChange={handleEditInputChange}
                />
              </div>
              <div className="grid grid-cols-1 gap-2">
                <Label htmlFor="company_name">Company Name</Label>
                <Input
                  id="company_name"
                  name="company_name"
                  placeholder="Company name"
                  required
                  value={editingJob?.company_name || ""}
                  onChange={handleEditInputChange}
                />
              </div>
              <div className="grid grid-cols-1 gap-2">
                <Label htmlFor="description">Job Description</Label>
                <Input
                  id="description"
                  name="description"
                  placeholder="Job description"
                  required
                  value={editingJob?.description || ""}
                  onChange={handleEditInputChange}
                />
              </div>
              <div className="grid grid-cols-1 gap-2">
                <Label htmlFor="company_profile">Company Profile</Label>
                <Input
                  id="company_profile"
                  name="company_profile"
                  placeholder="Company profile"
                  required
                  value={editingJob?.company_profile || ""}
                  onChange={handleEditInputChange}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="dept">Department</Label>
                  <Select
                    name="dept"
                    required
                    value={editingJob?.dept || ""}
                    onValueChange={(value) =>
                      handleEditInputChange({
                        target: { name: "dept", value },
                      })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Choose a department" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Computer Science">
                        Computer Science
                      </SelectItem>
                      <SelectItem value="Information Technology">
                        Information Technology
                      </SelectItem>
                      <SelectItem value="Mechanical">Mechanical</SelectItem>
                      <SelectItem value="Electrical">Electrical</SelectItem>
                      <SelectItem value="Civil">Civil</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="semester">Semester</Label>
                  <Select
                    name="semester"
                    required
                    value={editingJob?.semester || ""}
                    onValueChange={(value) =>
                      handleEditInputChange({
                        target: { name: "semester", value },
                      })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Choose a semester" />
                    </SelectTrigger>
                    <SelectContent>
                      {[1, 2, 3, 4, 5, 6, 7, 8].map((sem) => (
                        <SelectItem key={sem} value={sem.toString()}>
                          {sem}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-1 gap-2">
                <Label htmlFor="deadline">Deadline</Label>
                <Input
                  id="deadline"
                  name="deadline"
                  type="datetime-local"
                  required
                  value={
                    editingJob?.deadline
                      ? new Date(editingJob.deadline).toISOString().slice(0, 16)
                      : ""
                  }
                  onChange={handleEditInputChange}
                />
              </div>
              <div className="grid grid-cols-1 gap-2">
                <Label htmlFor="registration_link">Registration Link</Label>
                <Input
                  id="registration_link"
                  name="registration_link"
                  type="url"
                  placeholder="Registration link"
                  required
                  value={editingJob?.registration_link || ""}
                  onChange={handleEditInputChange}
                />
              </div>
              <Button type="submit" className="w-full">
                Update Job Posting
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
