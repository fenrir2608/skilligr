import React from 'react'
import { useAuth } from '../../../hooks/auth'
import Spinner from "../../../components/Spinner";
import {Link} from "react-router-dom"
import { Button } from "@/components/ui/button"


export default function LearningResourcesDetails() {
    const { authStatus, loading } = useAuth();
    if (loading) return <Spinner/>;

  return (
    <div className="w-full max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-primary-foreground mb-8">College Resources</h1>
      <div className="space-y-6">
        <div className="bg-card rounded-lg p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-card-foreground">Academic Resources</h2>
            <Link href="#" className="text-primary hover:underline" prefetch={false}>
              View All
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex items-center justify-between bg-background rounded-md p-4 hover:bg-accent hover:text-accent-foreground transition-colors">
              <div className="flex items-center space-x-4">
                <FileIcon className="h-6 w-6 text-muted-foreground" />
                <div>
                  <h3 className="text-base font-medium text-card-foreground">Syllabus Guide</h3>
                  <p className="text-sm text-muted-foreground">PDF, 2.5MB</p>
                </div>
              </div>
              <Button variant="ghost" size="icon">
                <DownloadIcon className="h-5 w-5" />
              </Button>
            </div>
            <div className="flex items-center justify-between bg-background rounded-md p-4 hover:bg-accent hover:text-accent-foreground transition-colors">
              <div className="flex items-center space-x-4">
                <FileIcon className="h-6 w-6 text-muted-foreground" />
                <div>
                  <h3 className="text-base font-medium text-card-foreground">Presentation Templates</h3>
                  <p className="text-sm text-muted-foreground">PPT, 4.2MB</p>
                </div>
              </div>
              <Button variant="ghost" size="icon">
                <DownloadIcon className="h-5 w-5" />
              </Button>
            </div>
            <div className="flex items-center justify-between bg-background rounded-md p-4 hover:bg-accent hover:text-accent-foreground transition-colors">
              <div className="flex items-center space-x-4">
                <LinkIcon className="h-6 w-6 text-muted-foreground" />
                <div>
                  <h3 className="text-base font-medium text-card-foreground">Writing Center</h3>
                  <p className="text-sm text-muted-foreground">Link</p>
                </div>
              </div>
              <Link href="#" className="text-primary hover:underline" prefetch={false}>
                Visit
              </Link>
            </div>
            <div className="flex items-center justify-between bg-background rounded-md p-4 hover:bg-accent hover:text-accent-foreground transition-colors">
              <div className="flex items-center space-x-4">
                <FileIcon className="h-6 w-6 text-muted-foreground" />
                <div>
                  <h3 className="text-base font-medium text-card-foreground">Research Guidelines</h3>
                  <p className="text-sm text-muted-foreground">PDF, 3.1MB</p>
                </div>
              </div>
              <Button variant="ghost" size="icon">
                <DownloadIcon className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
        <div className="bg-card rounded-lg p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-card-foreground">Student Life Resources</h2>
            <Link href="#" className="text-primary hover:underline" prefetch={false}>
              View All
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex items-center justify-between bg-background rounded-md p-4 hover:bg-accent hover:text-accent-foreground transition-colors">
              <div className="flex items-center space-x-4">
                <FileIcon className="h-6 w-6 text-muted-foreground" />
                <div>
                  <h3 className="text-base font-medium text-card-foreground">Campus Map</h3>
                  <p className="text-sm text-muted-foreground">PDF, 1.8MB</p>
                </div>
              </div>
              <Button variant="ghost" size="icon">
                <DownloadIcon className="h-5 w-5" />
              </Button>
            </div>
            <div className="flex items-center justify-between bg-background rounded-md p-4 hover:bg-accent hover:text-accent-foreground transition-colors">
              <div className="flex items-center space-x-4">
                <LinkIcon className="h-6 w-6 text-muted-foreground" />
                <div>
                  <h3 className="text-base font-medium text-card-foreground">Student Organizations</h3>
                  <p className="text-sm text-muted-foreground">Link</p>
                </div>
              </div>
              <Link href="#" className="text-primary hover:underline" prefetch={false}>
                Visit
              </Link>
            </div>
            <div className="flex items-center justify-between bg-background rounded-md p-4 hover:bg-accent hover:text-accent-foreground transition-colors">
              <div className="flex items-center space-x-4">
                <FileIcon className="h-6 w-6 text-muted-foreground" />
                <div>
                  <h3 className="text-base font-medium text-card-foreground">Student Handbook</h3>
                  <p className="text-sm text-muted-foreground">PDF, 5.2MB</p>
                </div>
              </div>
              <Button variant="ghost" size="icon">
                <DownloadIcon className="h-5 w-5" />
              </Button>
            </div>
            <div className="flex items-center justify-between bg-background rounded-md p-4 hover:bg-accent hover:text-accent-foreground transition-colors">
              <div className="flex items-center space-x-4">
                <LinkIcon className="h-6 w-6 text-muted-foreground" />
                <div>
                  <h3 className="text-base font-medium text-card-foreground">Campus Events</h3>
                  <p className="text-sm text-muted-foreground">Link</p>
                </div>
              </div>
              <Link href="#" className="text-primary hover:underline" prefetch={false}>
                Visit
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function DownloadIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" x2="12" y1="15" y2="3" />
    </svg>
  )
}


function FileIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
      <path d="M14 2v4a2 2 0 0 0 2 2h4" />
    </svg>
  )
}


function LinkIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
    </svg>
  )
}