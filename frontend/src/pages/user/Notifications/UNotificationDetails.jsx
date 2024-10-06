import { Link, useNavigate } from "react-router-dom";
import Spinner from "../../../components/Spinner";
import { useAuth } from "../../../hooks/auth";

export default function UNotificationDetails() {
  const { authStatus, loading } = useAuth();
  if (loading) return <Spinner/>;
  return (
    <div className="flex flex-col h-full">
      <header className="bg-primary text-primary-foreground px-6 py-4 flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold">New Feature Release</h1>
          <p className="text-sm text-muted-foreground">Notification Label: New Feature Release</p>
        </div>
        <Link
          href="#"
          className="inline-flex items-center gap-2 rounded-md bg-primary-foreground/10 px-3 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary-foreground/20 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary-foreground"
          prefetch={false}
        >
          <ArrowLeftIcon className="h-4 w-4" />
          Back to Notifications
        </Link>
      </header>
      <div className="flex-1 p-6 grid gap-6">
        <div>
          <h2 className="text-xl font-semibold">Notification Details</h2>
          <p className="text-muted-foreground">
            We're excited to announce the release of our latest feature update! This update includes several new
            capabilities that will help you and your team be more productive.
          </p>
          <div className="mt-4 grid gap-2 text-sm text-muted-foreground">
            <div className="flex items-center justify-between">
              <span>Timestamp:</span>
              <span>2023-04-15 10:30 AM</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Sent by:</span>
              <span>John Doe, Product Manager</span>
            </div>
          </div>
        </div>
        <div>
          <h2 className="text-xl font-semibold">What's New</h2>
          <ul className="mt-4 space-y-2 text-muted-foreground">
            <li className="flex items-start gap-2">
              <CircleCheckIcon className="h-5 w-5 text-green-500 mt-0.5" />
              <div>
                <h3 className="font-medium">Improved Collaboration</h3>
                <p>
                  Our new real-time collaboration features make it easier than ever for your team to work together on
                  projects.
                </p>
              </div>
            </li>
            <li className="flex items-start gap-2">
              <CircleCheckIcon className="h-5 w-5 text-green-500 mt-0.5" />
              <div>
                <h3 className="font-medium">Automated Workflows</h3>
                <p>
                  Streamline your processes with our new workflow automation tools, saving you time and reducing errors.
                </p>
              </div>
            </li>
            <li className="flex items-start gap-2">
              <CircleCheckIcon className="h-5 w-5 text-green-500 mt-0.5" />
              <div>
                <h3 className="font-medium">Enhanced Analytics</h3>
                <p>
                  Get deeper insights into your business with our upgraded analytics dashboard and reporting features.
                </p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

function ArrowLeftIcon(props) {
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
      <path d="m12 19-7-7 7-7" />
      <path d="M19 12H5" />
    </svg>
  )
}


function CircleCheckIcon(props) {
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
      <circle cx="12" cy="12" r="10" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  )
}