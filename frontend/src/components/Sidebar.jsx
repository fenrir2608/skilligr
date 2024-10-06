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
} from "lucide-react";
import SkilligrIcon from "../assets/skilligr.jsx";

const Sidebar = ({ isOpen, onClose }) => {
  const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);

  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <aside
      className={`bg-background border-r w-64 p-4 fixed top-0 bottom-0 left-0 transition-transform duration-300 ease-in-out ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } md:translate-x-0 md:static`}
    >
      <div className="flex items-center mb-8">
        <SkilligrIcon className="w-2 h-2 mr-4" />
        <h1 className="text-xl font-bold ml-3">Skilligr</h1>
      </div>
      <nav className="space-y-2">
        <Link
          to="/"
          className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-muted transition-all duration-300 ease-in-out"
        >
          <Home className="w-5 h-5" />
          <span>Home</span>
        </Link>
        <Link
          to="/resources"
          className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-muted transition-all duration-300 ease-in-out"
        >
          <Book className="w-5 h-5" />
          <span>Learning Resources</span>
        </Link>
        <Link
          to="/career"
          className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-muted transition-all duration-300 ease-in-out"
        >
          <Compass className="w-5 h-5" />
          <span>Career Clarity</span>
        </Link>
        <div>
          <button
            onClick={handleDropdownToggle}
            className="flex items-center gap-2 px-3 py-2 w-full text-left rounded-md hover:bg-muted transition-all duration-300 ease-in-out"
          >
            <Briefcase className="w-5 h-5" />
            <span>Soft Skill Hub</span>
          </button>
          <div
            className={`ml-6 mt-2 space-y-2 transition-all duration-300 ease-in-out ${
              isDropdownOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
            } overflow-hidden`}
          >
            <Link
              to="/softskills/pronunciation"
              className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-muted transition-all duration-300 ease-in-out"
            >
              <Mic className="w-5 h-5" /> Pronunciation
            </Link>
            <Link
              to="/softskills/grammar"
              className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-muted transition-all duration-300 ease-in-out"
            >
              <BookOpenCheck className="w-5 h-5" /> Grammar
            </Link>
          </div>
        </div>
        <Link
          to="/notifications"
          className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-muted transition-all duration-300 ease-in-out"
        >
          <Bell className="w-5 h-5" />
          <span>Notifications</span>
        </Link>
        <Link
          to="/jobs"
          className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-muted transition-all duration-300 ease-in-out"
        >
          <Briefcase className="w-5 h-5" />
          <span>Jobs</span>
        </Link>
        <Link
          to="/events"
          className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-muted transition-all duration-300 ease-in-out"
        >
          <Calendar className="w-5 h-5" />
          <span>Events</span>
        </Link>
        <Link
          to="/feedback"
          className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-muted transition-all duration-300 ease-in-out"
        >
          <MessageCircle className="w-5 h-5" />
          <span>Feedback</span>
        </Link>
      </nav>
    </aside>
  );
};

export default Sidebar;
