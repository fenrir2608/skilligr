import "./App.css";
import { Route, Routes } from "react-router-dom";
import UDashboard from "./pages/user/UDashboard";
import Dashboard from "./pages/admin/Dashboard";
import Login from "./pages/Login";
import Landing  from "./pages/Landing";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import UpdatePassword from "./pages/Update";
import LearningResources from "./pages/user/learningResources/ULearningResources";
import { useAuth } from "./hooks/auth";
import Spinner from "./components/Spinner";
import LearningResourcesDetails from "./pages/user/learningResources/ULearningResourcesDetails";
import CareerClarity from "./pages/user/careerClarity/UCareerClarity";
import AllLearningPaths from "./pages/user/careerClarity/UAllLearningPaths";
import CareerAssessment from "./pages/user/careerClarity/UCareerAssessment";

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
          <Route path="/resources/details" element={<LearningResourcesDetails />} />
          <Route path="/career" element={<CareerClarity />} />
          <Route path="/career/paths" element={<AllLearningPaths />} />
          <Route path="/career/assessment" element={<CareerAssessment/>} />
        </Routes>
      )}
    </>
  );
}

export default App;
