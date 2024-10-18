import React from "react";
import { Link } from "react-router-dom";
import {
  Home,
  Book,
  Compass,
  Briefcase,
  Bell,
  Calendar,
  MessageCircle,
  BookOpenCheck,
  Mic,
  MessageSquarePlus,
  UserCheck,
} from "lucide-react";
import SkilligrIcon from "../assets/skilligr.jsx";
import Spinner from "./Spinner";
import { useAuth } from "../hooks/auth";


const adminSidebar = [
  {
    path: "/admin/approve",
    name: "Approve Users",
    icon: <UserCheck className="w-5 h-5" />,
  },
  {
    path: "/admin/resources",
    name: "Manage Resources",
    icon: <Book className="w-5 h-5" />,
  },
  {
    path: "/admin/jobs",
    name: "Manage Jobs",
    icon: <Briefcase className="w-5 h-5" />,
  },
  {
    path: "/admin/events",
    name: "Manage Events",
    icon: <Calendar className="w-5 h-5" />,
  },
  {
    path: "/admin/notifications",
    name: "Manage Notifications",
    icon: <Bell className="w-5 h-5" />,
  },
  {
    path: "/admin/feedback",
    name: "Manage Feedback",
    icon: <MessageCircle className="w-5 h-5" />,
  },
];

const userSidebar = [
  {
    path: "/",
    name: "Home",
    icon: <Home className="w-5 h-5" />,
  },
  {
    path: "/resources",
    name: "Learning Resources",
    icon: <Book className="w-5 h-5" />,
  },
  {
    path: "/career",
    name: "Career Clarity",
    icon: <Compass className="w-5 h-5" />,
  },
  {
    path: "/softskills/pronunciation",
    name: "Pronunciation",
    icon: <Mic className="w-5 h-5" />,
  },
  {
    path: "/softskills/grammar",
    name: "Grammar",
    icon: <BookOpenCheck className="w-5 h-5" />,
  },
  {
    path: "/notifications",
    name: "Notifications",
    icon: <Bell className="w-5 h-5" />,
  },
  {
    path: "/jobs",
    name: "Jobs",
    icon: <Briefcase className="w-5 h-5" />,
  },
  {
    path: "/events",
    name: "Events",
    icon: <Calendar className="w-5 h-5" />,
  },
  {
    path: "/feedback",
    name: "Feedback",
    icon: <MessageSquarePlus className="w-5 h-5" />,
  },
];


const Sidebar = ({ isOpen, onClose }) => {
  const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);
  const { authStatus,loading } = useAuth();
  const role = authStatus?.role;
  if (loading) return <Spinner/>;
  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <aside
      className={`bg-background border-r w-64 p-4 fixed top-0 bottom-0 left-0 transition-transform duration-300 ease-in-out ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } md:translate-x-0 md:static`}
      onClick={onClose} // This line will close the sidebar if you click outside
    >
      <div className="flex items-center mb-8">
        <Link to="/" className="flex items-center">
          <SkilligrIcon className="w-6 h-6 mr-4" />
          <h1 className="text-xl font-bold ml-3">Skilligr</h1>
        </Link>
        {role === "admin" && (
          <div className="ml-2  text-xl font-semibold ">
            <em>Admin</em>
          </div>
        )}
      </div>

      {/* Navigation for Admin */}
      {role === "admin" && (
        <nav className="space-y-2">
          {adminSidebar.map((route) => (
            <Link
              key={route.path}
              to={route.path}
              className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-muted transition-all duration-300 ease-in-out"
            >
              {route.icon}
              <span>{route.name}</span>
            </Link>
          ))}
        </nav>
      )}

       {/* Navigation for User */}
       {role !== "admin" && (
        <nav className="space-y-2">
          {userSidebar.map((route) => (
            <Link
              key={route.path}
              to={route.path}
              className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-muted transition-all duration-300 ease-in-out"
            >
              {route.icon}
              <span>{route.name}</span>
            </Link>
          ))}
        </nav>
      )}
    </aside>
  );
};

export default Sidebar;
