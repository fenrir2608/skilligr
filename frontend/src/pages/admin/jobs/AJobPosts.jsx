import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import React, { useEffect, useState } from "react";
import { useAuth } from "../../../hooks/auth";
import Spinner from "../../../components/Spinner";
import { Link, useNavigate } from "react-router-dom";
import Sidebar from "../../../components/Sidebar";
import Header from "../../../components/Header";
import { Trash2, Pencil } from "lucide-react"

export default function AdminJobPosts() {
    const { authStatus, loading } = useAuth();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    if (loading) return <Spinner />;
    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
    return (
        <div className="flex h-screen overflow-hidden">
            <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
            <div className="flex flex-col flex-1 w-full">
                <Header onMenuClick={toggleSidebar} />
                <main className="flex-1 overflow-y-auto">
                    <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8 space-y-8">
                        <h1 className="text-3xl font-bold">Job Postings</h1>
                        <div className="space-y-8">
                            <div className="shadow-md bg-background rounded-lg p-6">
                                <h2 className="text-2xl font-bold mb-4">Post a New Job</h2>
                                <form className="space-y-4">
                                    <div>
                                        <label htmlFor="job-title" className="block font-medium mb-1">
                                            Job Title
                                        </label>
                                        <input
                                            type="text"
                                            id="job-title"
                                            name="job-title"
                                            className="w-full border-gray-300 bg-background text-muted-background rounded-md shadow-sm focus:border-primary focus:ring-primary"
                                            placeholder="Enter job title"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="job-description" className="block font-medium mb-1">
                                            Job Description
                                        </label>
                                        <textarea
                                            id="job-description"
                                            name="job-description"
                                            rows={3}
                                            className="w-full border-gray-300 bg-background text-muted-background rounded-md shadow-sm focus:border-primary focus:ring-primary"
                                            placeholder="Enter job description"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="company-name" className="block font-medium mb-1">
                                            Company Name
                                        </label>
                                        <input
                                            type="text"
                                            id="company-name"
                                            name="company-name"
                                            className="w-full bg-background text-muted-background border-gray-300 rounded-md shadow-sm focus:border-primary focus:ring-primary"
                                            placeholder="Enter company name"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="company-profile" className="block font-medium mb-1">
                                            Company Profile
                                        </label>
                                        <textarea
                                            id="company-profile"
                                            name="company-profile"
                                            rows={3}
                                            className="w-full border-gray-300 bg-background text-muted-background rounded-md shadow-sm focus:border-primary focus:ring-primary"
                                            placeholder="Enter company profile"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="department" className="block font-medium mb-1">
                                            Department
                                        </label>
                                        <input
                                            type="text"
                                            id="department"
                                            name="department"
                                            className="w-full border-gray-300 bg-background text-muted-background rounded-md shadow-sm focus:border-primary focus:ring-primary"
                                            placeholder="Enter department"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="semester" className="block font-medium mb-1">
                                            Semester
                                        </label>
                                        <input
                                            type="text"
                                            id="semester"
                                            name="semester"
                                            className="w-full border-gray-300 bg-background text-muted-background rounded-md shadow-sm focus:border-primary focus:ring-primary"
                                            placeholder="Enter semester"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="deadline" className="block font-medium mb-1">
                                            Deadline
                                        </label>
                                        <div className="flex w-5/12">
                                            <input
                                                type="datetime-local"
                                                id="deadline-date"
                                                name="deadline-date"
                                                className="w-full border-gray-300 bg-white text-black rounded-md shadow-sm focus:border-primary focus:ring-primary"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label htmlFor="registration-link" className="block font-medium mb-1">
                                            Registration Link
                                        </label>
                                        <input
                                            type="url"
                                            id="registration-link"
                                            name="registration-link"
                                            className="w-full border-gray-300 bg-background text-muted-background rounded-md shadow-sm focus:border-primary focus:ring-primary"
                                            placeholder="Enter registration link"
                                        />
                                    </div>
                                    <div className="flex justify-end">
                                        <button
                                            type="submit"
                                            className="bg-primary text-primary-foreground font-medium py-2 px-4 rounded-md hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                                        >
                                            Post Job
                                        </button>
                                    </div>
                                </form>
                            </div>
                            <div className="space-y-4"> 
                                <div className='text-xl'>
                                Job Postings
                                </div>
                                {[
                                    {
                                        title: "Software Engineer",
                                        company: "Acme Inc.",
                                        department: "Engineering",
                                        deadline: "April 30, 2023 at 11:59 PM",
                                    },
                                    {
                                        title: "Marketing Intern",
                                        company: "Skilligr",
                                        department: "Marketing",
                                        deadline: "May 15, 2023 at 5:00 PM",
                                    },
                                    {
                                        title: "Graphic Designer",
                                        company: "Skilligr",
                                        department: "Design",
                                        deadline: "June 1, 2023 at 11:59 PM",
                                    },
                                ].map((job, index) => (
                                    <Card key={index} className="bg-background w-5/12 rounded-lg">
                                        <CardHeader>
                                            <div className="flex items-center justify-between">
                                                <h3 className="text-lg bg-background text-muted-background font-bold">{job.title}</h3>
                                                <div className='flex gap-5'></div>
                                                <div className="flex space-x-2">
                                                    <Button>
                                                        <Pencil size={18}/>
                                                    </Button>
                                                    <Button>
                                                        <Trash2 size={18}/>
                                                    </Button>
                                                </div>
                                            </div>
                                        </CardHeader>
                                        <CardContent>
                                            <p className="bg-background text-muted-background mb-2">{job.company}</p>
                                            <p className="bg-background text-muted-background mb-2">{job.department}</p>
                                            <p className="bg-background text-muted-background">Deadline: {job.deadline}</p>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
  }