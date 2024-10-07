import "./App.css";
import { Route, Routes, Navigate } from "react-router-dom";
import UDashboard from "./pages/user/UDashboard";
import Dashboard from "./pages/admin/Dashboard";
import Login from "./pages/Login";
import Landing  from "./pages/Landing";
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

function App() {
  const { authStatus, loading } = useAuth(
    ["/login", "/signup"], // Public routes (Accessible to all users, regardless of authentication status.)
    ["/login", "/signup","/reset","/update"]  // Restricted routes (Authenticated users are prevented from accessing certain routes and redirected to home)
  );

  return (
    <>
      {loading ? (
        <Spinner /> 
      ) : (
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/reset" element={<ForgotPassword />} />
          <Route path="/update" element={<UpdatePassword />} />
          <Route path="/admin" element={<Dashboard />} />
          <Route path="/user" element={<UDashboard />} />
          <Route path="/" element={<Landing />} />
          <Route path="/resources" element={<LearningResources />} />
          <Route path="/notifications" element={
            authStatus ? <UNotifications /> : <Navigate to="/login" replace />
          } />
          <Route path="/notifications/details" element={<UNotificationDetails />} />
          <Route path="/softskills/pronunciation" element={<PronunciationTests />} />
          <Route path="/softskills/grammar" element={<GrammarTools />} />
          <Route path="/feedback" element={<Feedback />} />
          <Route path="jobs" element = {<JobPosts />} />
          <Route path="jobs/details" element = {<JobDetail />} />
          <Route path="events" element = {<EventPosts />} />
          <Route path="events/details" element = {<EventDetail />} />
          <Route path="/resources/details" element={<LearningResourcesDetails />} />
          <Route path="/career" element={<CareerClarity />} />
          <Route path="/career/paths" element={<AllLearningPaths />} />
          <Route path="/career/assessment" element={<CareerAssessment/>} />
          <Route path="/resources/college" element={<CollegeResources />} />
        </Routes>
      )}
    </>
  );
}

export default App;
