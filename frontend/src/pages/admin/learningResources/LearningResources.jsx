import { Button } from "@/components/ui/button"
import { Trash2 } from "lucide-react"
import React, { useEffect, useState } from "react";
import { useAuth } from "../../../hooks/auth";
import Spinner from "../../../components/Spinner";
import { Link, useNavigate } from "react-router-dom";
import Sidebar from "../../../components/Sidebar";
import Header from "../../../components/Header";

export default function AdminResources() {
    const { authStatus, loading } = useAuth();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    if (loading) return <Spinner />;
    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
return (
    <div className="flex min-h-screen overflow-hidden">
        <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
        <div className="flex flex-col flex-1 w-full">
            <Header onMenuClick={toggleSidebar} />
            <main className="flex-1 overflow-y-hidden overflow-x-hidden">
                <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
                    <div className="space-y-8">
                        <div className="bg-background rounded-lg shadow-md p-6">
                            <h2 className="text-2xl font-bold mb-4">Create Learning Resource</h2>
                            <form className="space-y-4">
                                <div>
                                    <label htmlFor="title" className="block text-sm font-medium text-muted-foreground">
                                        Title
                                    </label>
                                    <input
                                        type="text"
                                        id="title"
                                        className="mt-1 block w-full rounded-md border-input bg-background px-3 py-2 text-sm shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                                        placeholder="Enter the title of the resource"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="description" className="block text-sm font-medium text-muted-foreground">
                                        Resource Description
                                    </label>
                                    <textarea
                                        id="description"
                                        rows={3}
                                        className="mt-1 block w-full rounded-md border-input bg-background px-3 py-2 text-sm shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                                        placeholder="Enter a description of the resource"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="type" className="block text-sm font-medium text-muted-foreground">
                                        Type of Resource
                                    </label>
                                    <select
                                        id="type"
                                        className="mt-1 block w-full rounded-md border-input bg-background px-3 py-2 text-sm shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                                    >
                                        <option value="">Select the type of resource</option>
                                        <option value="pdf">PDF</option>
                                        <option value="doc">DOC</option>
                                        <option value="image">Image</option>
                                    </select>
                                </div>
                                <div>
                                    <label htmlFor="content" className="block text-sm font-medium text-muted-foreground">
                                        Content
                                    </label>
                                    <input
                                        type="file"
                                        id="content"
                                        className="mt-1 block w-full rounded-md border-input bg-background px-3 py-2 text-sm shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="department" className="block text-sm font-medium text-muted-foreground">
                                        Department
                                    </label>
                                    <input
                                        type="text"
                                        id="department"
                                        className="mt-1 block w-full rounded-md border-input bg-background px-3 py-2 text-sm shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                                        placeholder="Enter the department"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="semester" className="block text-sm font-medium text-muted-foreground">
                                        Semester
                                    </label>
                                    <input
                                        type="text"
                                        id="semester"
                                        className="mt-1 block w-full rounded-md border-input bg-background px-3 py-2 text-sm shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                                        placeholder="Enter the semester"
                                    />
                                </div>
                                <div className="flex justify-end">
                                    <Button type="submit" className="bg-primary text-primary-foreground hover:bg-primary/90">
                                        Create Resource
                                    </Button>
                                </div>
                            </form>
                        </div>
                        <div className="bg-background rounded-lg shadow-md p-6">
                            <h2 className="text-2xl font-bold mb-4">Learning Resources</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                            <div className="bg-card rounded-lg shadow-sm p-4 relative">
                                <h3 className="text-lg font-medium">Introduction to React</h3>
                                <p className="text-muted-foreground">PDF</p>
                                <Button className="absolute top-2 right-2 p-2 rounded-full">
                                <Trash2 className="w-4 h-4" />
                                </Button>
                            </div>
                            <div className="bg-card rounded-lg shadow-sm p-4 relative">
                                <h3 className="text-lg font-medium">JavaScript Fundamentals</h3>
                                <p className="text-muted-foreground">DOC</p>
                                <Button className="absolute top-2 right-2 p-2 rounded-full">
                                <Trash2 className="w-4 h-4" />
                                </Button>
                            </div>
                            <div className="bg-card rounded-lg shadow-sm p-4 relative">
                                <h3 className="text-lg font-medium">UI Design Principles</h3>
                                <p className="text-muted-foreground">Image</p>
                                <Button className="absolute top-2 right-2 p-2 rounded-full">
                                <Trash2 className="w-4 h-4" />
                                </Button>
                            </div>
                            <div className="bg-card rounded-lg shadow-sm p-4 relative">
                                <h3 className="text-lg font-medium">Advanced CSS Techniques</h3>
                                <p className="text-muted-foreground">PDF</p>
                                <Button className="absolute top-2 right-2 p-2 rounded-full">
                                <Trash2 className="w-4 h-4" />
                                </Button>
                            </div>
                            <div className="bg-card rounded-lg shadow-sm p-4 relative">
                                <h3 className="text-lg font-medium">Python for Data Science</h3>
                                <p className="text-muted-foreground">DOC</p>
                                <Button className="absolute top-2 right-2 p-2 rounded-full">
                                <Trash2 className="w-4 h-4" />
                                </Button>
                            </div>
                            <div className="bg-card rounded-lg shadow-sm p-4 relative">
                                <h3 className="text-lg font-medium">Figma Prototyping</h3>
                                <p className="text-muted-foreground">Image</p>
                                <Button className="absolute top-2 right-2 p-2 rounded-full">
                                <Trash2 className="w-4 h-4" />
                                </Button>
                            </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    </div>
)
}