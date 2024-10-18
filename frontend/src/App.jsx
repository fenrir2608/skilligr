import "./App.css";
import { Route, Routes, Navigate } from "react-router-dom";
import UDashboard from "./pages/user/UDashboard";
import Login from "./pages/Login";
import Landing from "./pages/Landing";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import UpdatePassword from "./pages/Update";
import LearningResources from "./pages/user/learningResources/ULearningResources";
import UNotifications from "./pages/user/Notifications/UNotifications";
import UNotificationDetails from "./pages/user/Notifications/UNotificationDetails";
import PronunciationTests from "./pages/user/softSkillsHub/PronunciationTests";
import GrammarTools from "./pages/user/softSkillsHub/GrammarTools";
import Feedback from "./pages/user/Feedback";
import { useAuth } from "./hooks/auth";
import Spinner from "./components/Spinner";
import JobPosts from "./pages/user/jobs/JobPosts";
import JobDetail from "./pages/user/jobs/JobDetail";
import EventPosts from "./pages/user/events/EventPosts";
import EventDetail from "./pages/user/events/EventDetail";
import LearningResourcesDetails from "./pages/user/learningResources/ULearningResourcesDetails";
import CareerClarity from "./pages/user/careerClarity/UCareerClarity";
import AllLearningPaths from "./pages/user/careerClarity/UAllLearningPaths";
import CareerAssessment from "./pages/user/careerClarity/UCareerAssessment";
import CollegeResources from "./pages/user/learningResources/CollegeResources";
import AdminResources from "./pages/admin/learningResources/LearningResources";
import AdminJobPosts from "./pages/admin/jobs/AJobPosts";
import AdminEventPosts from "./pages/admin/events/AEventPosts";
import Notifications from "./pages/admin/notifications/Notifications";
import AdminFeedback from "./pages/admin/AFeedback";
import NotFound from "./pages/404";
import ApproveUsers from "./pages/admin/ApproveUsers";

function App() {
  const publicRoutes = ["/", "/login", "/signup", "/reset", "/update"]; //These routes are accessible with and without authentication
  const { authStatus, loading } = useAuth(publicRoutes);

  if (loading) {
    return <Spinner />;
  }

  const ProtectedRoute = ({ children }) => {
    if (!authStatus) {
      return <Navigate to="/login" replace />;
    }
    return children;
  };

  const AdminRoute = ({ children }) => {
    if (!authStatus || authStatus.role !== "admin") {
      return <Navigate to="/login" replace />;
    }
    return children;
  };

  return (
    <Routes>

      {/* Public Routes */}
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/reset" element={<ForgotPassword />} />
      <Route path="/update" element={<UpdatePassword />} />
      
      {/* Admin Routes */}
      <Route path="/admin/approve" element={<AdminRoute><ApproveUsers /></AdminRoute>} />
      <Route path="/admin/resources" element={<AdminRoute><AdminResources /></AdminRoute>} />
      <Route path="/admin/jobs" element={<AdminRoute><AdminJobPosts /></AdminRoute>} />
      <Route path="/admin/events" element={<AdminRoute><AdminEventPosts /></AdminRoute>} />
      <Route path="/admin/notifications" element={<AdminRoute><Notifications /></AdminRoute>} />
      <Route path="/admin/feedback" element={<ProtectedRoute><AdminFeedback /></ProtectedRoute>} />

      {/* User Routes */}
      <Route path="/user" element={<ProtectedRoute><UDashboard /></ProtectedRoute>} />
      <Route path="/resources" element={<ProtectedRoute><LearningResources /></ProtectedRoute>} />
      <Route path="/notifications" element={<ProtectedRoute><UNotifications /></ProtectedRoute>} />
      <Route path="/notifications/details" element={<ProtectedRoute><UNotificationDetails /></ProtectedRoute>} />
      <Route path="/softskills/pronunciation" element={<ProtectedRoute><PronunciationTests /></ProtectedRoute>} />
      <Route path="/softskills/grammar" element={<ProtectedRoute><GrammarTools /></ProtectedRoute>} />
      <Route path="/feedback" element={<ProtectedRoute><Feedback /></ProtectedRoute>} />
      <Route path="/jobs" element={<ProtectedRoute><JobPosts /></ProtectedRoute>} />
      <Route path="/jobs/details" element={<ProtectedRoute><JobDetail /></ProtectedRoute>} />
      <Route path="/events" element={<ProtectedRoute><EventPosts /></ProtectedRoute>} />
      <Route path="/events/details" element={<ProtectedRoute><EventDetail /></ProtectedRoute>} />
      <Route path="/resources/details" element={<ProtectedRoute><LearningResourcesDetails /></ProtectedRoute>} />
      <Route path="/career" element={<ProtectedRoute><CareerClarity /></ProtectedRoute>} />
      <Route path="/career/paths" element={<ProtectedRoute><AllLearningPaths /></ProtectedRoute>} />
      <Route path="/career/assessment" element={<ProtectedRoute><CareerAssessment /></ProtectedRoute>} />
      <Route path="/resources/college" element={<ProtectedRoute><CollegeResources /></ProtectedRoute>} />

      {/* Misc Routes */}
      <Route path="*" element={<ProtectedRoute><NotFound/></ProtectedRoute>} />
      
    </Routes>
  );
}

export default App;