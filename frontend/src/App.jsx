import "./App.css";
import { Route, Routes } from "react-router-dom";
import UDashboard from "./pages/user/UDashboard";
import Dashboard from "./pages/admin/Dashboard";
import Login from "./pages/Login";
import Landing  from "./pages/Landing";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import UpdatePassword from "./pages/Update";
import LearningResources from "./pages/user/LearningResources";
import UNotifications from "./pages/user/Notifications/UNotifications";
import UNotificationDetails from "./pages/user/Notifications/UNotificationDetails";
import PronounciationTests from "./pages/user/softSkillsHub/PronounciationTests";
import GrammarTools from "./pages/user/softSkillsHub/GrammarTools";
import Feedback from "./pages/user/Feedback";
import { useAuth } from "./hooks/auth";
import Spinner from "./components/Spinner";
import JobPosts from "./pages/user/jobs/JobPosts";
import JobDetail from "./pages/user/jobs/JobDetail";
import EventPosts from "./pages/user/events/EventPosts";
import EventDetail from "./pages/user/events/EventDetail";

function App() {
 const { authStatus, loading } = useAuth(["/signup","/login","/reset","/update"], true); 

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
          <Route path="/notifications" element={<UNotifications />} />
          <Route path="/notifications/details" element={<UNotificationDetails />} />
          <Route path="/softskills/pronounciation" element={<PronounciationTests />} />
          <Route path="/softskills/grammar" element={<GrammarTools />} />
          <Route path="/feedback" element={<Feedback />} />
          <Route path="jobs" element = {<JobPosts />} />
          <Route path="jobs/detail" element = {<JobDetail />} />
          <Route path="events" element = {<EventPosts />} />
          <Route path="events/detail" element = {<EventDetail />} />
        </Routes>
      )}
    </>
  );
}

export default App;
